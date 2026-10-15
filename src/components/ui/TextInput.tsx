"use client";

import { cn } from "@/lib/utils";

interface TextInputProps {
  label: string;
  name: string;
  type?: "text" | "email" | "textarea";
  placeholder?: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  error?: string;
  required?: boolean;
  className?: string;
}

export default function TextInput({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  required,
  className,
}: TextInputProps) {
  const inputClasses = cn(
    "w-full rounded-xl border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 transition-all duration-200",
    "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
    error
      ? "border-red-300 focus:ring-red-200 focus:border-red-400"
      : "border-border/60",
    className,
  );

  return (
    <div className="space-y-1.5">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-foreground"
      >
        {label}
        {required && <span className="ml-1 text-primary">*</span>}
      </label>

      {type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          rows={4}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className={inputClasses}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className={inputClasses}
        />
      )}

      {error && (
        <p className="text-xs text-red-500 animate-in">{error}</p>
      )}
    </div>
  );
}
