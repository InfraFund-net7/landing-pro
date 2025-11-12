interface FormInputProps {
    label?: string;
    placeholder: string;
    type?: string;
    icon?: React.ReactNode;
    isTextarea?: boolean;
    style?: React.CSSProperties;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    name?: string;
    id?: string;
    disabled?: boolean;
}

export function FormInput({
    label,
    placeholder,
    type = "text",
    icon,
    isTextarea = false,
    style,
    value,
    onChange,
    onBlur,
    name,
    id,
    disabled,
}: FormInputProps) {
    const baseStyle = {
        fontSize: '1rem',
        ...style,
    };

    if (isTextarea) {
        return (
            <div className="flex flex-col gap-2 w-full">
                {label && <label className="text-white text-sm font-medium">{label}</label>}
                <div className="relative">
                    <textarea
                        placeholder={placeholder}
                        value={value ?? ""}
                        onChange={onChange}
                        onBlur={onBlur}
                        name={name}
                        id={id}
                        disabled={disabled}
                        className="w-full bg-[#131C2F] px-4 py-3 rounded-lg outline-none text-white placeholder-placeholder-text focus:outline-none focus:ring-2 focus:ring-active-green transition-colors duration-200 resize-none"
                        style={{ ...baseStyle, height: '120px' }}
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-2 w-full">
            {label && <label className="text-white text-sm font-medium">{label}</label>}
            <div className="relative">
                <input
                    type={type}
                    placeholder={placeholder}
                    value={value ?? ""}
                    onChange={onChange}
                    onBlur={onBlur}
                    name={name}
                    id={id}
                    disabled={disabled}
                    className="w-full bg-[#131C2F] px-4 py-3 rounded-lg outline-none bg-input-background text-white placeholder-placeholder-text focus:outline-none focus:ring-2 focus:ring-active-green transition-colors duration-200"
                    style={baseStyle}
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