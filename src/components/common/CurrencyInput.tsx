import { forwardRef, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { formatVND, parseVND } from "@/utils/salary";

interface CurrencyInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange"
  > {
  value?: number;
  onChange?: (value: number) => void;
  currency?: string;
}

export const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
  (
    { value, onChange, currency = "VND", className, placeholder, ...props },
    ref
  ) => {
    const [displayValue, setDisplayValue] = useState("");

    useEffect(() => {
      if (value && value > 0) {
        setDisplayValue(formatVND(value));
      } else {
        setDisplayValue("");
      }
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;

      // Remove all non-digit characters for parsing
      const numericValue = parseVND(inputValue);

      // Format for display
      if (inputValue === "") {
        setDisplayValue("");
        onChange?.(0);
      } else {
        const formatted = formatVND(numericValue);
        setDisplayValue(formatted);
        onChange?.(numericValue);
      }
    };

    return (
      <div className="relative">
        <Input
          {...props}
          ref={ref}
          value={displayValue}
          onChange={handleChange}
          placeholder={placeholder}
          className={cn("pr-12", className)}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <span className="text-gray-500 text-sm font-medium">{currency}</span>
        </div>
      </div>
    );
  }
);

CurrencyInput.displayName = "CurrencyInput";
