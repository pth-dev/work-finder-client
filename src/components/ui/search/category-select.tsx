import React from "react";
import { Briefcase } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Control } from "react-hook-form";
import { IOption } from "@/types/common";

// Categories based on backend CategoriesService
const JOB_CATEGORIES: IOption[] = [
  { value: "all", label: "All Categories" },
  { value: "accounting-finance", label: "Accounting / Finance" },
  { value: "marketing-sale", label: "Marketing & Sale" },
  { value: "design-multimedia", label: "Design & Multimedia" },
  { value: "development", label: "Development" },
  { value: "human-resource", label: "Human Resource" },
  { value: "finance", label: "Finance" },
  { value: "customer-service", label: "Customer Service" },
  { value: "health-care", label: "Health and Care" },
  { value: "automotive-jobs", label: "Automotive Jobs" },
];

interface CategorySelectProps {
  control?: Control<any>;
  name?: string;
  placeholder?: string;
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  showLabel?: boolean;
  categories?: IOption[];
  showIcon?: boolean;
}

export const CategorySelect: React.FC<CategorySelectProps> = ({
  control,
  name = "category",
  placeholder = "Select category",
  label = "Category",
  value,
  onChange,
  className = "",
  showLabel = false,
  categories = JOB_CATEGORIES,
  showIcon = true,
}) => {
  // If using with react-hook-form
  if (control && name) {
    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className={className}>
            {showLabel && <FormLabel>{label}</FormLabel>}
            <Select
              value={field.value}
              onValueChange={field.onChange}
            >
              <FormControl>
                <SelectTrigger className="h-12 bg-white border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <div className="flex items-center">
                    {showIcon && <Briefcase className="mr-2 h-4 w-4 text-gray-400" />}
                    <SelectValue placeholder={placeholder} />
                  </div>
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />
    );
  }

  // Standalone usage
  return (
    <div className={className}>
      {showLabel && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="h-12 bg-white border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          <div className="flex items-center">
            {showIcon && <Briefcase className="mr-2 h-4 w-4 text-gray-400" />}
            <SelectValue placeholder={placeholder} />
          </div>
        </SelectTrigger>
        <SelectContent>
          {categories.map((category) => (
            <SelectItem key={category.value} value={category.value}>
              {category.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

// Export categories for reuse
export { JOB_CATEGORIES };
