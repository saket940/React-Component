import React from "react";
import type { InputFieldProps } from "./InputField.types";

const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  value,
  onChange,
  helperText,
  errorMessage,
  disabled,
  invalid,
  variant = "outlined",
  size = "md",
}) => {
  const baseClasses =
    "block w-full rounded-md border px-3 py-2 focus:outline-none";
  const variants: Record<string, string> = {
    filled: "bg-gray-100 border-transparent",
    outlined: "border border-gray-300",
    ghost: "border-none bg-transparent",
  };
  const sizes: Record<string, string> = {
    sm: "text-sm py-1",
    md: "text-base py-2",
    lg: "text-lg py-3",
  };

  return (
    <div className="flex flex-col space-y-1">
      {label && <label className="text-sm font-medium">{label}</label>}
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        aria-invalid={invalid}
        className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${
          invalid ? "border-red-500" : ""
        } ${disabled ? "bg-gray-200 cursor-not-allowed" : ""}`}
      />
      {helperText && !errorMessage && (
        <span className="text-xs text-gray-500">{helperText}</span>
      )}
      {errorMessage && (
        <span className="text-xs text-red-500">{errorMessage}</span>
      )}
    </div>
  );
};

export default InputField;
