import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";

interface PasswordInputProps {
  placeholder?: string;
  autoComplete?: string;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  name?: string;
  disabled?: boolean;
}

/**
 * Reusable password input component with toggle visibility
 * Follows DRY principle to avoid duplicating password input logic
 */
export function PasswordInput({
  placeholder = "Mật khẩu",
  autoComplete = "current-password",
  className = "h-12 lg:h-14 border-[#c6c6c9] text-[#56575d] text-sm lg:text-base font-medium bg-transparent pr-12",
  value,
  onChange,
  onBlur,
  name,
  disabled,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="h-12 lg:h-14 relative rounded-lg">
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={className}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          name={name}
          disabled={disabled}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#56575d] hover:text-gray-700 disabled:opacity-50"
          disabled={disabled}
        >
          {showPassword ? (
            <Eye className="w-5 h-5 lg:w-6 lg:h-6" />
          ) : (
            <EyeOff className="w-5 h-5 lg:w-6 lg:h-6" />
          )}
        </button>
      </div>
    </div>
  );
}
