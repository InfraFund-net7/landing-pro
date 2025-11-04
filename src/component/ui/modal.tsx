// Modal.tsx
"use client";

import { X } from "lucide-react";
import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: string;
  height?: string;
  ModalTitle?: string;
  className?: string;
  showCloseButton?: boolean;
}

export function Modal({
  isOpen,
  onClose,
  children,
  ModalTitle,
  width = "90vw", // ← برای موبایل
  height = "auto",
  className = "",
  showCloseButton = true,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[999999] flex items-center justify-center bg-[#090B1166] backdrop-blur-sm animate-fade-in p-4"
      aria-modal="true"
      role="dialog"
    >
      <div
        style={{
          width: width,
          maxWidth: "512px", // ← مثل فیگما، حداکثر 512px
          maxHeight: "90vh", // جلوگیری از اسکرول غیرضروری
          height: height,
        }}
        className={`relative p-6 sm:p-8 flex flex-col justify-between items-start rounded-[20px] shadow-lg bg-[#343C5266] backdrop-blur-xl border border-card-bg-border animate-slide-in ${className}`}
      >
        <div className="w-full flex justify-between items-center">
          {ModalTitle && (
            <h2 className="text-xl sm:text-2xl font-bold text-white">{ModalTitle}</h2>
          )}
          {showCloseButton && (
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="cursor-pointer text-white hover:text-[#24FF8E] transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          )}
        </div>

        <div className="w-full mt-4 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}