import React from "react";
// import { useTranslation } from "react-i18next";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Control } from "react-hook-form";
import { IFilterOption } from "@/types/common";

// Job types based on backend JobType enum
const JOB_TYPES: IFilterOption[] = [
  { value: "full_time", label: "Full-time", count: 0 },
  { value: "part_time", label: "Part-time", count: 0 },
  { value: "contract", label: "Contract", count: 0 },
  { value: "freelance", label: "Freelance", count: 0 },
  { value: "internship", label: "Internship", count: 0 },
  { value: "temporary", label: "Temporary", count: 0 },
];

interface JobTypeFilterProps {
  control?: Control<any>;
  name?: string;
  label?: string;
  value?: string[];
  onChange?: (value: string[]) => void;
  className?: string;
  showLabel?: boolean;
  jobTypes?: IFilterOption[];
  showCounts?: boolean;
  maxHeight?: string;
}

export const JobTypeFilter: React.FC<JobTypeFilterProps> = ({
  control,
  name = "jobType",
  label = "Job Type",
  value = [],
  onChange,
  className = "",
  showLabel = true,
  jobTypes = JOB_TYPES,
  showCounts = false,
  maxHeight = "max-h-48",
}) => {
  // const { t } = useTranslation();
  const handleCheckboxChange = (jobTypeValue: string, checked: boolean) => {
    if (onChange) {
      const newValue = checked
        ? [...value, jobTypeValue]
        : value.filter((v) => v !== jobTypeValue);
      onChange(newValue);
    }
  };

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
              <div className={`space-y-3 ${maxHeight} overflow-y-auto`}>
                {jobTypes.map((jobType) => (
                  <div
                    key={jobType.value}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={`jobtype-${jobType.value}`}
                      checked={field.value?.includes(jobType.value) || false}
                      onCheckedChange={(checked) => {
                        const currentValue = field.value || [];
                        const newValue = checked
                          ? [...currentValue, jobType.value]
                          : currentValue.filter(
                              (v: string) => v !== jobType.value
                            );
                        field.onChange(newValue);
                      }}
                    />
                    <Label
                      htmlFor={`jobtype-${jobType.value}`}
                      className="text-sm font-normal cursor-pointer flex-1"
                    >
                      <div className="flex items-center justify-between">
                        <span>{jobType.label}</span>
                        {showCounts && jobType.count !== undefined && (
                          <span className="text-xs text-gray-500 ml-2">
                            ({jobType.count})
                          </span>
                        )}
                      </div>
                    </Label>
                  </div>
                ))}
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
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {label}
        </label>
      )}
      <div className={`space-y-3 ${maxHeight} overflow-y-auto`}>
        {jobTypes.map((jobType) => (
          <div key={jobType.value} className="flex items-center space-x-2">
            <Checkbox
              id={`jobtype-${jobType.value}`}
              checked={value.includes(jobType.value)}
              onCheckedChange={(checked) =>
                handleCheckboxChange(jobType.value, checked as boolean)
              }
            />
            <Label
              htmlFor={`jobtype-${jobType.value}`}
              className="text-sm font-normal cursor-pointer flex-1"
            >
              <div className="flex items-center justify-between">
                <span>{jobType.label}</span>
                {showCounts && jobType.count !== undefined && (
                  <span className="text-xs text-gray-500 ml-2">
                    ({jobType.count})
                  </span>
                )}
              </div>
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

// Export job types for reuse
export { JOB_TYPES };
