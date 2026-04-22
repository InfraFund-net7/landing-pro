import { waitlistdata } from '@/data/waitlist';
import Image from 'next/image';
import React, { useState } from 'react';
import { Modal } from './ui/modal';
import infrafund from '@/../public/svg/infrafund.svg';
import greentik from '@/../public/svg/green-tik.svg';
import { FormInput } from './ui/form-input';
import { CustomButton } from './ui/custom-button';
import apiService from '@/services/apiService';
import { withCaptcha } from '@/lib/apiCaptcha';
import { ApiError } from '@/utils/interceptors.utils';

interface WaitlistmodalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

export default function Waitlistmodal({
  isModalOpen,
  setIsModalOpen,
}: WaitlistmodalProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const [message, setMessage] = useState<string>('');

  const handleSubmit = async () => {
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const data = await apiService.post<{
        success: boolean;
        message?: string;
      }>(
        '/waitlists',
        { email: email.trim().toLowerCase() },
        await withCaptcha('waitlist')
      );
      setStatus('success');
      setMessage(data.message || "Thank you! You're on the list.");
      setEmail('');
    } catch (error: unknown) {
      if (error instanceof ApiError && error.status === 409) {
        setStatus('success');
        setMessage('This email is already on our waitlist.');
        return;
      }

      setStatus('error');
      const msg =
        error instanceof ApiError
          ? error.detail
          : error instanceof Error
            ? error.message
            : 'Failed to join the waitlist. Please try again.';
      setMessage(msg);
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      showCloseButton={false}
    >
      <div className="text-center flex flex-col justify-start items-center w-full h-fit px-2 gap-3 sm:gap-4">
        <div className="flex flex-col justify-center items-center w-full gap-1.5 sm:gap-2">
          <Image
            src={infrafund || '/placeholder.svg'}
            width={199}
            height={48}
            alt="infrafund"
            className="w-full max-w-[160px] sm:max-w-[199px] h-auto"
          />
          <span
            className="text-xs sm:text-sm"
            style={{
              color: '#f5f6f8',
              WebkitTextFillColor: '#f5f6f8',
            }}
          >
            The OS for Green Infrastructure Tokenization
          </span>
        </div>
        <div className="flex justify-center items-center w-full">
          <span
            className="text-xl sm:text-2xl lg:text-3xl font-bold text-center leading-tight"
            style={{
              color: '#ffffff',
              WebkitTextFillColor: '#ffffff',
            }}
          >
            Finance the NetZero
            <br />
            Transition
          </span>
        </div>
        <div className="flex justify-center text-white items-center w-full">
          <span className="text-xs sm:text-sm lg:text-base text-center leading-relaxed">
            Join the waiting list for the InfraFund Token launch.
            <br />
            Be the first to invest in a tokenized, sustainable future.
          </span>
        </div>
        <div className="flex flex-col justify-center items-center w-full gap-3 sm:gap-4">
          <FormInput
            placeholder="Enter Your Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value.trim())}
          />

          <div className="flex flex-col gap-2 w-full">
            <CustomButton
              className={`w-full h-[48px] sm:h-[52px] text-black text-sm sm:text-base ${
                status === 'success' ? 'bg-green-500 hover:bg-green-600' : ''
              }`}
              variant="filled"
              onClick={handleSubmit}
              disabled={status === 'loading' || !email}
              type="button"
            >
              {status === 'loading' ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-black"></div>
                  Submitting...
                </div>
              ) : status === 'success' ? (
                'Joined!'
              ) : (
                'Get Early Access'
              )}
            </CustomButton>

            {status === 'success' && (
              <p className="text-green-400 text-xs sm:text-sm mt-1 text-center">
                {message}
              </p>
            )}

            {status === 'error' && (
              <p className="text-red-400 text-xs sm:text-sm mt-1 text-center">
                {message}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-2 sm:gap-3 w-full border-t border-[#37415180] pt-3 sm:pt-4">
          <span
            className="text-sm sm:text-base font-bold"
            style={{
              color: '#ffffff',
              WebkitTextFillColor: '#ffffff',
            }}
          >
            By joining, you&apos;ll get:
          </span>
          {waitlistdata.map((item, index) => (
            <div
              className="w-full flex justify-start items-start text-white gap-2 text-xs sm:text-sm lg:text-base text-left"
              key={index}
            >
              <Image
                src={greentik || '/placeholder.svg'}
                width={16}
                height={16}
                alt="green-tik"
                className="flex-shrink-0 mt-0.5"
              />
              <p className="leading-snug">
                <span className="font-bold">{item.title}</span>:
                <span className="font-normal">{item.description}</span>
              </p>
            </div>
          ))}
        </div>
        <div className="w-full h-auto py-2 flex justify-center items-center">
          <span className="text-[#6B7280] font-normal text-[10px] sm:text-xs lg:text-sm text-center px-2">
            © 2025 InfraNetZero LTD. All rights reserved.
          </span>
        </div>
      </div>
    </Modal>
  );
}
