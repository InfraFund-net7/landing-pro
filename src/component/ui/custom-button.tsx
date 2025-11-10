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
    'px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 ease-in-out outline-none border-2';

  const variantClasses = {
    filled: `bg-primary text-black border-green-400 hover:bg-primary hover:border-primary active:bg-primary-pressed active:border-primary-pressed ${
      disabled ? 'cursor-not-allowed bg-primary-disabled' : 'cursor-pointer'
    }`,
    outlined: `bg-transparent text-primary border-primary hover:bg-primary-hover hover:text-black active:bg-primary active:text-black ${
      disabled ? 'cursor-not-allowed' : 'cursor-pointer'
    }`,
    canceled: `bg-card-cancel text-primary border-card-cancel hover:bg-card-cancel-hover hover:text-black active:bg-card-cancel-active active:text-black ${
      disabled ? 'cursor-not-allowed' : 'cursor-pointer'
    }`,
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
