'use client'

import React, { useState } from 'react'
import { Modal } from './ui/modal'
import fund from "@/../public/svg/Raise-Fund.svg"
import contract from "@/../public/svg/Contract.svg"
import audit from "@/../public/svg/Audit.svg"
import invest from "@/../public/svg/Invest-flow.svg"
import infafund from "@/../public/svg/infrafund.svg"
import Image from 'next/image'
import { z } from 'zod'

const individualSchema = z.object({
  ukResident: z.literal(true),
  niNumber: z.literal(true),
  over18: z.literal(true),
})

const orgSchema = z.object({
  ukBased: z.literal(true),
  companyHouse: z.literal(true),
  active: z.literal(true),
})

const contactSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  country: z.string().min(1, 'Country is required'),
  email: z.string().email('Invalid email address'),
})

const individualPersonalSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits'),
})

const orgPersonalSchema = z.object({
  contactFullName: z.string().min(1, 'Contact full name is required'),
  companyName: z.string().min(1, 'Company name is required'),
  phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits'),
})

const accountSchema = z.object({
  email: z.string().email('Invalid email address'),
  termsAgreed: z.literal(true),
})

export default function Survey() {
    const [currentStep, setCurrentStep] = useState(1)
    const [selectedAction, setSelectedAction] = useState('')
    const [userType, setUserType] = useState('')
    const [confirmations, setConfirmations] = useState({
        ukResident: false,
        niNumber: false,
        over18: false,
    })
    const [orgConfirmations, setOrgConfirmations] = useState({
        ukBased: false,
        companyHouse: false,
        active: false,
    })
    const [contactForm, setContactForm] = useState({
        firstName: '',
        lastName: '',
        country: '',
        email: '',
    })
    const [personalForm, setPersonalForm] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
    })
    const [orgForm, setOrgForm] = useState({
        contactFullName: '',
        companyName: '',
        phoneNumber: '',
    })
    const [accountForm, setAccountForm] = useState({
        email: '',
        termsAgreed: false,
    })
    const [errors, setErrors] = useState({})
    const [isEligible, setIsEligible] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)

    const survey = [
        {
            roles: "Raise Fund",
            name: "Raise Fund",
            icon: fund,
            flex: 'sm:flex-[2]'
        },
        {
            roles: "Contract",
            name: "Contract",
            icon: contract,
            flex: 'sm:flex-[1]'
        },
        {
            roles: "Audit",
            name: "Audit",
            icon: audit,
            flex: 'sm:flex-[1]'
        },
        {
            roles: "Invest",
            name: "Invest",
            icon: invest,
            flex: 'sm:flex-[2]'
        },
    ]

    const handleActionSelect = (action: string) => {
        setSelectedAction(action)
        setCurrentStep(2)
    }

    const handleTypeSelect = (type: 'individual' | 'organization') => {
        setUserType(type)
        setCurrentStep(3)
    }

    const handleIndividualConfirm = (key: keyof typeof confirmations, checked: boolean) => {
        setConfirmations(prev => ({ ...prev, [key]: checked }))
    }

    const handleOrgConfirm = (key: keyof typeof orgConfirmations, checked: boolean) => {
        setOrgConfirmations(prev => ({ ...prev, [key]: checked }))
    }

    const handleConfirmContinue = () => {
        setErrors({})
        let schema, confirmationsData
        if (userType === 'individual') {
            schema = individualSchema
            confirmationsData = confirmations
        } else {
            schema = orgSchema
            confirmationsData = orgConfirmations
        }

        const result = schema.safeParse(confirmationsData)
        if (!result.success) {
            const fieldErrors: any = {}
            result.error.errors.forEach((err) => {
                fieldErrors[err.path[0]] = err.message
            })
            setErrors(fieldErrors)
            return
        }

        // Check eligibility for UK-related
        let eligible = true
        if (userType === 'individual') {
            if (!confirmations.ukResident || !confirmations.niNumber) {
                eligible = false
            }
        } else {
            if (!orgConfirmations.ukBased || !orgConfirmations.companyHouse) {
                eligible = false
            }
        }

        setIsEligible(eligible)
        if (!eligible) {
            setCurrentStep(4)
        } else {
            // Proceed to personal details
            setCurrentStep(5)
        }
    }

    const handleContactSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setErrors({})
        const result = contactSchema.safeParse(contactForm)
        if (!result.success) {
            const fieldErrors: any = {}
            result.error.errors.forEach((err) => {
                fieldErrors[err.path[0]] = err.message
            })
            setErrors(fieldErrors)
            return
        }
        // Submit logic
        console.log('Contact form submitted:', contactForm)
        setShowSuccess(true)
    }

    const handleContactChange = (key: string, value: string) => {
        setContactForm(prev => ({ ...prev, [key]: value }))
        if (errors[key]) {
            setErrors(prev => ({ ...prev, [key]: '' }))
        }
    }

    const handlePersonalSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setErrors({})
        let schema, formData
        if (userType === 'individual') {
            schema = individualPersonalSchema
            formData = personalForm
        } else {
            schema = orgPersonalSchema
            formData = orgForm
        }

        const result = schema.safeParse(formData)
        if (!result.success) {
            const fieldErrors: any = {}
            result.error.errors.forEach((err) => {
                fieldErrors[err.path[0]] = err.message
            })
            setErrors(fieldErrors)
            return
        }
        // Proceed to account creation
        setCurrentStep(6)
    }

    const handlePersonalChange = (key: string, value: string, isOrg = false) => {
        if (isOrg) {
            setOrgForm(prev => ({ ...prev, [key]: value }))
        } else {
            setPersonalForm(prev => ({ ...prev, [key]: value }))
        }
        if (errors[key]) {
            setErrors(prev => ({ ...prev, [key]: '' }))
        }
    }

    const handleAccountChange = (key: string, value: string | boolean) => {
        setAccountForm(prev => ({ ...prev, [key]: value }))
        if (errors[key]) {
            setErrors(prev => ({ ...prev, [key]: '' }))
        }
    }

    const handleAccountSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setErrors({})
        const result = accountSchema.safeParse(accountForm)
        if (!result.success) {
            const fieldErrors: any = {}
            result.error.errors.forEach((err) => {
                fieldErrors[err.path[0]] = err.message
            })
            setErrors(fieldErrors)
            return
        }

        // Generate detailed JSON matching the specified structure
        const userData: any = {
            role: selectedAction,
            type: userType,
            confirm_tos: accountForm.termsAgreed,
            first_name: '',
            last_name: '',
            phone_number: '',
            email: accountForm.email,
            contact_fullname: '',
            company_name: '',
        }

        if (userType === 'individual') {
            userData.first_name = personalForm.firstName;
            userData.last_name = personalForm.lastName;
            userData.phone_number = personalForm.phoneNumber;
        } else {
            userData.contact_fullname = orgForm.contactFullName;
            userData.company_name = orgForm.companyName;
            userData.phone_number = orgForm.phoneNumber;
        }

        console.log('User Data JSON:', JSON.stringify(userData, null, 2))
        setShowSuccess(true)
        setCurrentStep(7)
    }

    const renderStep1 = () => (
        <>
            <Image priority={true} src={infafund} alt="infafund" width={172} height={42} className='mb-4' />
            <span className='text-base text-white block mb-2'>Let’s Get Started</span>
            <span className='text-2xl text-white font-semibold'>What do you want to do with InFraFund?</span>
            <div className='space-y-4 mb-8 md:space-y-6'>
                {/* Top row: Raise Fund & Contract */}
                <div className='flex flex-col sm:flex-row gap-4 md:gap-6 items-stretch'>
                    <div 
                        className={`bg-gray-800 rounded-lg p-4 border border-green-500 flex flex-col items-center cursor-pointer hover:bg-gray-700 transition-colors md:p-6 flex-1 ${survey[0].flex}`}
                        onClick={() => handleActionSelect(survey[0].name)}
                    >
                        <Image src={survey[0].icon} alt={survey[0].name} width={48} height={48} className='mb-2 md:mb-3' />
                        <span className='text-white font-medium text-center text-sm md:text-base'>{survey[0].name}</span>
                    </div>
                    <div 
                        className={`bg-gray-800 rounded-lg p-4 border border-green-500 flex flex-col items-center cursor-pointer hover:bg-gray-700 transition-colors md:p-6 flex-1 ${survey[1].flex}`}
                        onClick={() => handleActionSelect(survey[1].name)}
                    >
                        <Image src={survey[1].icon} alt={survey[1].name} width={48} height={48} className='mb-2 md:mb-3' />
                        <span className='text-white font-medium text-center text-sm md:text-base'>{survey[1].name}</span>
                    </div>
                </div>
                {/* Bottom row: Audit & Invest */}
                <div className='flex flex-col sm:flex-row gap-4 md:gap-6 items-stretch'>
                    <div 
                        className={`bg-gray-800 rounded-lg p-4 border border-green-500 flex flex-col items-center cursor-pointer hover:bg-gray-700 transition-colors md:p-6 flex-1 ${survey[2].flex}`}
                        onClick={() => handleActionSelect(survey[2].name)}
                    >
                        <Image src={survey[2].icon} alt={survey[2].name} width={48} height={48} className='mb-2 md:mb-3' />
                        <span className='text-white font-medium text-center text-sm md:text-base'>{survey[2].name}</span>
                    </div>
                    <div 
                        className={`bg-gray-800 rounded-lg p-4 border border-green-500 flex flex-col items-center cursor-pointer hover:bg-gray-700 transition-colors md:p-6 flex-1 ${survey[3].flex}`}
                        onClick={() => handleActionSelect(survey[3].name)}
                    >
                        <Image src={survey[3].icon} alt={survey[3].name} width={48} height={48} className='mb-2 md:mb-3' />
                        <span className='text-white font-medium text-center text-sm md:text-base'>{survey[3].name}</span>
                    </div>
                </div>
            </div>
            <button 
                className='w-full py-3 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition-colors disabled:opacity-50 md:w-auto md:px-8'
                disabled={!selectedAction}
                onClick={() => selectedAction && setCurrentStep(2)}
            >
                Continue
            </button>
        </>
    )

    const renderStep2 = () => (
        <>
            <Image priority={true} src={infafund} alt="infafund" width={172} height={42} className='mb-4' />
            <span className='text-base text-white block mb-2'>Selected: {selectedAction}</span>
            <span className='text-2xl text-white font-semibold'>Are you an Individual or Organization?</span>
            <div className='grid grid-cols-1 gap-4 mb-8 md:gap-6'>
                <div 
                    className='bg-gray-800 rounded-lg p-4 border border-green-500 flex flex-col items-center cursor-pointer hover:bg-gray-700 transition-colors md:p-6'
                    onClick={() => handleTypeSelect('individual')}
                >
                    <span className='text-white font-medium text-center text-sm md:text-base'>Individual</span>
                </div>
                <div 
                    className='bg-gray-800 rounded-lg p-4 border border-green-500 flex flex-col items-center cursor-pointer hover:bg-gray-700 transition-colors md:p-6'
                    onClick={() => handleTypeSelect('organization')}
                >
                    <span className='text-white font-medium text-center text-sm md:text-base'>Organization</span>
                </div>
            </div>
            <button 
                className='w-full py-3 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition-colors disabled:opacity-50 md:w-auto md:px-8'
                disabled={!userType}
                onClick={() => userType && setCurrentStep(3)}
            >
                Continue
            </button>
        </>
    )

    const renderStep3 = () => (
        <>
            <Image priority={true} src={infafund} alt="infafund" width={172} height={42} className='mb-4' />
            <span className='text-2xl text-white font-semibold mb-6 block'>First, please confirm the following.</span>
            <div className='space-y-4 mb-8'>
                {userType === 'individual' ? (
                    <>
                        <label className='flex items-center space-x-3 cursor-pointer'>
                            <input
                                type='checkbox'
                                className='w-5 h-5 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500'
                                checked={confirmations.ukResident}
                                onChange={(e) => handleIndividualConfirm('ukResident', e.target.checked)}
                            />
                            <span className='text-white text-sm'>I am currently a UK resident</span>
                        </label>
                        {errors.ukResident && <span className='text-red-500 text-xs ml-8'>{errors.ukResident}</span>}
                        
                        <label className='flex items-center space-x-3 cursor-pointer'>
                            <input
                                type='checkbox'
                                className='w-5 h-5 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500'
                                checked={confirmations.niNumber}
                                onChange={(e) => handleIndividualConfirm('niNumber', e.target.checked)}
                            />
                            <span className='text-white text-sm'>I have a valid UK national insurance number</span>
                        </label>
                        {errors.niNumber && <span className='text-red-500 text-xs ml-8'>{errors.niNumber}</span>}
                        
                        <label className='flex items-center space-x-3 cursor-pointer'>
                            <input
                                type='checkbox'
                                className='w-5 h-5 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500'
                                checked={confirmations.over18}
                                onChange={(e) => handleIndividualConfirm('over18', e.target.checked)}
                            />
                            <span className='text-white text-sm'>I am at least 18 years old</span>
                        </label>
                        {errors.over18 && <span className='text-red-500 text-xs ml-8'>{errors.over18}</span>}
                    </>
                ) : (
                    <>
                        <label className='flex items-center space-x-3 cursor-pointer'>
                            <input
                                type='checkbox'
                                className='w-5 h-5 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500'
                                checked={orgConfirmations.ukBased}
                                onChange={(e) => handleOrgConfirm('ukBased', e.target.checked)}
                            />
                            <span className='text-white text-sm'>Our company is based in UK.</span>
                        </label>
                        {errors.ukBased && <span className='text-red-500 text-xs ml-8'>{errors.ukBased}</span>}
                        
                        <label className='flex items-center space-x-3 cursor-pointer'>
                            <input
                                type='checkbox'
                                className='w-5 h-5 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500'
                                checked={orgConfirmations.companyHouse}
                                onChange={(e) => handleOrgConfirm('companyHouse', e.target.checked)}
                            />
                            <span className='text-white text-sm'>We have a valid UK company house number.</span>
                        </label>
                        {errors.companyHouse && <span className='text-red-500 text-xs ml-8'>{errors.companyHouse}</span>}
                        
                        <label className='flex items-center space-x-3 cursor-pointer'>
                            <input
                                type='checkbox'
                                className='w-5 h-5 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500'
                                checked={orgConfirmations.active}
                                onChange={(e) => handleOrgConfirm('active', e.target.checked)}
                            />
                            <span className='text-white text-sm'>Our company is currently active.</span>
                        </label>
                        {errors.active && <span className='text-red-500 text-xs ml-8'>{errors.active}</span>}
                    </>
                )}
            </div>
            <button 
                className='w-full py-3 bg-green-600 text-white rounded-md hover:bg-green-500 transition-colors md:w-auto md:px-8'
                onClick={handleConfirmContinue}
            >
                Continue
            </button>
        </>
    )

    const renderStep4 = () => (
        <>
            <div className='flex justify-between items-center mb-6'>
                <Image priority={true} src={infafund} alt="infafund" width={172} height={42} />
                <button onClick={() => setCurrentStep(1)} className='text-white text-xl'>×</button>
            </div>
            <span className='text-2xl text-white font-semibold mb-6 block'>Contact Form</span>
            <p className='text-white text-sm mb-6'>
                Unfortunately at this point in time, we cannot accept investments from people who are not UK residents or don&apos;t have a valid UK national insurance number.
            </p>
            <p className='text-white text-sm mb-6'>
                If you would like to be notified when we are able to accept investments from your country, complete the form below.
            </p>
            {!showSuccess ? (
                <form onSubmit={handleContactSubmit} className='space-y-4 mb-8'>
                    <div>
                        <label className='block text-white text-sm mb-1'>First Name</label>
                        <input
                            type='text'
                            value={contactForm.firstName}
                            onChange={(e) => handleContactChange('firstName', e.target.value)}
                            className='w-full p-3 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:border-green-500'
                            placeholder='First Name'
                        />
                        {errors.firstName && <span className='text-red-500 text-xs'>{errors.firstName}</span>}
                    </div>
                    <div>
                        <label className='block text-white text-sm mb-1'>Last Name</label>
                        <input
                            type='text'
                            value={contactForm.lastName}
                            onChange={(e) => handleContactChange('lastName', e.target.value)}
                            className='w-full p-3 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:border-green-500'
                            placeholder='Last Name'
                        />
                        {errors.lastName && <span className='text-red-500 text-xs'>{errors.lastName}</span>}
                    </div>
                    <div>
                        <label className='block text-white text-sm mb-1'>Country</label>
                        <select
                            value={contactForm.country}
                            onChange={(e) => handleContactChange('country', e.target.value)}
                            className='w-full p-3 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:border-green-500'
                        >
                            <option value=''>Country</option>
                            <option value='US'>United States</option>
                            <option value='CA'>Canada</option>
                            <option value='DE'>Germany</option>
                            <option value='FR'>France</option>
                            {/* Add more as needed */}
                        </select>
                        {errors.country && <span className='text-red-500 text-xs'>{errors.country}</span>}
                    </div>
                    <div>
                        <label className='block text-white text-sm mb-1'>Email</label>
                        <input
                            type='email'
                            value={contactForm.email}
                            onChange={(e) => handleContactChange('email', e.target.value)}
                            className='w-full p-3 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:border-green-500'
                            placeholder='Email'
                        />
                        {errors.email && <span className='text-red-500 text-xs'>{errors.email}</span>}
                    </div>
                    <button 
                        type='submit'
                        className='w-full py-3 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition-colors md:w-auto md:px-8'
                    >
                        Submit
                    </button>
                </form>
            ) : (
                <div className='text-center'>
                    <span className='text-white text-lg'>Thank you! We&apos;ll notify you when ready.</span>
                    <button 
                        className='w-full py-3 bg-green-600 text-white rounded-md hover:bg-green-500 transition-colors mt-4 md:w-auto md:px-8'
                        onClick={() => setCurrentStep(1)}
                    >
                        Back to Start
                    </button>
                </div>
            )}
        </>
    )

    const renderStep5 = () => (
        <>
            <Image priority={true} src={infafund} alt="infafund" width={172} height={42} className='mb-4' />
            <span className='text-2xl text-white font-semibold mb-6 block'>Great! Let&apos;s get started.</span>
            <form onSubmit={handlePersonalSubmit} className='space-y-4 mb-8'>
                {userType === 'individual' ? (
                    <>
                        <div>
                            <label className='block text-white text-sm mb-1'>First Name</label>
                            <input
                                type='text'
                                value={personalForm.firstName}
                                onChange={(e) => handlePersonalChange('firstName', e.target.value)}
                                className='w-full p-3 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:border-green-500'
                                placeholder='First Name'
                            />
                            {errors.firstName && <span className='text-red-500 text-xs'>{errors.firstName}</span>}
                        </div>
                        <div>
                            <label className='block text-white text-sm mb-1'>Last Name</label>
                            <input
                                type='text'
                                value={personalForm.lastName}
                                onChange={(e) => handlePersonalChange('lastName', e.target.value)}
                                className='w-full p-3 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:border-green-500'
                                placeholder='Last Name'
                            />
                            {errors.lastName && <span className='text-red-500 text-xs'>{errors.lastName}</span>}
                        </div>
                        <div>
                            <label className='block text-white text-sm mb-1'>Phone Number</label>
                            <input
                                type='tel'
                                value={personalForm.phoneNumber}
                                onChange={(e) => handlePersonalChange('phoneNumber', e.target.value)}
                                className='w-full p-3 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:border-green-500'
                                placeholder='Phone Number'
                            />
                            {errors.phoneNumber && <span className='text-red-500 text-xs'>{errors.phoneNumber}</span>}
                        </div>
                    </>
                ) : (
                    <>
                        <div>
                            <label className='block text-white text-sm mb-1'>Contact Full Name</label>
                            <input
                                type='text'
                                value={orgForm.contactFullName}
                                onChange={(e) => handlePersonalChange('contactFullName', e.target.value, true)}
                                className='w-full p-3 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:border-green-500'
                                placeholder='Contact Full Name'
                            />
                            {errors.contactFullName && <span className='text-red-500 text-xs'>{errors.contactFullName}</span>}
                        </div>
                        <div>
                            <label className='block text-white text-sm mb-1'>Company Name</label>
                            <input
                                type='text'
                                value={orgForm.companyName}
                                onChange={(e) => handlePersonalChange('companyName', e.target.value, true)}
                                className='w-full p-3 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:border-green-500'
                                placeholder='Company Name'
                            />
                            {errors.companyName && <span className='text-red-500 text-xs'>{errors.companyName}</span>}
                        </div>
                        <div>
                            <label className='block text-white text-sm mb-1'>Phone Number</label>
                            <input
                                type='tel'
                                value={orgForm.phoneNumber}
                                onChange={(e) => handlePersonalChange('phoneNumber', e.target.value, true)}
                                className='w-full p-3 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:border-green-500'
                                placeholder='Phone Number'
                            />
                            {errors.phoneNumber && <span className='text-red-500 text-xs'>{errors.phoneNumber}</span>}
                        </div>
                    </>
                )}
                <button 
                    type='submit'
                    className='w-full py-3 bg-green-600 text-white rounded-md hover:bg-green-500 transition-colors md:w-auto md:px-8'
                >
                    Continue
                </button>
            </form>
        </>
    )

    const renderStep6 = () => (
        <>
            <Image priority={true} src={infafund} alt="infafund" width={172} height={42} className='mb-4' />
            <span className='text-2xl text-white font-semibold mb-6 block'>Let&apos;s create your account!</span>
            <form onSubmit={handleAccountSubmit} className='space-y-4 mb-8'>
                <div>
                    <label className='block text-white text-sm mb-1'>Email</label>
                    <input
                        type='email'
                        value={accountForm.email}
                        onChange={(e) => handleAccountChange('email', e.target.value)}
                        className='w-full p-3 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:border-green-500'
                        placeholder='Email'
                    />
                    {errors.email && <span className='text-red-500 text-xs'>{errors.email}</span>}
                </div>
                <label className='flex items-center space-x-3 cursor-pointer'>
                    <input
                        type='checkbox'
                        className='w-5 h-5 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500'
                        checked={accountForm.termsAgreed}
                        onChange={(e) => handleAccountChange('termsAgreed', e.target.checked)}
                    />
                    <span className='text-white text-sm'>By creating an account, I agree to InFraFund&apos;s <span className='text-green-400'>Terms of Service and Privacy Notice</span>.</span>
                </label>
                {errors.termsAgreed && <span className='text-red-500 text-xs ml-8'>{errors.termsAgreed}</span>}
                <div className='flex space-x-2'>
                    <button 
                        type='button'
                        className='flex-1 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition-colors'
                        onClick={() => setCurrentStep(5)}
                    >
                        Back
                    </button>
                    <button 
                        type='submit'
                        className='flex-1 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-400 transition-colors disabled:opacity-50'
                        disabled={!accountForm.email || !accountForm.termsAgreed}
                    >
                        Continue
                    </button>
                </div>
            </form>
        </>
    )

    const renderStep7 = () => (
        <>
            <Image priority={true} src={infafund} alt="infafund" width={172} height={42} className='mb-4' />
            <span className='text-2xl text-white font-semibold'>Account Created Successfully!</span>
            <p className='text-white text-sm mt-4 mb-8'>Your account has been created. Welcome to InFraFund!</p>
            <button 
                className='w-full py-3 bg-green-600 text-white rounded-md hover:bg-green-500 transition-colors md:w-auto md:px-8'
                onClick={() => {
                    // Reset form
                    setCurrentStep(1)
                    setShowSuccess(false)
                    // Additional reset logic if needed
                }}
            >
                Finish
            </button>
        </>
    )

    return (
        <Modal isOpen={true} onClose={() => console.log('Modal closed')} className='w-full h-full px-4 py-8 bg-gray-900 sm:px-6 sm:py-12 md:w-auto md:max-w-lg md:mx-auto md:my-auto md:p-8 md:h-auto md:rounded-lg md:shadow-xl'>
            <div className='flex flex-col h-full justify-between md:h-auto'>
                {currentStep === 1 && renderStep1()}
                {currentStep === 2 && renderStep2()}
                {currentStep === 3 && renderStep3()}
                {currentStep === 4 && renderStep4()}
                {currentStep === 5 && renderStep5()}
                {currentStep === 6 && renderStep6()}
                {currentStep === 7 && renderStep7()}
            </div>
        </Modal>
    )
}