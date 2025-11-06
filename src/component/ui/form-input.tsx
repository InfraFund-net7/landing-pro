import type React from "react";

interface FormInputProps {
    label?: string;
    placeholder: string;
    type?: string;
    icon?: React.ReactNode;
    isTextarea?: boolean; // ✅ اضافه شد
}

export function FormInput({
    label,
    placeholder,
    type = "text",
    icon,
    isTextarea = false,
}: FormInputProps) {
    if (isTextarea) {
        return (
            <div className="flex flex-col gap-2 w-full">
                <label className="text-white text-sm font-medium">{label}</label>
                <div className="relative">
                    <textarea
                        placeholder={placeholder}
                        className="w-full bg-[#131C2F] px-4 py-3 rounded-lg outline-none text-white placeholder-placeholder-text focus:outline-none focus:ring-2 focus:ring-active-green transition-colors duration-200 resize-none"
                        style={{ height: '120px' }} 
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-2 w-full">
            <label className="text-white text-sm font-medium">{label}</label>
            <div className="relative">
                <input
                    type={type}
                    placeholder={placeholder}
                    className="w-full bg-[#131C2F] px-4 py-3 rounded-lg outline-none bg-input-background text-white placeholder-placeholder-text focus:outline-none focus:ring-2 focus:ring-active-green transition-colors duration-200"
                />
                {icon && (
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                        {icon}
                    </div>
                )}
            </div>
        </div>
    );
}