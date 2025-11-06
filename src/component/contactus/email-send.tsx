import React from 'react';
import { FormInput } from '../ui/form-input';
import Link from 'next/link';

interface EmailSendProps {
    onBack?: () => void;
}

export default function EmailSend({ onBack }: EmailSendProps) {
    const datas = [
        { title: "First Name", isTextarea: false },
        { title: "Last Name", isTextarea: false },
        { title: "Email", isTextarea: false },
        { title: "Message", isTextarea: true },
    ];

    return (
        <>
            <span className="text-base text-white font-normal leading-9">
                Fill out the form below and we&apos;ll get back to you within 24 hours. You can also visit our{" "}
                <Link href="/faq" className="text-primary font-bold underline">
                    FAQs page
                </Link>{" "}
                for immediate answers.
            </span>

            <div className='flex flex-col justify-center items-center gap-6 w-full'>
                {datas.map((item, index) => (
                    <FormInput
                        key={index}
                        label={item.title}
                        placeholder={item.title}
                        isTextarea={item.isTextarea}
                    />
                ))}
            </div>

            <div className='w-full h-12 flex justify-center items-center gap-6 text-lg font-bold'>
                <button
                    onClick={onBack}
                    className='w-[160px] h-full flex justify-center items-center text-white cursor-pointer hover:text-primary'
                >
                    Back
                </button>
                <button className='w-[160px] h-full flex justify-center items-center bg-gray-300 rounded-sm cursor-pointer text-black'>
                    Send
                </button>
            </div>
        </>
    );
}