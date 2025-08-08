import React from "react";
import { useTranslation } from "react-i18next";
import { Calendar, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface DateTimePickerProps {
  value?: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  error?: string;
  description?: string;
  required?: boolean;
}

export function DateTimePicker({
  value,
  onChange,
  label,
  placeholder,
  disabled = false,
  className,
  error,
  description,
  required = false
}: DateTimePickerProps) {
  const { t } = useTranslation();

  // Format datetime-local value (YYYY-MM-DDTHH:MM)
  const formatDateTimeLocal = (dateString: string): string => {
    if (!dateString) return "";
    
    try {
      const date = new Date(dateString);
      // Format to YYYY-MM-DDTHH:MM for datetime-local input
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    } catch {
      return "";
    }
  };

  // Convert datetime-local value back to ISO string
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const localDateTime = e.target.value;
    if (!localDateTime) {
      onChange("");
      return;
    }

    try {
      // Convert local datetime to ISO string
      const date = new Date(localDateTime);
      onChange(date.toISOString());
    } catch {
      onChange("");
    }
  };

  // Get minimum datetime (current time + 1 hour)
  const getMinDateTime = (): string => {
    const now = new Date();
    now.setHours(now.getHours() + 1); // At least 1 hour from now
    return formatDateTimeLocal(now.toISOString());
  };

  // Validate business hours (9 AM - 6 PM)
  const isBusinessHours = (dateTimeString: string): boolean => {
    if (!dateTimeString) return true;
    
    try {
      const date = new Date(dateTimeString);
      const hours = date.getHours();
      return hours >= 9 && hours <= 18;
    } catch {
      return false;
    }
  };

  const formattedValue = formatDateTimeLocal(value || "");
  const minDateTime = getMinDateTime();

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <Label htmlFor="datetime-picker" className="text-sm font-medium">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}
      
      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
          <Calendar className="h-4 w-4" />
        </div>
        
        <Input
          id="datetime-picker"
          type="datetime-local"
          value={formattedValue}
          onChange={handleChange}
          min={minDateTime}
          disabled={disabled}
          placeholder={placeholder}
          className={cn(
            "pl-10 pr-10",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500"
          )}
        />
        
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
          <Clock className="h-4 w-4" />
        </div>
      </div>

      {description && !error && (
        <p className="text-xs text-gray-500">{description}</p>
      )}

      {error && (
        <p className="text-xs text-red-500">{error}</p>
      )}

      {/* Business hours warning */}
      {value && !isBusinessHours(value) && !error && (
        <p className="text-xs text-amber-600 flex items-center gap-1">
          <Clock className="h-3 w-3" />
          {t("recruiterInterviews.validation.scheduledAt.businessHours")}
        </p>
      )}
    </div>
  );
}

// Utility functions for validation
export const validateDateTime = (
  dateTimeString: string,
  t: ReturnType<typeof useTranslation>["t"]
): string | null => {
  if (!dateTimeString) {
    return t("recruiterInterviews.validation.scheduledAt.required");
  }

  try {
    const date = new Date(dateTimeString);
    const now = new Date();

    // Check if date is in the future
    if (date <= now) {
      return t("recruiterInterviews.validation.scheduledAt.futureDate");
    }

    // Check business hours (optional warning, not blocking)
    const hours = date.getHours();
    if (hours < 9 || hours > 18) {
      // This is just a warning, not a blocking validation
      // The actual validation should be handled in the form schema
    }

    return null;
  } catch {
    return t("recruiterInterviews.validation.scheduledAt.required");
  }
};

// Helper to check if datetime is in business hours
export const isInBusinessHours = (dateTimeString: string): boolean => {
  if (!dateTimeString) return false;
  
  try {
    const date = new Date(dateTimeString);
    const hours = date.getHours();
    return hours >= 9 && hours <= 18;
  } catch {
    return false;
  }
};
