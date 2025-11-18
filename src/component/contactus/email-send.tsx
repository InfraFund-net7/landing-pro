'use client';

import React, { useState } from 'react';
import { FormInput } from '../ui/form-input';
import Link from 'next/link';
import apiService from '@/services/apiService';
import { CustomButton } from '../ui/custom-button';

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
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [messageText, setMessageText] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { firstName, lastName, email, message } = formData;
        if (!firstName.trim() || !lastName.trim() || !email.trim() || !message.trim()) {
            setStatus('error');
            setMessageText('All fields are required.');
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setStatus('error');
            setMessageText('Please enter a valid email address.');
            return;
        }

        setStatus('loading');
        setMessageText('');

        try {
            const payload = {
                first_name: firstName.trim(),
                last_name: lastName.trim(),
                email: email.trim().toLowerCase(),
                message: message.trim(),
            };

            const data = await apiService.post<{ success: boolean; message?: string }>('/contact', payload);

            setStatus('success');
            setMessageText(data.message || 'Your message has been sent successfully!');
            setFormData({ firstName: '', lastName: '', email: '', message: '' });

        } catch (error: unknown) {
            setStatus('error');
            let msg = 'Failed to send message. Please try again.';
            if (
                typeof error === 'object' &&
                error !== null &&
                'response' in error &&
                typeof (error as Record<string, unknown>).response === 'object'
            ) {
                const err = error as {
                    response?: { data?: { message?: string; detail?: string } };
                    message?: string;
                };

                msg =
                    err.response?.data?.message ||
                    err.response?.data?.detail ||
                    err.message ||
                    msg;
            } else if (error instanceof Error) {
                msg = error.message;
            }

            setMessageText(msg);
            console.error('[Contact Form Error]', error);
        }
    };

    const formFields = [
        { title: "First Name", isTextarea: false, name: "firstName", type: "text" },
        { title: "Last Name", isTextarea: false, name: "lastName", type: "text" },
        { title: "Email", isTextarea: false, name: "email", type: "email" },
        { title: "Message", isTextarea: true, name: "message" },
    ];

    return (
        <div className="flex flex-col gap-6 w-full">
            <p className="text-white text-base leading-6">
                Fill out the form below and we&apos;ll get back to you within 24 hours. You can also visit our{' '}
                <Link
                    href="/faq"
                    className="text-primary font-bold underline hover:text-blue-400 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    FAQs page
                </Link>{' '}
                for immediate answers.
            </p>

            <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-full text-left'>
                {formFields.map((item) => (
                    <FormInput
                        key={item.name}
                        label={item.title}
                        placeholder={item.title}
                        isTextarea={item.isTextarea}
                        type={item.type}
                        name={item.name}
                        value={formData[item.name as keyof typeof formData]}
                        onChange={handleChange}
                    />
                ))}

                {status === 'success' && (
                    <div className="text-green-400 text-sm font-medium p-3 bg-green-900/20 rounded-md border border-green-700/30">
                        {messageText}
                    </div>
                )}

                {status === 'error' && (
                    <div className="text-red-400 text-sm font-medium p-3 bg-red-900/20 rounded-md border border-red-700/30">
                        {messageText}
                    </div>
                )}

                <div className='w-full flex flex-col sm:flex-row justify-center items-center gap-3 pt-4'>
                    <button
                        type="button"
                        onClick={onBack}
                        disabled={status === 'loading'}
                        className='w-full sm:w-1/2 cursor-pointer h-12 flex justify-center items-center text-white bg-gray-800 hover:bg-gray-700 rounded-md transition-colors disabled:opacity-70 disabled:cursor-not-allowed'
                    >
                        Back
                    </button>

                    <CustomButton
                        variant='filled'
                        type="submit"
                        disabled={status === 'loading'}
                        className='w-full sm:w-1/2 cursor-pointer h-12 flex justify-center items-center text-black bg-gray-300 hover:bg-gray-400 rounded-md transition-colors disabled:opacity-70 disabled:cursor-not-allowed font-medium'
                    >
                        {status === 'loading' ? (
                            <>
                                <span className="animate-spin inline-block w-5 h-5 border-2 border-black border-t-transparent rounded-full mr-2"></span>
                                Sending...
                            </>
                        ) : (
                            'Send'
                        )}
                    </CustomButton>
                </div>
            </form>
        </div>
    );
}