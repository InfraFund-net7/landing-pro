'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { createPortal } from 'react-dom';
import { contactusactions } from '@/constants/contactus';
import EmailSend from './email-send';
import { Headset, Mail } from 'lucide-react';

interface ContactUsModalProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef?: React.RefObject<HTMLElement | null>;
  actions?: Array<{
    title: string;
    description: string;
    type: 'booking' | 'email';
  }>;
}

const openGoogleCalendarPopup = () => {
  window.open(
    'https://calendar.app.google/JhczsLXzGw66F17s8',
    '_blank',
    'width=800,height=600'
  );
};

export default function ContactUsModal({
  isOpen,
  onClose,
  actions,
}: ContactUsModalProps) {
  const [mode, setMode] = useState<'menu' | 'email'>('menu');
  const resolvedActions = actions ?? contactusactions;

  if (!isOpen) return null;

  return createPortal(
    <>
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-md z-40"
        onClick={onClose}
      />

      <div
        className="fixed top-1/2 left-1/2 z-50 bg-[#121826] rounded-2xl shadow-2xl border border-white/5 max-w-lg w-[95vw] animate-in fade-in zoom-in-95 duration-200
                -translate-x-1/2 -translate-y-1/2"
      >
        <div className="p-8 pt-12 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white"
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {mode === 'email' ? (
            <EmailSend onBack={() => setMode('menu')} />
          ) : (
            <div className="flex flex-col items-center gap-8">
              <h3 className="text-2xl font-bold text-white">
                How would you like to connect?
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                {resolvedActions.map((item, i) => {
                  const Icon =
                    'icon' in item
                      ? item.icon
                      : item.type === 'booking'
                        ? Headset
                        : Mail;
                  return (
                    <button
                      key={i}
                      onClick={
                        item.type === 'booking'
                          ? openGoogleCalendarPopup
                          : item.type === 'email'
                            ? () => setMode('email')
                            : () => {}
                      }
                      className="bg-[#343C52]/90 border border-[#152133] p-8 rounded-2xl hover:bg-[#3c465f] active:scale-98 transition flex flex-col gap-4 text-left group"
                    >
                      <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center group-hover:scale-110 transition">
                        <Icon className="w-6 h-6 text-[#343C52]" />
                      </div>
                      <p className="text-lg font-semibold text-white">
                        {item.title}
                      </p>
                      <p className="text-sm text-gray-300">
                        {item.description}
                      </p>
                    </button>
                  );
                })}
              </div>

              <p className="text-sm text-gray-400 text-center">
                Are you a Builder?{' '}
                <Link
                  href="/builders"
                  className="text-primary font-bold underline"
                >
                  Visit our Builder page
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </>,
    document.body
  );
}
