"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-[15px] font-normal text-[#202124] mb-2">
            {label}
          </label>
        )}
        <textarea
          className={cn(
            "flex min-h-[189px] w-full rounded-lg border border-[#ecedf2] bg-[#f0f5f7] px-6 py-4 text-[15px] text-[#696969] font-normal placeholder:text-[#696969] focus-visible:outline-none focus-visible:border-[#1967d2] focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 resize-none",
            error && "border-red-500 focus-visible:border-red-500",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
