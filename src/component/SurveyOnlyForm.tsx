// src/components/SurveyOnlyForm.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

import fund from "@/../public/svg/Raise-Fund.svg";
import contract from "@/../public/svg/Contract.svg";
import audit from "@/../public/svg/Audit.svg";
import invest from "@/../public/svg/Invest-flow.svg";
import infafund from "@/../public/svg/infrafund.svg";
import Individual from "@/../public/svg/Individual.svg";
import organization from "@/../public/svg/organization.svg";
import apiService from "@/services/apiService";
import { Modal } from "./ui/modal";
import { CustomButton } from "./ui/custom-button";
import { Check } from "lucide-react";
import { FormInput } from "./ui/form-input";
import Link from "next/link";

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

type Step = 1 | 2 | 3 | 4 | 5 | 6;

export interface SurveyOnlyFormProps {
    onSuccess?: (data: SurveyData) => void;
    onError?: (error: Error) => void;
    endpoint?: string;
    isModalOpen: boolean;
    setIsModalOpen: (isOpen: boolean) => void;
}

export default function SurveyOnlyForm({
    onSuccess,
    onError,
    isModalOpen,
    setIsModalOpen
}: SurveyOnlyFormProps) {
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
    const [submitting, setSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [selectedItem, setSelectedItem] = useState<string | null>(null);

    const surveyDataRef = useRef<SurveyData | null>(null);

    const survey = [
        { roles: "Raise Fund", name: "Raise Funds (Project Developer)", icon: fund, description: "I am a project owner or developer seeking capital for a renewable energy infrastructure or NetZero project." },
        { roles: "Invest", name: "Invest in Assets (Investor)", icon: invest, description: "I want to discover, fund, and track high-impact, transparent green project." },
        { roles: "Contract", name: "Manage Construction (Contractor)", icon: contract, description: "I am an EPC or General Contractor to build a project and will be reporting on milestone progress." },
        { roles: "Audit", name: "Audit & Verify (Auditor)", icon: audit, description: "I am an independent third-party verifier responsible for validating project milestones, quality, and data." },
    ];

    const handleActionSelect = (action: string) => {
        setSelectedAction(action);
        setSelectedItem(action);
    };


    const handleTypeSelect = (type: "individual" | "organization") => {
        setUserType(type);
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

    const handlePersonalChange = (key: string, value: string, isOrg = false) => {
        if (isOrg) setOrgForm((prev) => ({ ...prev, [key]: value }));
        else setPersonalForm((prev) => ({ ...prev, [key]: value }));
        if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
    };

    const handleAccountChange = (key: string, value: string | boolean) => {
        setAccountForm((prev) => ({ ...prev, [key]: value }));
        if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
    };

    const handleSubmitSurvey = async () => {
        const data = buildSurveyData();
        surveyDataRef.current = data;

        setSubmitting(true);

        try {
            const payload = {
                role: data.role || "",
                type: data.type,
                confirm_tos: data.confirm_tos || false,
                first_name: data.type === "individual" ? data.first_name || "" : "",
                last_name: data.type === "individual" ? data.last_name || "" : "",
                phone_number: data.phone_number || "",
                email: data.email || "",
                contact_fullname: data.type === "organization" ? data.contact_fullname || "" : "",
                company_name: data.type === "organization" ? data.company_name || "" : "",
            };

            console.log(`📤 Survey data ready (no API call):`, payload);

            const setDomainCookie = (name: string, value: any, minutes = 10) => {
                const expires = new Date(Date.now() + minutes * 60 * 1000).toUTCString();
                const encoded = encodeURIComponent(JSON.stringify(value));
                document.cookie = `${name}=${encoded}; Path=/; Domain=.infrafund.test; Max-Age=${minutes * 60}; SameSite=Lax`;
                console.log(`🍪 Cookie set: ${name} (expires in ${minutes} min)`);
            };

            setDomainCookie("survey_data", payload, 15);

            setSubmitSuccess(true);
            onSuccess?.(data);

            setTimeout(() => {
                window.location.href = "http://dash.infrafund.test:3001";
            }, 800);

        } catch (err: any) {
            console.error("❌ Client-side error:", err);
            const error = new Error("خطا در ذخیره اطلاعات — لطفاً دوباره تلاش کنید");
            onError?.(error);
            alert(`❌ خطا:\n${error.message}`);
        } finally {
            setSubmitting(false);
        }
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
        setSubmitting(false);
        setSubmitSuccess(false);
    };

    // --- Renderers ---
    const renderStep1 = () => (
        <>
            <div className="w-full h-fit flex flex-col justify-center items-start gap-1">
                <span className="text-base text-white block">Let’s Get Started</span>
                <span className="text-2xl text-white font-semibold">What do you want to do with InFraFund?</span>
            </div>
            <div className="space-y-4 w-full">
                {survey.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => handleActionSelect(item.name)}
                        className={`w-full h-fit py-4 px-6 flex justify-start items-center gap-4 rounded-[12px] cursor-pointer transition-all duration-200
          ${selectedItem === item.name
                                ? "bg-[#343C52] border border-[#777777] backdrop-blur-[70px]"
                                : "bg-[#131C2F]"
                            }`}
                    >
                        <Image src={item.icon} width={48} height={48} alt={item.roles} />
                        <div className="flex flex-col gap-2 justify-center text-left">
                            <span className="text-lg text-white font-medium">{item.name}</span>
                            <span className="text-xs text-[#A3A3A3] font-normal">{item.name}</span>
                        </div>
                    </div>
                ))}
            </div>
            <CustomButton
                variant="outlined"
                className="w-full bg-gray-600 text-white rounded-md hover:bg-gray-500 transition-colors disabled:opacity-50 md:w-auto md:px-8"
                disabled={!selectedAction}
                onClick={() => selectedAction && setCurrentStep(2)}
            >
                Continue
            </CustomButton>
        </>
    );

    const renderStep2 = () => (
        <>
            <span className="text-2xl text-white font-semibold">Are you an Individual or Organization?</span>
            <div className="flex justify-between items-center w-full bg-blue-500">
                <div
                    className={` rounded-lg p-4 w-[241px] flex flex-col items-center justify-center cursor-pointer  hover:bg-gray-700 transition-colors md:p-6   ${userType === "individual"
                        ? "bg-[#343C52] border border-[#777777] backdrop-blur-[70px]"
                        : "bg-[#131C2F]"
                        }`}
                    onClick={() => handleTypeSelect("individual")}
                >
                    <Image src={Individual} width={64} height={64} alt="Individual" />
                    <span className="text-white font-medium text-center text-sm md:text-base">Individual</span>
                </div>
                <div
                    className={` rounded-lg p-4 w-[241px]  flex flex-col items-center justify-center cursor-pointer  hover:bg-gray-700 transition-colors md:p-6   ${userType === "organization"
                        ? "bg-[#343C52] border border-[#777777] backdrop-blur-[70px]"
                        : "bg-[#131C2F]"
                        }`}
                    onClick={() => handleTypeSelect("organization")}
                >
                    <Image src={organization} width={64} height={64} alt="organization" />
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
        <div className="w-full space-y-4">
            <span className="text-2xl text-white font-semibold text-left block">First, please confirm the following.</span>
            <div className="space-y-4">
                {userType === "individual" ? (
                    <>
                        <label className="flex items-center gap-4 bg-slate-700 rounded-2xl p-6 cursor-pointer hover:bg-slate-600 transition-colors">
                            <div className="relative flex-shrink-0">
                                <input
                                    type="checkbox"
                                    className="peer sr-only"
                                    checked={confirmations.ukResident}
                                    onChange={(e) => handleIndividualConfirm("ukResident", e.target.checked)}
                                />
                                <div className="w-8 h-8 bg-[#2B3146] rounded-xl flex items-center justify-center transition-colors duration-300 peer-checked:bg-[#00FF87]">
                                    <Check
                                        className="w-5 h-5 text-[#2B3146] peer-checked:text-black transition-colors duration-300"
                                    />
                                </div>
                            </div>

                            <span className="text-white font-mono">I am currently a UK resident</span>
                        </label>
                        <label className="flex items-center gap-4 bg-slate-700 rounded-2xl p-6 cursor-pointer hover:bg-slate-650 transition-colors group">
                            <div className="relative flex-shrink-0">
                                <input
                                    type="checkbox"
                                    className="peer sr-only"
                                    checked={confirmations.niNumber}
                                    onChange={(e) => handleIndividualConfirm("niNumber", e.target.checked)}
                                />
                                <div className="w-8 h-8 bg-[#2B3146] rounded-xl flex items-center justify-center transition-colors duration-300 peer-checked:bg-[#00FF87]">
                                    <Check
                                        className="w-5 h-5 text-[#2B3146] peer-checked:text-black transition-colors duration-300"
                                    />
                                </div>
                            </div>
                            <span className="text-white font-mono">I have a valid UK national insurance number</span>
                        </label>

                        <label className="flex items-center gap-4 bg-slate-700 rounded-2xl p-6 cursor-pointer hover:bg-slate-650 transition-colors group">
                            <div className="relative flex-shrink-0">
                                <input
                                    type="checkbox"
                                    className="peer sr-only"
                                    checked={confirmations.over18}
                                    onChange={(e) => handleIndividualConfirm("over18", e.target.checked)}
                                />
                                <div className="w-8 h-8 bg-[#2B3146] rounded-xl flex items-center justify-center transition-colors duration-300 peer-checked:bg-[#00FF87]">
                                    <Check
                                        className="w-5 h-5 text-[#2B3146] peer-checked:text-black transition-colors duration-300"
                                    />
                                </div>
                            </div>
                            <span className="text-white font-mono">I am at least 18 years old</span>
                        </label>
                    </>
                ) : (
                    <>
                        <label className="flex items-center space-x-3 cursor-pointer">
                            <div className="relative flex-shrink-0">
                                <input
                                    type="checkbox"
                                    className="peer sr-only"
                                    checked={orgConfirmations.ukBased}
                                    onChange={(e) => handleOrgConfirm("ukBased", e.target.checked)}
                                />
                                <div className="w-8 h-8 bg-[#2B3146] rounded-xl flex items-center justify-center transition-colors duration-300 peer-checked:bg-[#00FF87]">
                                    <Check
                                        className="w-5 h-5 text-[#2B3146] peer-checked:text-black transition-colors duration-300"
                                    />
                                </div>
                            </div>
                            <span className="text-white text-sm">Our company is based in UK.</span>
                        </label>
                        <label className="flex items-center space-x-3 cursor-pointer">
                            <div className="relative flex-shrink-0">
                                <input
                                    type="checkbox"
                                    className="peer sr-only"
                                    checked={orgConfirmations.companyHouse}
                                    onChange={(e) => handleOrgConfirm("companyHouse", e.target.checked)}
                                />
                                <div className="w-8 h-8 bg-[#2B3146] rounded-xl flex items-center justify-center transition-colors duration-300 peer-checked:bg-[#00FF87]">
                                    <Check
                                        className="w-5 h-5 text-[#2B3146] peer-checked:text-black transition-colors duration-300"
                                    />
                                </div>
                            </div>
                            <span className="text-white text-sm">We have a valid UK company house number.</span>
                        </label>
                        <label className="flex items-center space-x-3 cursor-pointer">
                            <div className="relative flex-shrink-0">
                                <input
                                    type="checkbox"
                                    className="peer sr-only"
                                    checked={orgConfirmations.active}
                                    onChange={(e) => handleOrgConfirm("active", e.target.checked)}
                                />
                                <div className="w-8 h-8 bg-[#2B3146] rounded-xl flex items-center justify-center transition-colors duration-300 peer-checked:bg-[#00FF87]">
                                    <Check
                                        className="w-5 h-5 text-[#2B3146] peer-checked:text-black transition-colors duration-300"
                                    />
                                </div>
                            </div>
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
        </div>
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
        <div className="w-full text-left">
            <span className="text-2xl text-white font-semibold mb-6 block">Great! Let&apos;s get started.</span>
            <div className="space-y-4 mb-8">
                {userType === "individual" ? (
                    <>
                        <div className="w-full">
                            <FormInput label="First Name" placeholder="First Name" type="text" value={personalForm.firstName}
                                onChange={(e) => handlePersonalChange("firstName", e.target.value)} />
                        </div>
                        <div className="w-full">
                            <FormInput label="Last Name" placeholder="Last Name" type="text" value={personalForm.lastName}
                                onChange={(e) => handlePersonalChange("lastName", e.target.value)} />
                        </div>
                        <div className="w-full">
                            <FormInput label="Phone Number" placeholder="Phone Number" type="tel" value={personalForm.phoneNumber}
                                onChange={(e) => handlePersonalChange("phoneNumber", e.target.value)} />
                        </div>
                    </>
                ) : (
                    <>
                        <div className="w-full">
                            <FormInput label="Contact Full Name" placeholder="Contact Full Name" type="text" value={orgForm.contactFullName}
                                onChange={(e) => handlePersonalChange("contactFullName", e.target.value, true)} />
                        </div>
                        <div className="w-full">
                            <FormInput label="Company Name" placeholder="Company Name" type="text" value={orgForm.companyName}
                                onChange={(e) => handlePersonalChange("companyName", e.target.value, true)} />
                        </div>
                        <div className="w-full">
                            <FormInput label="Phone Number" placeholder="Phone Number" type="tel" value={orgForm.phoneNumber}
                                onChange={(e) => handlePersonalChange("phoneNumber", e.target.value, true)} />
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
                    onClick={() => setCurrentStep(5 + 1)}
                >
                    Continue
                </button>
            </div>
        </div>
    );

    const renderStep6 = () => (
        <div className="w-full text-left">
            <span className="text-2xl text-white font-semibold mb-6 block">Let&apos;s create your account!</span>
            <div className="space-y-4 mb-8">
                <div className="w-full">
                    <FormInput label="Email" placeholder="Email" type="text" value={accountForm.email}
                        onChange={(e) => handleAccountChange("email", e.target.value)} />
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
                        <Link href="/terms" className="text-green-400 hover:text-primary">Terms of Service and Privacy Notice</Link>.
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
                    className="flex-1 py-3 bg-green-600 text-white rounded-md hover:bg-green-500 transition-colors disabled:opacity-50"
                    disabled={!accountForm.email || !accountForm.termsAgreed || submitting}
                    onClick={handleSubmitSurvey}
                >
                    {submitting ? "Submitting..." : submitSuccess ? "✅ Submitted!" : "Submit Survey"}
                </button>
            </div>
            {submitSuccess && (
                <div className="mt-4 p-3 bg-green-900/30 border border-green-500 rounded text-center text-green-300 text-sm">
                    Survey submitted successfully. Thank you!
                </div>
            )}
        </div>
    );

    return (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} showCloseButton={false}>
            <div className="w-full h-full  flex flex-col justify-center items-center gap-8">
                <Image priority src={infafund} alt="infafund" width={172} height={42} />
                {currentStep === 1 && renderStep1()}
                {currentStep === 2 && renderStep2()}
                {currentStep === 3 && renderStep3()}
                {currentStep === 4 && renderStep4()}
                {currentStep === 5 && renderStep5()}
                {currentStep === 6 && renderStep6()}
            </div>
        </Modal>
    );
}