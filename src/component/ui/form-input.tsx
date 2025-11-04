import type React from "react";

interface FormInputProps {
    label?: string;
    placeholder: string;
    type?: string;
    icon?: React.ReactNode;
}

export function FormInput({
    label,
    placeholder,
    type = "text",
    icon,
}: FormInputProps) {
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
