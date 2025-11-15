"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import fund from "@/../public/svg/Raise-Fund.svg";
import contract from "@/../public/svg/Contract.svg";
import audit from "@/../public/svg/Audit.svg";
import invest from "@/../public/svg/Invest-flow.svg";
import infafund from "@/../public/svg/infrafund.svg";
import Individual from "@/../public/svg/Individual.svg";
import organization from "@/../public/svg/organization.svg";
import { Modal } from "./ui/modal";
import { CustomButton } from "./ui/custom-button";
import { Check } from "lucide-react";
import { FormInput } from "./ui/form-input";
import Link from "next/link";

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
    setIsModalOpen,
}: SurveyOnlyFormProps) {
    const [currentStep, setCurrentStep] = useState<Step>(1);
    const [selectedAction, setSelectedAction] = useState("");
    const [userType, setUserType] = useState<"individual" | "organization" | null>(null);
    const [confirmations, setConfirmations] = useState({
        ukResident: true,
        niNumber: true,
        over18: true,
    });
    const [orgConfirmations, setOrgConfirmations] = useState({
        ukBased: true,
        companyHouse: true,
        active: true,
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
    const [submitting, setSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [selectedItem, setSelectedItem] = useState<string | null>(null);
    const [showUnder18Warning, setShowUnder18Warning] = useState(false);
    const surveyDataRef = useRef<SurveyData | null>(null);

    const formatPhoneNumber = (value: string): string => {
        let digits = '';
        if (value.startsWith('+44')) {
            digits = value.slice(3).replace(/\D/g, '');
        } else {
            digits = value.replace(/\D/g, '');
            if (digits.startsWith('0')) {
                digits = digits.slice(1);
            }
        }
        const length = digits.length;
        if (length === 0) return '+44 ';
        let formatted = '+44 ';
        if (length < 3) {
            formatted += `(${digits}`;
        } else if (length < 6) {
            formatted += `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
        } else if (length < 10) {
            formatted += `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
        } else {
            formatted += `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
        }
        return formatted;
    };

    const survey = [
        {
            roles: ["client"],
            name: "Raise Funds (Project Developer)",
            icon: fund,
            description: "I am a project owner or developer seeking capital for a renewable energy infrastructure or NetZero project.",
        },
        {
            roles: ["investor"],
            name: "Invest in Assets (Investor)",
            icon: invest,
            description: "I want to discover, fund, and track high-impact, transparent green project.",
        },
        {
            roles: ["contractor"],
            name: "Manage Construction (Contractor)",
            icon: contract,
            description: "I am an EPC or General Contractor to build a project and will be reporting on milestone progress.",
        },
        {
            roles: ["auditor"],
            name: "Audit & Verify (Auditor)",
            icon: audit,
            description: "I am an independent third-party verifier responsible for validating project milestones, quality, and data.",
        },
    ];

    const handleActionSelect = (action: string) => {
        setSelectedAction(action);
        setSelectedItem(action);
    };

    const handleTypeSelect = (type: "individual" | "organization") => {
        setUserType(type);
    };

    const handleIndividualConfirm = (key: keyof typeof confirmations, checked: boolean) => {
        setConfirmations((prev) => {
            const newConf = { ...prev, [key]: checked };
            if (currentStep === 3) {
                if (!newConf.over18) {
                    setShowUnder18Warning(true);
                } else {
                    setShowUnder18Warning(false);
                    const prevEligible = prev.ukResident && prev.niNumber && prev.over18;
                    const nowEligible = newConf.ukResident && newConf.niNumber && newConf.over18;
                    if (prevEligible && !nowEligible) {
                        setCurrentStep(4);
                    }
                }
            }
            return newConf;
        });
    };

    const handleOrgConfirm = (key: keyof typeof orgConfirmations, checked: boolean) => {
        setOrgConfirmations((prev) => {
            const newConf = { ...prev, [key]: checked };
            if (currentStep === 3) {
                const prevEligible = prev.ukBased && prev.companyHouse;
                const nowEligible = newConf.ukBased && newConf.companyHouse;
                if (prevEligible && !nowEligible) {
                    setCurrentStep(4);
                }
            }
            return newConf;
        });
    };

    const buildSurveyData = (): SurveyData => ({
        role: selectedAction,
        type: userType!,
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
        if (userType === "individual") {
            if (!confirmations.ukResident || !confirmations.niNumber || !confirmations.over18) return;
        } else {
            if (!orgConfirmations.ukBased || !orgConfirmations.companyHouse) return;
        }
        setCurrentStep(5);
    };

    const handlePersonalChange = (key: string, value: string, isOrg = false) => {
        if (key === "phoneNumber") {
            value = formatPhoneNumber(value);
        }
        if (isOrg)
            setOrgForm((prev) => ({
                ...prev,
                [key]: value,
            }));
        else
            setPersonalForm((prev) => ({
                ...prev,
                [key]: value,
            }));
        if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
    };

    const handleAccountChange = (key: string, value: string | boolean) => {
        setAccountForm((prev) => ({
            ...prev,
            [key]: value,
        }));
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
                first_name: data.type === "individual" ? (data.first_name || "") : "",
                last_name: data.type === "individual" ? (data.last_name || "") : "",
                phone_number: data.phone_number || "",
                email: data.email || "",
                contact_fullname: data.type === "organization" ? (data.contact_fullname || "") : "",
                company_name: data.type === "organization" ? (data.company_name || "") : "",
                country: "uk",
            };
            const setDomainCookie = (name: string, value: Record<string, unknown>, minutes = 10) => {
                const encoded = encodeURIComponent(JSON.stringify(value));
                document.cookie = `${name}=${encoded}; Path=/; Domain=.infrafund.test; Max-Age=${minutes * 60}; SameSite=Lax`;
                console.log(`Cookie set: ${name} (expires in ${minutes} min)`);
            };
            setDomainCookie("survey_data", payload, 15);
            setSubmitSuccess(true);
            onSuccess?.(data);
            // setTimeout(() => {
            //     window.location.href = "http://dash.infrafund.test:3001/login";
            // }, 800);
        } catch (err: unknown) {
            console.error("Client-side error:", err);
            const error = new Error("Failed to stored the data try again");
            onError?.(error);
            alert(`error:\n${error.message}`);
        } finally {
            setSubmitting(false);
        }
    };

    const resetFlow = () => {
        setCurrentStep(1);
        surveyDataRef.current = null;
        setSelectedAction("");
        setUserType(null);
        setConfirmations({
            ukResident: true,
            niNumber: true,
            over18: true,
        });
        setOrgConfirmations({
            ukBased: true,
            companyHouse: true,
            active: true,
        });
        setPersonalForm({
            firstName: "",
            lastName: "",
            phoneNumber: "",
        });
        setOrgForm({
            contactFullName: "",
            companyName: "",
            phoneNumber: "",
        });
        setAccountForm({
            email: "",
            termsAgreed: false,
        });
        setErrors({});
        setSubmitting(false);
        setSubmitSuccess(false);
        setShowUnder18Warning(false);
    };

    const renderStep1 = () => (
        <>
            <div className="w-full h-fit flex flex-col justify-center items-start gap-1">
                <span className="text-base text-white block">Let’s Get Started</span>
                <span className="text-2xl text-white font-semibold">
                    What do you want to do with InFraFund?
                </span>
            </div>
            <div className="space-y-4 w-full">
                {survey.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => handleActionSelect(item.roles[0])}
                        className={`w-full h-fit py-4 px-6 flex justify-start items-center gap-4 rounded-[12px] cursor-pointer transition-all duration-200 ${selectedItem === item.roles[0]
                            ? "bg-[#343C52] border border-[#777777] backdrop-blur-[70px]"
                            : "bg-[#131C2F]"
                            }`}
                    >
                        <Image src={item.icon} width={48} height={48} alt={item.name} />
                        <div className="flex flex-col gap-2 justify-center text-left">
                            <span className="text-lg text-white font-medium">{item.name}</span>
                            <span className="text-xs text-[#A3A3A3] font-normal">{item.name}</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="w-full h-fit flex justify-center items-center">
                <CustomButton
                    variant="filled"
                    className="w-full bg-gray-600 text-white rounded-md hover:bg-gray-500 transition-colors disabled:opacity-50"
                    disabled={!selectedAction}
                    onClick={() => selectedAction && setCurrentStep(2)}
                >
                    Continue
                </CustomButton>
            </div>
        </>
    );

    const renderStep2 = () => (
        <>
            <span className="text-2xl text-white font-semibold">
                Are you an Individual or Organization?
            </span>
            <div className="flex justify-between items-center w-full gap-5">
                <div
                    className={`rounded-lg p-4 w-[241px] flex flex-col items-center justify-center cursor-pointer hover:bg-gray-700 transition-colors md:p-6 ${userType === "individual"
                        ? "bg-[#343C52] border border-[#777777] backdrop-blur-[70px]"
                        : "bg-[#131C2F]"
                        }`}
                    onClick={() => handleTypeSelect("individual")}
                >
                    <Image src={Individual} width={64} height={64} alt="Individual" />
                    <span className="text-white font-medium text-center text-sm md:text-base">
                        Individual
                    </span>
                </div>
                <div
                    className={`rounded-lg p-4 w-[241px] flex flex-col items-center justify-center cursor-pointer hover:bg-gray-700 transition-colors md:p-6 ${userType === "organization"
                        ? "bg-[#343C52] border border-[#777777] backdrop-blur-[70px]"
                        : "bg-[#131C2F]"
                        }`}
                    onClick={() => handleTypeSelect("organization")}
                >
                    <Image src={organization} width={64} height={64} alt="organization" />
                    <span className="text-white font-medium text-center text-sm md:text-base">
                        Organization
                    </span>
                </div>
            </div>
            <CustomButton
                variant="filled"
                className="w-full bg-gray-600 text-white rounded-md hover:bg-gray-500 transition-colors disabled:opacity-50"
                disabled={!userType}
                onClick={() => userType && setCurrentStep(3)}
            >
                Continue
            </CustomButton>
        </>
    );

    const renderStep3 = () => (
        <div className="w-full space-y-4">
            <span className="text-2xl text-white font-semibold text-left block">
                First, please confirm the following.
            </span>
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
                                    <Check className="w-5 h-5 text-[#2B3146] peer-checked:text-black transition-colors duration-300" />
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
                                    <Check className="w-5 h-5 text-[#2B3146] peer-checked:text-black transition-colors duration-300" />
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
                                    <Check className="w-5 h-5 text-[#2B3146] peer-checked:text-black transition-colors duration-300" />
                                </div>
                            </div>
                            <span className="text-white font-mono">I am at least 18 years old</span>

                        </label>
                    </>
                ) : (
                    <>
                        <label className="flex items-center gap-4 bg-slate-700 rounded-2xl p-6 cursor-pointer hover:bg-slate-650 transition-colors group">
                            <div className="relative flex-shrink-0">
                                <input
                                    type="checkbox"
                                    className="peer sr-only"
                                    checked={orgConfirmations.ukBased}
                                    onChange={(e) => handleOrgConfirm("ukBased", e.target.checked)}
                                />
                                <div className="w-8 h-8 bg-[#2B3146] rounded-xl flex items-center justify-center transition-colors duration-300 peer-checked:bg-[#00FF87]">
                                    <Check className="w-5 h-5 text-[#2B3146] peer-checked:text-black transition-colors duration-300" />
                                </div>
                            </div>
                            <span className="text-white text-sm">Our company is based in UK.</span>
                        </label>
                        <label className="flex items-center gap-4 bg-slate-700 rounded-2xl p-6 cursor-pointer hover:bg-slate-650 transition-colors group">
                            <div className="relative flex-shrink-0">
                                <input
                                    type="checkbox"
                                    className="peer sr-only"
                                    checked={orgConfirmations.companyHouse}
                                    onChange={(e) => handleOrgConfirm("companyHouse", e.target.checked)}
                                />
                                <div className="w-8 h-8 bg-[#2B3146] rounded-xl flex items-center justify-center transition-colors duration-300 peer-checked:bg-[#00FF87]">
                                    <Check className="w-5 h-5 text-[#2B3146] peer-checked:text-black transition-colors duration-300" />
                                </div>
                            </div>
                            <span className="text-white text-sm">We have a valid UK company house number.</span>
                        </label>
                        <label className="flex items-center gap-4 bg-slate-700 rounded-2xl p-6 cursor-pointer hover:bg-slate-650 transition-colors group">
                            <div className="relative flex-shrink-0">
                                <input
                                    type="checkbox"
                                    className="peer sr-only"
                                    checked={orgConfirmations.active}
                                    onChange={(e) => handleOrgConfirm("active", e.target.checked)}
                                />
                                <div className="w-8 h-8 bg-[#2B3146] rounded-xl flex items-center justify-center transition-colors duration-300 peer-checked:bg-[#00FF87]">
                                    <Check className="w-5 h-5 text-[#2B3146] peer-checked:text-black transition-colors duration-300" />
                                </div>
                            </div>
                            <span className="text-white text-sm">Our company is currently active.</span>
                        </label>
                    </>
                )}
            </div>
            {showUnder18Warning && (
                <p className="text-red-300 text-sm text-left">
                    We do not provide services to individuals under 18 years old.
                </p>
            )}
            <CustomButton
                variant="filled"
                className="w-full py-3 bg-green-600 text-white rounded-md hover:bg-green-500 transition-colors md:w-full md:px-8"
                onClick={handleConfirmContinue}
                disabled={
                    userType === "individual"
                        ? !(confirmations.ukResident && confirmations.niNumber && confirmations.over18)
                        : !(orgConfirmations.ukBased && orgConfirmations.companyHouse)
                }
            >
                Continue
            </CustomButton>
        </div>
    );

    const renderStep4 = () => (
        <div className="flex flex-col gap-12 justify-center items-start">
            <span className="text-2xl text-white font-semibold block">Contact Form</span>
            <div className="flex flex-col gap-6 text-left">
                <p className="text-white text-sm">
                    Unfortunately, at this point in time, we cannot accept investments from people who
                    are not UK residents or don&apos;t have a valid UK national insurance number.
                </p>
                <p className="text-white text-sm">
                    If you would like to be notified when we are able to accept investments from your
                    country, complete the form below.
                </p>
            </div>
            <div className="w-full text-left flex flex-col gap-3">
                <FormInput label="First Name" placeholder="First Name" type="text" />
                <FormInput label="Last Name" placeholder="Last Name" type="text" />
                <FormInput label="Country" placeholder="Country" />
                <FormInput label="Email" placeholder="Email" type="text" />
            </div>
            <div className="w-full h-fit flex justify-center items-center">
                <button
                    className="w-full py-3 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition-colors md:w-auto md:px-8"
                    onClick={resetFlow}
                >
                    Back to Start
                </button>
            </div>
        </div>
    );

    const renderStep5 = () => (
        <div className="w-full text-left">
            <span className="text-2xl text-white font-semibold mb-6 block">
                Great! Let&apos;s get started.
            </span>
            <div className="space-y-4 mb-8">
                {userType === "individual" ? (
                    <>
                        <div className="w-full">
                            <FormInput
                                label="First Name"
                                placeholder="First Name"
                                type="text"
                                value={personalForm.firstName}
                                onChange={(e) => handlePersonalChange("firstName", e.target.value)}
                            />
                        </div>
                        <div className="w-full">
                            <FormInput
                                label="Last Name"
                                placeholder="Last Name"
                                type="text"
                                value={personalForm.lastName}
                                onChange={(e) => handlePersonalChange("lastName", e.target.value)}
                            />
                        </div>
                        <div className="w-full">
                            <FormInput
                                label="Phone Number"
                                placeholder="+44 (XXX) XXX-XXXX"
                                type="tel"
                                value={personalForm.phoneNumber}
                                onChange={(e) => handlePersonalChange("phoneNumber", e.target.value)}
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <div className="w-full">
                            <FormInput
                                label="Contact Full Name"
                                placeholder="Contact Full Name"
                                type="text"
                                value={orgForm.contactFullName}
                                onChange={(e) => handlePersonalChange("contactFullName", e.target.value, true)}
                            />
                        </div>
                        <div className="w-full">
                            <FormInput
                                label="Company Name"
                                placeholder="Company Name"
                                type="text"
                                value={orgForm.companyName}
                                onChange={(e) => handlePersonalChange("companyName", e.target.value, true)}
                            />
                        </div>
                        <div className="w-full">
                            <FormInput
                                label="Phone Number"
                                placeholder="+44 (XXX) XXX-XXXX"
                                type="tel"
                                value={orgForm.phoneNumber}
                                onChange={(e) => handlePersonalChange("phoneNumber", e.target.value, true)}
                            />
                        </div>
                    </>
                )}
            </div>
            <div className="flex space-x-2">
                <button
                    className="flex-1 py-3 bg-gray-600 text-white rounded-md hover:text-primary transition-colors cursor-pointer"
                    onClick={() => setCurrentStep(3)}
                >
                    Back
                </button>
                <CustomButton
                    onClick={() => setCurrentStep(6)}
                    variant="filled"
                    className="w-full py-3 bg-green-600 text-white rounded-md hover:bg-green-500 transition-colors md:flex-1"
                >
                    Continue
                </CustomButton>
            </div>
        </div>
    );

    const renderStep6 = () => (
        <div className="w-full text-left">
            <span className="text-2xl text-white font-semibold mb-6 block">
                Let&apos;s create your account!
            </span>
            <div className="space-y-4 mb-8">
                <div className="w-full">
                    <FormInput
                        label="Email"
                        placeholder="Email"
                        type="text"
                        value={accountForm.email}
                        onChange={(e) => handleAccountChange("email", e.target.value)}
                    />
                </div>
                <label className="flex items-center space-x-3 cursor-pointer">
                    <div className="relative flex-shrink-0">
                        <input
                            type="checkbox"
                            className="peer sr-only"
                            checked={accountForm.termsAgreed}
                            onChange={(e) => handleAccountChange("termsAgreed", e.target.checked)}
                        />
                        <div className="w-8 h-8 bg-[#2B3146] rounded-xl flex items-center justify-center transition-colors duration-300 peer-checked:bg-[#00FF87]">
                            <Check className="w-3 h-3 text-[#2B3146] peer-checked:text-black transition-colors duration-300" />
                        </div>
                    </div>
                    <span className="text-white text-sm">
                        By creating an account, I agree to InFraFund&apos;s{" "}
                        <Link href="/terms" className="text-green-400 hover:text-primary">
                            Terms of Service and Privacy Notice
                        </Link>
                        .
                    </span>
                </label>
            </div>
            <div className="flex space-x-2">
                <button
                    className="flex-1 py-3 bg-gray-600 text-white rounded-md hover:text-primary transition-colors cursor-pointer"
                    onClick={() => setCurrentStep(5)}
                >
                    Back
                </button>
                <CustomButton
                    onClick={handleSubmitSurvey}
                    disabled={!accountForm.email || !accountForm.termsAgreed || submitting}
                    variant="filled"
                    className="w-full py-3 bg-green-600 text-white rounded-md hover:bg-green-500 transition-colors md:flex-1"
                >
                    {submitting
                        ? "Submitting..."
                        : submitSuccess
                            ? "Go to Dashboard"
                            : "Submit Survey"}
                </CustomButton>
            </div>
            {submitSuccess && (
                <div className="mt-4 p-3 bg-green-900/30 border border-green-500 rounded text-center text-green-300 text-sm">
                    Survey submitted successfully. Thank you! <br />
                    You will be moved to your personal dashboard shortly.
                </div>
            )}
        </div>
    );

    return (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} showCloseButton={false}>
            <div className="w-full h-full flex flex-col justify-center items-center gap-8">
                {currentStep !== 4 && <Image priority src={infafund} alt="infrafund" width={172} height={42} />}
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