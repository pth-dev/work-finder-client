import * as React from "react";

import { cn } from "@/lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
  label?: string;
  error?: string;
}

// Base input component for use in FormField (no label/error wrapper)
const BaseInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      ref={ref}
      className={cn(
        "flex h-[60px] w-full rounded-lg border border-[#ecedf2] bg-white px-6 py-4 text-[15px] text-[#696969] font-normal shadow-[0px_6px_15px_0px_rgba(64,79,104,0.05)] placeholder:text-[#696969] focus-visible:outline-none focus-visible:border-[#1967d2] focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
});

BaseInput.displayName = "BaseInput";

// Full input component with label and error (for standalone use)
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-[15px] font-normal text-[#202124] mb-2">
            {label}
          </label>
        )}
        <BaseInput
          type={type}
          ref={ref}
          className={cn(
            error && "border-red-500 focus-visible:border-red-500",
            className
          )}
          {...props}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input, BaseInput };
