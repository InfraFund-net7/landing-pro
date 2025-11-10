'use client';

import React, { useState } from 'react';
import { FormInput } from '../ui/form-input';
import Link from 'next/link';

interface EmailSendProps {
    onBack?: () => void;
}

export default function EmailSend({ onBack }: EmailSendProps) {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        message: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {

            await new Promise(resolve => setTimeout(resolve, 1500));

            setSubmitStatus('success');
            setFormData({ firstName: '', lastName: '', email: '', message: '' });

        } catch (error) {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const datas = [
        { title: "First Name", isTextarea: false, name: "firstName" },
        { title: "Last Name", isTextarea: false, name: "lastName" },
        { title: "Email", isTextarea: false, name: "email" },
        { title: "Message", isTextarea: true, name: "message" },
    ];

    return (
        <div className="flex flex-col gap-6 w-full ">
            <p className="text-white text-base leading-6">
                Fill out the form below and we&apos;ll get back to you within 24 hours. You can also visit our{' '}
                <Link href="/faq" className="text-primary font-bold underline hover:text-blue-400 transition-colors" target="_blank" rel="noopener noreferrer">
                    FAQs page
                </Link>{' '}
                for immediate answers.
            </p>

            <div className='flex flex-col gap-4 w-full text-left'>
                {datas.map((item, index) => (
                    <FormInput
                        key={index}
                        label={item.title}
                        placeholder={item.title}
                        isTextarea={item.isTextarea}
                    />
                ))}
            </div>

            {submitStatus === 'success' && (
                <div className="text-green-400 text-sm font-medium p-2 bg-green-900/20 rounded-md">
                    ✅ Your message has been sent successfully!
                </div>
            )}

            {submitStatus === 'error' && (
                <div className="text-red-400 text-sm font-medium p-2 bg-red-900/20 rounded-md">
                    ❌ Something went wrong. Please try again later.
                </div>
            )}

            <div className='w-full flex flex-col sm:flex-row justify-center items-center gap-3 pt-4'>
                <button
                    type="button"
                    onClick={onBack}
                    disabled={isSubmitting}
                    className='w-full sm:w-full cursor-pointer h-12 flex justify-center items-center text-white  hover:text-primary rounded-md transition-colors disabled:opacity-70 disabled:cursor-not-allowed'
                >
                    Back
                </button>

                <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className='w-full sm:w-full cursor-pointer h-12 flex justify-center items-center text-black bg-gray-300  rounded-md transition-colors disabled:opacity-70 disabled:cursor-not-allowed'
                >
                    {isSubmitting ? (
                        <span className="animate-spin inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full"></span>
                    ) : (
                        'Send'
                    )}
                </button>
            </div>
        </div>
    );
}