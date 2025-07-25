"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface RangeSliderProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  value?: number;
  onValueChange?: (value: number) => void;
}

export const RangeSlider = React.forwardRef<HTMLInputElement, RangeSliderProps>(
  ({ className, label, value, onValueChange, onChange, ...props }, ref) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = Number(event.target.value);
      onValueChange?.(newValue);
      onChange?.(event);
    };

    return (
      <div className="space-y-3">
        {label && (
          <label className="text-sm font-medium text-[#202124]">{label}</label>
        )}
        <div className="relative">
          <input
            type="range"
            ref={ref}
            value={value}
            onChange={handleChange}
            className={cn(
              "h-2 w-full cursor-pointer appearance-none rounded-lg bg-[#E8EAED] outline-none focus:ring-2 focus:ring-[#1967D2] focus:ring-offset-2",
              "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#1967D2] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg",
              "[&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#1967D2] [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-lg [&::-moz-range-thumb]:border-none",
              "[&::-moz-range-track]:h-2 [&::-moz-range-track]:rounded-lg [&::-moz-range-track]:bg-[#E8EAED]",
              className
            )}
            {...props}
          />
          {/* Progress fill */}
          <div
            className="absolute top-0 h-2 bg-[#1967D2] rounded-lg pointer-events-none"
            style={{
              width: `${
                (((value || 0) - (Number(props.min) || 0)) /
                  ((Number(props.max) || 100) - (Number(props.min) || 0))) *
                100
              }%`,
            }}
          />
        </div>
        {value !== undefined && (
          <div className="text-sm text-[#696969] text-center">{value}</div>
        )}
      </div>
    );
  }
);

RangeSlider.displayName = "RangeSlider";
