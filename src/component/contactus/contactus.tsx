'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { contactusactions } from '@/constants/contactus';

interface ContactUsModalProps {
    isOpen: boolean;
    onClose: () => void;
    triggerRef?: React.RefObject<HTMLElement | null>; // اختیاری کردیم + null قبول می‌کنه
}

const openGoogleCalendarPopup = () => {
    window.open('https://calendar.app.google/JhczsLXzGw66F17s8', '_blank', 'width=800,height=600');
};

export default function ContactUsModal({ isOpen, onClose, triggerRef }: ContactUsModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isOpen || !triggerRef?.current || !modalRef.current) {
            // اگه triggerRef نبود، وسط صفحه باز شه (مثل مودال معمولی)
            if (isOpen && modalRef.current) {
                modalRef.current.style.position = 'fixed';
                modalRef.current.style.top = '50%';
                modalRef.current.style.left = '50%';
                modalRef.current.style.transform = 'translate(-50%, -50%)';
            }
            return;
        }

        const trigger = triggerRef.current;
        const modal = modalRef.current;
        const rect = trigger.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        const modalHeight = modal.offsetHeight || 550;

        modal.style.position = 'fixed';
        modal.style.left = `${rect.left + rect.width / 2}px`;
        modal.style.transform = 'translateX(-50%)';

        if (spaceBelow < modalHeight + 30) {
            modal.style.bottom = `${window.innerHeight - rect.top + 10}px`;
        } else {
            modal.style.top = `${rect.bottom + 16}px`;
        }

        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = ''; };
    }, [isOpen, triggerRef]);

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-40" onClick={onClose} />

            <div
                ref={modalRef}
                className="fixed bg-[#121826] rounded-2xl shadow-2xl border border-white/5 max-w-lg w-[95vw] z-50 animate-in fade-in zoom-in-95 duration-200"
            >
                <div className="p-8 pt-12 relative">
                    <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div className="flex flex-col items-center gap-8">
                        <h3 className="text-2xl font-bold text-white">How would you like to connect?</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                            {contactusactions.map((item, i) => {
                                const Icon = item.icon;
                                return (
                                    <button
                                        key={i}
                                        onClick={item.type === 'booking' ? openGoogleCalendarPopup : () => { }}
                                        className="bg-[#343C52]/90 border border-[#152133] p-8 rounded-2xl hover:bg-[#3c465f] active:scale-98 transition flex flex-col gap-4 text-left group"
                                    >
                                        <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center group-hover:scale-110 transition">
                                            <Icon className="w-6 h-6 text-[#343C52]" />
                                        </div>
                                        <p className="text-lg font-semibold text-white">{item.title}</p>
                                        <p className="text-sm text-gray-300">{item.description}</p>
                                    </button>
                                );
                            })}
                        </div>

                        <p className="text-sm text-gray-400 text-center">
                            Are you a Builder? <Link href="/builders" className="text-primary font-bold underline">Visit our Builder page</Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}