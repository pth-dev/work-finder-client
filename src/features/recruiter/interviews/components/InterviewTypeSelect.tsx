import React from "react";
import { useTranslation } from "react-i18next";
import { Phone, Video, MapPin, LucideIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InterviewType } from "../types";

interface InterviewTypeSelectProps {
  value?: InterviewType;
  onValueChange: (value: InterviewType) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

interface InterviewTypeOption {
  value: InterviewType;
  label: string; // Changed from labelKey to label
  icon: LucideIcon;
  description: string;
}

// HARDCODED VIETNAMESE FOR DEMO
const interviewTypeOptions: InterviewTypeOption[] = [
  {
    value: InterviewType.PHONE,
    label: "Điện thoại",
    icon: Phone,
    description: "Phỏng vấn qua điện thoại",
  },
  {
    value: InterviewType.VIDEO,
    label: "Video",
    icon: Video,
    description: "Phỏng vấn qua video call",
  },
  {
    value: InterviewType.IN_PERSON,
    label: "Trực tiếp",
    icon: MapPin,
    description: "Phỏng vấn trực tiếp tại văn phòng",
  },
];

export function InterviewTypeSelect({
  value,
  onValueChange,
  placeholder,
  disabled = false,
  className,
}: InterviewTypeSelectProps) {
  const { t } = useTranslation();

  const selectedOption = interviewTypeOptions.find(
    (option) => option.value === value
  );

  return (
    <Select value={value} onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder}>
          {selectedOption && (
            <div className="flex items-center gap-2">
              <selectedOption.icon className="h-4 w-4" />
              <span>{selectedOption.label}</span>
            </div>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {interviewTypeOptions.map((option) => {
          const Icon = option.icon;
          return (
            <SelectItem key={option.value} value={option.value}>
              <div className="flex items-center gap-2">
                <Icon className="h-4 w-4" />
                <div className="flex flex-col">
                  <span className="font-medium">{option.label}</span>
                  <span className="text-xs text-muted-foreground">
                    {option.description}
                  </span>
                </div>
              </div>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}

// Export the options for use in other components
export { interviewTypeOptions, type InterviewTypeOption };
