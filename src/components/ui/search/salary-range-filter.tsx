import React from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Control } from "react-hook-form";

interface SalaryRangeFilterProps {
  control?: Control<any>;
  name?: string;
  label?: string;
  value?: [number, number];
  onChange?: (value: [number, number]) => void;
  className?: string;
  showLabel?: boolean;
  min?: number;
  max?: number;
  step?: number;
  currency?: string;
  formatValue?: (value: number) => string;
}

// Default salary formatter
const defaultFormatSalary = (
  value: number,
  currency: string = "USD"
): string => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M ${currency}`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(0)}K ${currency}`;
  }
  return `${value.toLocaleString()} ${currency}`;
};

export const SalaryRangeFilter: React.FC<SalaryRangeFilterProps> = ({
  control,
  name = "salaryRange",
  label = "Salary Range",
  value = [0, 100000],
  onChange,
  className = "",
  showLabel = true,
  min = 0,
  max = 200000,
  step = 5000,
  currency = "USD",
  formatValue,
}) => {
  const formatSalary =
    formatValue || ((val: number) => defaultFormatSalary(val, currency));

  // If using with react-hook-form
  if (control && name) {
    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className={className}>
            {showLabel && <FormLabel>{label}</FormLabel>}
            <FormControl>
              <div className="space-y-4">
                <Slider
                  value={field.value || [min, max]}
                  onValueChange={(newValue) => {
                    const range: [number, number] = [newValue[0], newValue[1]];
                    field.onChange(range);
                  }}
                  min={min}
                  max={max}
                  step={step}
                  className="w-full [&_[data-slot=slider-track]]:bg-gray-200 [&_[data-slot=slider-range]]:bg-[#1967d2] [&_[data-slot=slider-thumb]]:border-[#1967d2] [&_[data-slot=slider-thumb]]:bg-white"
                />
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{formatSalary(field.value?.[0] || min)}</span>
                  <span>-</span>
                  <span>{formatSalary(field.value?.[1] || max)}</span>
                </div>
              </div>
            </FormControl>
          </FormItem>
        )}
      />
    );
  }

  // Standalone usage
  return (
    <div className={className}>
      {showLabel && (
        <Label className="block text-sm font-medium text-gray-700 mb-3">
          {label}
        </Label>
      )}
      <div className="space-y-4">
        <Slider
          value={value}
          onValueChange={(newValue) => {
            const range: [number, number] = [newValue[0], newValue[1]];
            onChange?.(range);
          }}
          min={min}
          max={max}
          step={step}
          className="w-full [&_[data-slot=slider-track]]:bg-gray-200 [&_[data-slot=slider-range]]:bg-[#1967d2] [&_[data-slot=slider-thumb]]:border-[#1967d2] [&_[data-slot=slider-thumb]]:bg-white"
        />
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>{formatSalary(value[0])}</span>
          <span>-</span>
          <span>{formatSalary(value[1])}</span>
        </div>
      </div>
    </div>
  );
};

// Export default salary ranges for common use cases
export const SALARY_RANGES = {
  USD: { min: 0, max: 200000, step: 5000 },
  VND: { min: 0, max: 2000000000, step: 10000000 }, // 2 billion VND
  EUR: { min: 0, max: 150000, step: 2500 },
};
