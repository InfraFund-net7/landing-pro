// src/components/SurveyWithAutoWallet.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import { Modal } from "./ui/modal";
import { useAccount, useWallets, useDisconnect, ConnectButton } from "@particle-network/connectkit";
import fund from "@/../public/svg/Raise-Fund.svg";
import contract from "@/../public/svg/Contract.svg";
import audit from "@/../public/svg/Audit.svg";
import invest from "@/../public/svg/Invest-flow.svg";
import infafund from "@/../public/svg/infrafund.svg";
import Image from "next/image";
import apiService from "@/services/api.service";

// Types
type SurveyData = {
    role: string;
    type: "individual" | "organization";
    confirm_tos: boolean;
    first_name?: string;
    last_name?: string;
    phone_number?: string;
    email: string;
    contact_fullname?: string;
    company_name?: string;
};

type Step = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8; // 8 = Auto Wallet + Register

export default function SurveyWithAutoWallet() {
    // Survey state
    const [currentStep, setCurrentStep] = useState<Step>(1);
    const [selectedAction, setSelectedAction] = useState("");
    const [userType, setUserType] = useState<"individual" | "organization">("individual");
    const [confirmations, setConfirmations] = useState({
        ukResident: false,
        niNumber: false,
        over18: false,
    });
    const [orgConfirmations, setOrgConfirmations] = useState({
        ukBased: false,
        companyHouse: false,
        active: false,
    });
    const [personalForm, setPersonalForm] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
    });
    const [orgForm, setOrgForm] = useState({
        contactFullName: "",
        companyName: "",
        phoneNumber: "",
    });
    const [accountForm, setAccountForm] = useState({
        email: "",
        termsAgreed: false,
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isEligible, setIsEligible] = useState(true);
    const [registerLoading, setRegisterLoading] = useState(false);
    const [registerSuccess, setRegisterSuccess] = useState(false);

    // Wallet
    const { address, isConnected } = useAccount();
    const wallets = useWallets();
    const { disconnect } = useDisconnect();

    // Survey data (persistent)
    const surveyDataRef = useRef<SurveyData | null>(null);

    // === Auto-register on wallet connect ===
    useEffect(() => {
        // فقط وقتی survey تکمیل شده و کیف پول وصل شده
        if (surveyDataRef.current && isConnected && address && wallets.length > 0 && !registerLoading && !registerSuccess) {
            setRegisterLoading(true);
            console.log("🔄 Auto-register triggered...");
            handleAutoRegister();
        }
    }, [isConnected, address, wallets.length]); // ✅ فقط این وابستگی‌ها

    // === Survey Helpers ===

    const survey = [
        { roles: "Raise Fund", name: "Raise Fund", icon: fund, flex: "sm:flex-[2]" },
        { roles: "Contract", name: "Contract", icon: contract, flex: "sm:flex-[1]" },
        { roles: "Audit", name: "Audit", icon: audit, flex: "sm:flex-[1]" },
        { roles: "Invest", name: "Invest", icon: invest, flex: "sm:flex-[2]" },
    ];

    const handleActionSelect = (action: string) => {
        setSelectedAction(action);
        setCurrentStep(2);
    };

    const handleTypeSelect = (type: "individual" | "organization") => {
        setUserType(type);
        setCurrentStep(3);
    };

    const handleIndividualConfirm = (key: keyof typeof confirmations, checked: boolean) => {
        setConfirmations((prev) => ({ ...prev, [key]: checked }));
    };

    const handleOrgConfirm = (key: keyof typeof orgConfirmations, checked: boolean) => {
        setOrgConfirmations((prev) => ({ ...prev, [key]: checked }));
    };

    const buildSurveyData = (): SurveyData => ({
        role: selectedAction,
        type: userType,
        confirm_tos: accountForm.termsAgreed,
        email: accountForm.email,
        ...(userType === "individual"
            ? {
                first_name: personalForm.firstName,
                last_name: personalForm.lastName,
                phone_number: personalForm.phoneNumber,
            }
            : {
                contact_fullname: orgForm.contactFullName,
                company_name: orgForm.companyName,
                phone_number: orgForm.phoneNumber,
            }),
    });

    const handleConfirmContinue = () => {
        let eligible = true;
        if (userType === "individual") {
            if (!confirmations.ukResident || !confirmations.niNumber) eligible = false;
        } else {
            if (!orgConfirmations.ukBased || !orgConfirmations.companyHouse) eligible = false;
        }
        setIsEligible(eligible);
        setCurrentStep(eligible ? 5 : 4);
    };

    const handlePersonalSubmit = () => setCurrentStep(6);

    const handlePersonalChange = (key: string, value: string, isOrg = false) => {
        if (isOrg) setOrgForm((prev) => ({ ...prev, [key]: value }));
        else setPersonalForm((prev) => ({ ...prev, [key]: value }));
        if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
    };

    const handleAccountChange = (key: string, value: string | boolean) => {
        setAccountForm((prev) => ({ ...prev, [key]: value }));
        if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
    };

    const handleAccountSubmit = () => {
        const data = buildSurveyData();
        surveyDataRef.current = data;
        console.log("✅ Survey completed. Waiting for wallet connection...");
        setCurrentStep(8); // → Auto Wallet Step
    };

    // === 💡 کلید اصلی: تابع آماده‌سازی payload با همه ۱۲ فیلد (حتی خالی‌ها)
    const prepareRegisterPayload = (address: string, message: string, signature: string) => {
        const survey = surveyDataRef.current!;
        return {
            role: survey.role || "",
            type: survey.type,
            wallet_address: address,
            signature: signature,
            message: message,
            confirm_tos: survey.confirm_tos || false,
            first_name: survey.type === "individual" ? survey.first_name || "" : "",
            last_name: survey.type === "individual" ? survey.last_name || "" : "",
            phone_number: survey.phone_number || "",
            email: survey.email || "",
            contact_fullname: survey.type === "organization" ? survey.contact_fullname || "" : "",
            company_name: survey.type === "organization" ? survey.company_name || "" : "",
        };
    };

    // === 🔁 Auto Register Logic ===
    const handleAutoRegister = async () => {
        if (!surveyDataRef.current) return;

        try {
            // 1️⃣ Get challenge
            const challengeResp = await apiService.post<{ message: string }>("/auth/challenge", {
                wallet_address: address!,
            });
            const message = challengeResp.message?.trim();
            if (!message) throw new Error("چالش دریافت نشد.");

            // 2️⃣ Sign
            const walletClient = wallets[0].getWalletClient();
            if (!walletClient) throw new Error("walletClient در دسترس نیست.");
            const signature = await walletClient.signMessage({ message });

            // 3️⃣ Prepare full payload (✅ همه ۱۲ فیلد)
            const payload = prepareRegisterPayload(address!, message, signature);

            console.log("📤 Sending register payload:", payload);
            console.table(payload);

            // 4️⃣ Register
            await apiService.post("/auth/register", payload);

            setRegisterSuccess(true);
            console.log("✅ Auto-register succeeded!");
        } catch (err: any) {
            console.error("❌ Auto-register failed:", err);
            alert(`❌ خطا در ثبت‌نام خودکار:\n${err.response?.data?.message || err.message || "خطای نامشخص"}`);
            setRegisterLoading(false);
        }
    };

    const handleDisconnect = () => {
        disconnect();
        setRegisterLoading(false);
        setRegisterSuccess(false);
        alert("کیف پول قطع شد. می‌توانید دوباره وصل کنید.");
    };

    const resetFlow = () => {
        setCurrentStep(1);
        surveyDataRef.current = null;
        setSelectedAction("");
        setUserType("individual");
        setConfirmations({ ukResident: false, niNumber: false, over18: false });
        setOrgConfirmations({ ukBased: false, companyHouse: false, active: false });
        setPersonalForm({ firstName: "", lastName: "", phoneNumber: "" });
        setOrgForm({ contactFullName: "", companyName: "", phoneNumber: "" });
        setAccountForm({ email: "", termsAgreed: false });
        setErrors({});
        setRegisterLoading(false);
        setRegisterSuccess(false);
    };

    // === UI ===

    const renderStep1 = () => (
        <>
            <Image priority src={infafund} alt="infafund" width={172} height={42} className="mb-4" />
            <span className="text-base text-white block mb-2">Let’s Get Started</span>
            <span className="text-2xl text-white font-semibold">What do you want to do with InFraFund?</span>
            <div className="space-y-4 mb-8 md:space-y-6">
                <div className="flex flex-col sm:flex-row gap-4 md:gap-6 items-stretch">
                    {survey.slice(0, 2).map((item) => (
                        <div
                            key={item.name}
                            className={`bg-gray-800 rounded-lg p-4 border border-green-500 flex flex-col items-center cursor-pointer hover:bg-gray-700 transition-colors md:p-6 flex-1 ${item.flex}`}
                            onClick={() => handleActionSelect(item.name)}
                        >
                            <Image src={item.icon} alt={item.name} width={48} height={48} className="mb-2 md:mb-3" />
                            <span className="text-white font-medium text-center text-sm md:text-base">{item.name}</span>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-4 md:gap-6 items-stretch">
                    {survey.slice(2).map((item) => (
                        <div
                            key={item.name}
                            className={`bg-gray-800 rounded-lg p-4 border border-green-500 flex flex-col items-center cursor-pointer hover:bg-gray-700 transition-colors md:p-6 flex-1 ${item.flex}`}
                            onClick={() => handleActionSelect(item.name)}
                        >
                            <Image src={item.icon} alt={item.name} width={48} height={48} className="mb-2 md:mb-3" />
                            <span className="text-white font-medium text-center text-sm md:text-base">{item.name}</span>
                        </div>
                    ))}
                </div>
            </div>
            <button
                className="w-full py-3 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition-colors disabled:opacity-50 md:w-auto md:px-8"
                disabled={!selectedAction}
                onClick={() => selectedAction && setCurrentStep(2)}
            >
                Continue
            </button>
        </>
    );

    const renderStep2 = () => (
        <>
            <Image priority src={infafund} alt="infafund" width={172} height={42} className="mb-4" />
            <span className="text-base text-white block mb-2">Selected: {selectedAction}</span>
            <span className="text-2xl text-white font-semibold">Are you an Individual or Organization?</span>
            <div className="grid grid-cols-1 gap-4 mb-8 md:gap-6">
                <div
                    className="bg-gray-800 rounded-lg p-4 border border-green-500 flex flex-col items-center cursor-pointer hover:bg-gray-700 transition-colors md:p-6"
                    onClick={() => handleTypeSelect("individual")}
                >
                    <span className="text-white font-medium text-center text-sm md:text-base">Individual</span>
                </div>
                <div
                    className="bg-gray-800 rounded-lg p-4 border border-green-500 flex flex-col items-center cursor-pointer hover:bg-gray-700 transition-colors md:p-6"
                    onClick={() => handleTypeSelect("organization")}
                >
                    <span className="text-white font-medium text-center text-sm md:text-base">Organization</span>
                </div>
            </div>
            <button
                className="w-full py-3 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition-colors disabled:opacity-50 md:w-auto md:px-8"
                disabled={!userType}
                onClick={() => userType && setCurrentStep(3)}
            >
                Continue
            </button>
        </>
    );

    const renderStep3 = () => (
        <>
            <Image priority src={infafund} alt="infafund" width={172} height={42} className="mb-4" />
            <span className="text-2xl text-white font-semibold mb-6 block">First, please confirm the following.</span>
            <div className="space-y-4 mb-8">
                {userType === "individual" ? (
                    <>
                        <label className="flex items-center space-x-3 cursor-pointer">
                            <input
                                type="checkbox"
                                className="w-5 h-5 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
                                checked={confirmations.ukResident}
                                onChange={(e) => handleIndividualConfirm("ukResident", e.target.checked)}
                            />
                            <span className="text-white text-sm">I am currently a UK resident</span>
                        </label>
                        <label className="flex items-center space-x-3 cursor-pointer">
                            <input
                                type="checkbox"
                                className="w-5 h-5 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
                                checked={confirmations.niNumber}
                                onChange={(e) => handleIndividualConfirm("niNumber", e.target.checked)}
                            />
                            <span className="text-white text-sm">I have a valid UK national insurance number</span>
                        </label>
                        <label className="flex items-center space-x-3 cursor-pointer">
                            <input
                                type="checkbox"
                                className="w-5 h-5 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
                                checked={confirmations.over18}
                                onChange={(e) => handleIndividualConfirm("over18", e.target.checked)}
                            />
                            <span className="text-white text-sm">I am at least 18 years old</span>
                        </label>
                    </>
                ) : (
                    <>
                        <label className="flex items-center space-x-3 cursor-pointer">
                            <input
                                type="checkbox"
                                className="w-5 h-5 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
                                checked={orgConfirmations.ukBased}
                                onChange={(e) => handleOrgConfirm("ukBased", e.target.checked)}
                            />
                            <span className="text-white text-sm">Our company is based in UK.</span>
                        </label>
                        <label className="flex items-center space-x-3 cursor-pointer">
                            <input
                                type="checkbox"
                                className="w-5 h-5 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
                                checked={orgConfirmations.companyHouse}
                                onChange={(e) => handleOrgConfirm("companyHouse", e.target.checked)}
                            />
                            <span className="text-white text-sm">We have a valid UK company house number.</span>
                        </label>
                        <label className="flex items-center space-x-3 cursor-pointer">
                            <input
                                type="checkbox"
                                className="w-5 h-5 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
                                checked={orgConfirmations.active}
                                onChange={(e) => handleOrgConfirm("active", e.target.checked)}
                            />
                            <span className="text-white text-sm">Our company is currently active.</span>
                        </label>
                    </>
                )}
            </div>
            <button
                className="w-full py-3 bg-green-600 text-white rounded-md hover:bg-green-500 transition-colors md:w-auto md:px-8"
                onClick={handleConfirmContinue}
            >
                Continue
            </button>
        </>
    );

    const renderStep4 = () => (
        <div className="text-center">
            <Image priority src={infafund} alt="infafund" width={172} height={42} className="mx-auto mb-4" />
            <span className="text-2xl text-white font-semibold mb-4 block">Not Eligible</span>
            <p className="text-white text-sm mb-6">
                We’re sorry, but at this time we only support UK residents and UK-based organizations.
            </p>
            <button
                className="w-full py-3 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition-colors md:w-auto md:px-8"
                onClick={resetFlow}
            >
                Back to Start
            </button>
        </div>
    );

    const renderStep5 = () => (
        <>
            <Image priority src={infafund} alt="infafund" width={172} height={42} className="mb-4" />
            <span className="text-2xl text-white font-semibold mb-6 block">Great! Let&apos;s get started.</span>
            <div className="space-y-4 mb-8">
                {userType === "individual" ? (
                    <>
                        <div>
                            <label className="block text-white text-sm mb-1">First Name</label>
                            <input
                                type="text"
                                value={personalForm.firstName}
                                onChange={(e) => handlePersonalChange("firstName", e.target.value)}
                                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:border-green-500"
                                placeholder="First Name"
                            />
                        </div>
                        <div>
                            <label className="block text-white text-sm mb-1">Last Name</label>
                            <input
                                type="text"
                                value={personalForm.lastName}
                                onChange={(e) => handlePersonalChange("lastName", e.target.value)}
                                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:border-green-500"
                                placeholder="Last Name"
                            />
                        </div>
                        <div>
                            <label className="block text-white text-sm mb-1">Phone Number</label>
                            <input
                                type="tel"
                                value={personalForm.phoneNumber}
                                onChange={(e) => handlePersonalChange("phoneNumber", e.target.value)}
                                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:border-green-500"
                                placeholder="Phone Number"
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <div>
                            <label className="block text-white text-sm mb-1">Contact Full Name</label>
                            <input
                                type="text"
                                value={orgForm.contactFullName}
                                onChange={(e) => handlePersonalChange("contactFullName", e.target.value, true)}
                                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:border-green-500"
                                placeholder="Contact Full Name"
                            />
                        </div>
                        <div>
                            <label className="block text-white text-sm mb-1">Company Name</label>
                            <input
                                type="text"
                                value={orgForm.companyName}
                                onChange={(e) => handlePersonalChange("companyName", e.target.value, true)}
                                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:border-green-500"
                                placeholder="Company Name"
                            />
                        </div>
                        <div>
                            <label className="block text-white text-sm mb-1">Phone Number</label>
                            <input
                                type="tel"
                                value={orgForm.phoneNumber}
                                onChange={(e) => handlePersonalChange("phoneNumber", e.target.value, true)}
                                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:border-green-500"
                                placeholder="Phone Number"
                            />
                        </div>
                    </>
                )}
            </div>
            <div className="flex space-x-2">
                <button
                    className="flex-1 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition-colors"
                    onClick={() => setCurrentStep(3)}
                >
                    Back
                </button>
                <button
                    className="flex-1 py-3 bg-green-600 text-white rounded-md hover:bg-green-500 transition-colors"
                    onClick={handlePersonalSubmit}
                >
                    Continue
                </button>
            </div>
        </>
    );

    const renderStep6 = () => (
        <>
            <Image priority src={infafund} alt="infafund" width={172} height={42} className="mb-4" />
            <span className="text-2xl text-white font-semibold mb-6 block">Let&apos;s create your account!</span>
            <div className="space-y-4 mb-8">
                <div>
                    <label className="block text-white text-sm mb-1">Email</label>
                    <input
                        type="email"
                        value={accountForm.email}
                        onChange={(e) => handleAccountChange("email", e.target.value)}
                        className="w-full p-3 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:border-green-500"
                        placeholder="Email"
                    />
                </div>
                <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                        type="checkbox"
                        className="w-5 h-5 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
                        checked={accountForm.termsAgreed}
                        onChange={(e) => handleAccountChange("termsAgreed", e.target.checked)}
                    />
                    <span className="text-white text-sm">
                        By creating an account, I agree to InFraFund&apos;s{" "}
                        <span className="text-green-400">Terms of Service and Privacy Notice</span>.
                    </span>
                </label>
            </div>
            <div className="flex space-x-2">
                <button
                    className="flex-1 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition-colors"
                    onClick={() => setCurrentStep(5)}
                >
                    Back
                </button>
                <button
                    className="flex-1 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-400 transition-colors disabled:opacity-50"
                    disabled={!accountForm.email || !accountForm.termsAgreed}
                    onClick={handleAccountSubmit}
                >
                    Complete Survey
                </button>
            </div>
        </>
    );

    const renderStep8 = () => (
        <>
            <Image priority src={infafund} alt="infafund" width={172} height={42} className="mb-4" />
            <span className="text-2xl text-white font-semibold mb-2">🔐 Connect Your Wallet</span>
            <p className="text-white text-sm mb-2">
                Please connect your wallet using Particle. Registration will start automatically.
            </p>

            <div className="space-y-4 mb-6">
                {registerSuccess ? (
                    <div className="bg-green-900/30 border border-green-500 rounded-lg p-4 text-center">
                        <span className="text-green-400">✅ Registration completed!</span>
                        <p className="text-white text-sm mt-1">Welcome to InFraFund!</p>
                    </div>
                ) : registerLoading ? (
                    <div className="bg-blue-900/30 border border-blue-500 rounded-lg p-4 text-center">
                        <span className="text-blue-400">⏳ Processing...</span>
                        <p className="text-white text-sm mt-1">Getting challenge and signing...</p>
                    </div>
                ) : isConnected && address ? (
                    <div className="bg-gray-800 p-4 rounded-lg border border-green-500">
                        <p className="text-green-400 text-sm">✅ Connected</p>
                        <p className="text-white font-mono text-sm mt-1">
                            {address.slice(0, 6)}...{address.slice(-4)}
                        </p>
                    </div>
                ) : (
                    // ✅ اینجا اضافه کردیم: دکمه ConnectButton برای باز کردن Particle UI
                    <div className="bg-gray-800 p-4 rounded-lg border border-yellow-500">
                        <p className="text-yellow-400">⚠️ Not connected</p>
                        <p className="text-white text-sm mt-1">Click the button below to connect.</p>
                        <div className="mt-3 flex justify-center">
                            <ConnectButton
                            />
                        </div>
                    </div>
                )}

                {isConnected && !registerSuccess && (
                    <div className="flex flex-col sm:flex-row gap-2">
                        <button
                            onClick={handleDisconnect}
                            className="flex-1 py-2 px-4 bg-red-600 text-white rounded-md text-sm hover:bg-red-500"
                        >
                            Disconnect
                        </button>
                        {registerLoading ? (
                            <button
                                className="flex-1 py-2 px-4 bg-gray-600 text-white rounded-md text-sm cursor-not-allowed"
                                disabled
                            >
                                Registering...
                            </button>
                        ) : (
                            <button
                                onClick={() => handleAutoRegister()}
                                className="flex-1 py-2 px-4 bg-green-600 text-white rounded-md text-sm hover:bg-green-500"
                            >
                                Retry Register
                            </button>
                        )}
                    </div>
                )}
            </div>

            <button
                onClick={() => setCurrentStep(6)}
                className="w-full py-2 bg-gray-600 text-white rounded-md text-sm hover:bg-gray-500"
            >
                ← Back to Survey
            </button>
        </>
    );

    return (
        <Modal
            isOpen={true}
            onClose={() => console.log("Modal closed")}
            className="w-full h-full px-4 py-8 bg-gray-900 sm:px-6 sm:py-12 md:w-auto md:max-w-lg md:mx-auto md:my-auto md:p-8 md:h-auto md:rounded-lg md:shadow-xl"
        >
            <div className="flex flex-col h-full justify-between md:h-auto">
                {process.env.NODE_ENV === "development" && currentStep > 1 && (
                    <div className="text-right mb-2">
                        <button
                            onClick={resetFlow}
                            className="text-xs text-gray-400 hover:text-white underline"
                        >
                            Reset Flow
                        </button>
                    </div>
                )}

                {currentStep === 1 && renderStep1()}
                {currentStep === 2 && renderStep2()}
                {currentStep === 3 && renderStep3()}
                {currentStep === 4 && renderStep4()}
                {currentStep === 5 && renderStep5()}
                {currentStep === 6 && renderStep6()}
                {currentStep === 8 && renderStep8()}

                <div className="mt-6 text-center text-xs text-gray-500">
                    {registerSuccess ? "✅ Done" : `Step ${currentStep === 8 ? "Wallet + Register" : currentStep} of 6 + Auto`}
                </div>
            </div>
        </Modal>
    );
}