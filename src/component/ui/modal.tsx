"use client"

import { X } from "lucide-react"
import type React from "react"
import { useEffect, useRef } from "react"
import gsap from "gsap"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  width?: string
  height?: string
  ModalTitle?: string
  className?: string
  showCloseButton?: boolean
}

export function Modal({
  isOpen,
  onClose,
  children,
  ModalTitle,
  width = "90vw",
  height = "auto",
  className = "",
  showCloseButton = true,
}: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const overlay = overlayRef.current
    const modal = modalRef.current

    if (isOpen) {
      gsap.set(overlay, { opacity: 0, display: "flex" })
      gsap.set(modal, { opacity: 0, y: 30, scale: 0.95 })
      gsap.to(overlay, { opacity: 1, duration: 0.3, ease: "power2.out" })
      gsap.to(modal, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.4,
        ease: "power3.out",
        delay: 0.1,
      })
    } else {
      gsap.to(modal, {
        opacity: 0,
        y: 20,
        scale: 0.95,
        duration: 0.3,
        ease: "power2.in",
      })
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        delay: 0.1,
        onComplete: () => {
          gsap.set(overlay, { display: "none" })
        },
      })
    }
  }, [isOpen])

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[999999] hidden items-center justify-center bg-[#090B1166] backdrop-blur-sm p-4"
      aria-modal="true"
      role="dialog"
    >
      <div
        ref={modalRef}
        style={{
          width,
          maxWidth: "512px",
          height: "auto",
        }}
        className={`relative p-3 sm:p-4 md:p-5 flex flex-col justify-between text-center items-start rounded-[20px] shadow-lg bg-[#343C5266] backdrop-blur-xl border border-card-bg-border ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full flex justify-between items-center mb-2 sm:mb-3">
          {ModalTitle && <h2 className="text-xl sm:text-2xl font-bold text-white">{ModalTitle}</h2>}
          {showCloseButton && (
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="cursor-pointer text-white hover:text-[#24FF8E] transition-colors"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          )}
        </div>
        <>{children}</>
      </div>
    </div>
  )
}
