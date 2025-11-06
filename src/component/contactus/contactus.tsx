'use client';

import React, { useState } from 'react';
import { Modal } from '../ui/modal';
import Link from 'next/link';
import { contactusactions } from '@/constants/contactus';
import EmailSend from './email-send';

interface ContactUsProps {
    isOpen: boolean;
    onClose: () => void;
}

const openGoogleCalendarPopup = () => {
    const url = 'https://calendar.app.google/JhczsLXzGw66F17s8';
    const width = 800;
    const height = 600;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    const popup = window.open(
        url,
        '_blank',
        `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
    );

    if (popup) {
        const checkClosed = setInterval(() => {
            if (popup.closed) {
                clearInterval(checkClosed);
            }
        }, 1000);
    }
};

export default function ContactUs({ isOpen, onClose }: ContactUsProps) {
    const [showEmailForm, setShowEmailForm] = useState(false);

    const handleEmailClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setShowEmailForm(true);
    };

    const handleBack = () => {
        setShowEmailForm(false);
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            showCloseButton={true}
            ModalTitle="Contact Us"
            className="w-full h-full"
        >
            {showEmailForm ? (
                <div className="flex flex-col justify-between items-start gap-8 w-full h-full py-8   text-left">
                    <EmailSend onBack={handleBack} />
                </div>
            ) : (
                <div className="flex flex-col items-center justify-end gap-12 w-full h-full py-8">
                    <span className="text-white text-xl font-bold">How would you like to connect?</span>

                    <div className="w-full flex flex-col justify-center items-center gap-4 p-4 md:flex-row text-white">
                        {contactusactions.map((item, index) => {
                            const Icon = item.icon;

                            if (item.type === 'booking') {
                                return (
                                    <button
                                        key={index}
                                        onClick={openGoogleCalendarPopup}
                                        className="w-full md:w-1/2 min-h-[187px] flex-shrink-0 bg-[#343C52] border flex flex-col gap-3 text-left justify-start items-start border-[#152133] px-3 py-4 md:px-4 md:py-6 rounded-xl cursor-pointer transition-all hover:bg-[#3c465f] active:scale-[0.98]"
                                        style={{
                                            backdropFilter: 'blur(70px)',
                                            WebkitBackdropFilter: 'blur(70px)',
                                        }}
                                    >
                                        <div className="bg-white w-10 h-10 rounded-full flex justify-center items-center">
                                            <Icon className="w-5 h-5 text-[#343C52]" />
                                        </div>
                                        <span className="text-base font-medium">{item.title}</span>
                                        <span className="text-sm font-normal">{item.description}</span>
                                    </button>
                                );
                            }

                            if (item.type === 'email') {
                                return (
                                    <button
                                        key={index}
                                        onClick={handleEmailClick}
                                        className="w-full md:w-1/2 min-h-[187px] flex-shrink-0 bg-[#343C52] border flex flex-col gap-3 text-left justify-start items-start border-[#152133] px-3 py-4 md:px-4 md:py-6 rounded-xl no-underline cursor-pointer"
                                        style={{
                                            backdropFilter: 'blur(70px)',
                                            WebkitBackdropFilter: 'blur(70px)',
                                        }}
                                    >
                                        <div className="bg-white w-10 h-10 rounded-full flex justify-center items-center">
                                            <Icon className="w-5 h-5 text-[#343C52]" />
                                        </div>
                                        <span className="text-base font-medium">{item.title}</span>
                                        <span className="text-sm font-normal">{item.description}</span>
                                    </button>
                                );
                            }

                            return null;
                        })}
                    </div>

                    <span className="text-gray-50 text-sm font-normal">
                        Are you a Builder or industry professional?
                        <Link className="underline text-primary" href="/builders">
                            &nbsp;Visit our Builder page
                        </Link>
                    </span>
                </div>
            )}
        </Modal>
    );
}