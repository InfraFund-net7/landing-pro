'use client';

import type React from 'react';

interface CustomButtonProps {
  children: React.ReactNode;
  variant?: 'filled' | 'outlined' | 'canceled';
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export function CustomButton({
  children,
  variant = 'filled',
  onClick,
  className = '',
  disabled = false,
  type = 'button',
}: CustomButtonProps) {
  const baseClasses =
    'py-4 rounded-lg font-semibold text-lg transition-all duration-300 ease-in-out outline-none border-2';

  const disabledClasses = 'cursor-not-allowed bg-[#616172] text-[#a3a3a3] border-[#777777] pointer-events-none';

  const variantClasses = {
    filled: disabled
      ? disabledClasses
      : 'bg-primary text-black border-green-400 فثطف hover:bg-primary hover:border-primary active:bg-primary-pressed active:border-primary-pressed cursor-pointer',

    outlined: disabled
      ? `${disabledClasses} border-[#777777]` // می‌تونی border رو شفاف کنی: `border-transparent`
      : 'bg-transparent text-primary border-primary hover:bg-primary-hover hover:text-black active:bg-primary active:text-black cursor-pointer',

    canceled: disabled
      ? disabledClasses
      : 'bg-card-cancel text-primary border-card-cancel hover:bg-card-cancel-hover hover:text-black active:bg-card-cancel-active active:text-black cursor-pointer',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
}