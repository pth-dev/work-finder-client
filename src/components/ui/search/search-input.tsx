import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Control } from "react-hook-form";

interface SearchInputProps {
  control?: Control<any>;
  name?: string;
  placeholder?: string;
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
}

export const SearchInput: React.FC<SearchInputProps> = ({
  control,
  name = "search",
  placeholder = "Job title, keywords...",
  label = "Search",
  value,
  onChange,
  className = "",
  showLabel = false,
  size = "md",
}) => {
  const sizeClasses = {
    sm: "h-9 text-sm",
    md: "h-12 text-sm",
    lg: "h-14 text-base",
  };

  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4", 
    lg: "w-5 h-5",
  };

  // If using with react-hook-form
  if (control && name) {
    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            {showLabel && <FormLabel>{label}</FormLabel>}
            <FormControl>
              <div className={`relative ${className}`}>
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${iconSizes[size]} text-gray-400`} />
                <Input
                  {...field}
                  placeholder={placeholder}
                  className={`pl-10 ${sizeClasses[size]} bg-white border border-gray-200 rounded-lg shadow-sm text-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
              </div>
            </FormControl>
          </FormItem>
        )}
      />
    );
  }

  // Standalone usage
  return (
    <div className={`${className}`}>
      {showLabel && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${iconSizes[size]} text-gray-400`} />
        <Input
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          className={`pl-10 ${sizeClasses[size]} bg-white border border-gray-200 rounded-lg shadow-sm text-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
        />
      </div>
    </div>
  );
};
