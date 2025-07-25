"use client";

import { forwardRef } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SearchFieldProps {
  value?: string;
  onChange?: (value: string) => void;
  onClear?: () => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
}

export const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(
  ({ 
    value = "", 
    onChange, 
    onClear,
    placeholder = "Tìm kiếm...", 
    className,
    disabled = false,
    size = "md"
  }, ref) => {
    const sizeClasses = {
      sm: "h-9",
      md: "h-11", 
      lg: "h-12",
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.value);
    };

    const handleClear = () => {
      onChange?.("");
      onClear?.();
    };

    return (
      <div className={cn("relative", className)}>
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        
        <Input
          ref={ref}
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            "pl-10 pr-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500",
            sizeClasses[size]
          )}
        />
        
        {value && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleClear}
              className="h-6 w-6 p-0 hover:bg-gray-100"
            >
              <X className="h-4 w-4 text-gray-400" />
            </Button>
          </div>
        )}
      </div>
    );
  }
);

SearchField.displayName = "SearchField";
