"use client";

import { forwardRef } from "react";
import { BaseInput } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio";
import { Label } from "@/components/ui/label";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";

// Base props for all form field components
interface BaseFormFieldProps {
  label?: string;
  description?: string;
  className?: string;
  required?: boolean;
}

// Text Input Field with React Hook Form integration
interface TextFormFieldProps extends BaseFormFieldProps {
  type?: "text" | "email" | "tel" | "url" | "number";
  placeholder?: string;
  disabled?: boolean;
  inputClassName?: string;
}

export const TextFormField = forwardRef<HTMLInputElement, TextFormFieldProps>(
  (
    {
      label,
      description,
      className,
      type = "text",
      required,
      inputClassName,
      ...props
    },
    ref
  ) => {
    return (
      <FormItem className={className}>
        {label && (
          <FormLabel>
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </FormLabel>
        )}
        <FormControl>
          <BaseInput
            ref={ref}
            type={type}
            className={cn("h-11", inputClassName)}
            {...props}
          />
        </FormControl>
        {description && <FormDescription>{description}</FormDescription>}
        <FormMessage />
      </FormItem>
    );
  }
);

TextFormField.displayName = "TextFormField";

// Password Input Field with React Hook Form integration
interface PasswordFormFieldProps extends BaseFormFieldProps {
  placeholder?: string;
  disabled?: boolean;
  inputClassName?: string;
}

export const PasswordFormField = forwardRef<
  HTMLInputElement,
  PasswordFormFieldProps
>(
  (
    { label, description, className, required, inputClassName, ...props },
    ref
  ) => {
    return (
      <FormItem className={className}>
        {label && (
          <FormLabel>
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </FormLabel>
        )}
        <FormControl>
          <PasswordInput
            ref={ref}
            className={cn("h-11", inputClassName)}
            {...props}
          />
        </FormControl>
        {description && <FormDescription>{description}</FormDescription>}
        <FormMessage />
      </FormItem>
    );
  }
);

PasswordFormField.displayName = "PasswordFormField";

// Role Selection Field with React Hook Form integration
interface RoleFormFieldProps extends BaseFormFieldProps {
  disabled?: boolean;
  onChange?: (value: string) => void;
  value?: string;
  jobSeekerLabel?: string;
  recruiterLabel?: string;
}

export const RoleFormField = forwardRef<HTMLDivElement, RoleFormFieldProps>(
  (
    {
      label,
      description,
      className,
      required,
      disabled,
      onChange,
      value,
      jobSeekerLabel = "Job Seeker",
      recruiterLabel = "Recruiter",
    },
    ref
  ) => {
    return (
      <FormItem className={className}>
        {label && (
          <FormLabel>
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </FormLabel>
        )}
        <FormControl>
          <RadioGroup
            ref={ref}
            onValueChange={onChange}
            value={value}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            disabled={disabled}
          >
            <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
              <RadioGroupItem value="job_seeker" id="job_seeker" />
              <Label
                htmlFor="job_seeker"
                className="flex-1 cursor-pointer text-sm font-medium"
              >
                {jobSeekerLabel}
              </Label>
            </div>
            <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
              <RadioGroupItem value="recruiter" id="recruiter" />
              <Label
                htmlFor="recruiter"
                className="flex-1 cursor-pointer text-sm font-medium"
              >
                {recruiterLabel}
              </Label>
            </div>
          </RadioGroup>
        </FormControl>
        {description && <FormDescription>{description}</FormDescription>}
        <FormMessage />
      </FormItem>
    );
  }
);

RoleFormField.displayName = "RoleFormField";

// Textarea Field with React Hook Form integration
interface TextareaFormFieldProps extends BaseFormFieldProps {
  placeholder?: string;
  disabled?: boolean;
  rows?: number;
}

export const TextareaFormField = forwardRef<
  HTMLTextAreaElement,
  TextareaFormFieldProps
>(({ label, description, className, required, rows = 4, ...props }, ref) => {
  return (
    <FormItem className={className}>
      {label && (
        <FormLabel>
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </FormLabel>
      )}
      <FormControl>
        <Textarea ref={ref} rows={rows} className="resize-none" {...props} />
      </FormControl>
      {description && <FormDescription>{description}</FormDescription>}
      <FormMessage />
    </FormItem>
  );
});

TextareaFormField.displayName = "TextareaFormField";

// Checkbox Field with React Hook Form integration
interface CheckboxFormFieldProps extends BaseFormFieldProps {
  checked?: boolean;
  disabled?: boolean;
}

export const CheckboxFormField = forwardRef<
  HTMLButtonElement,
  CheckboxFormFieldProps
>(({ label, description, className, required, ...props }, ref) => {
  return (
    <FormItem className={className}>
      <div className="flex items-center space-x-2">
        <FormControl>
          <Checkbox ref={ref} {...props} />
        </FormControl>
        {label && (
          <FormLabel className="text-sm font-normal">
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </FormLabel>
        )}
      </div>
      {description && <FormDescription>{description}</FormDescription>}
      <FormMessage />
    </FormItem>
  );
});

CheckboxFormField.displayName = "CheckboxFormField";

// Select Field with React Hook Form integration
interface SelectFormFieldProps extends BaseFormFieldProps {
  options: { value: string; label: string }[];
  placeholder?: string;
  disabled?: boolean;
  onValueChange?: (value: string) => void;
}

export const SelectFormField = forwardRef<
  HTMLButtonElement,
  SelectFormFieldProps
>(
  (
    {
      label,
      description,
      className,
      required,
      options,
      placeholder = "Select...",
      onValueChange,
      ...props
    },
    ref
  ) => {
    return (
      <FormItem className={className}>
        {label && (
          <FormLabel>
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </FormLabel>
        )}
        <Select onValueChange={onValueChange} {...props}>
          <FormControl>
            <SelectTrigger ref={ref} className="h-11">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {description && <FormDescription>{description}</FormDescription>}
        <FormMessage />
      </FormItem>
    );
  }
);

SelectFormField.displayName = "SelectFormField";

// Radio Group Field with React Hook Form integration
interface RadioGroupFormFieldProps extends BaseFormFieldProps {
  options: { value: string; label: string; description?: string }[];
  disabled?: boolean;
  onValueChange?: (value: string) => void;
}

export const RadioGroupFormField = forwardRef<
  HTMLDivElement,
  RadioGroupFormFieldProps
>(
  (
    {
      label,
      description,
      className,
      required,
      options,
      onValueChange,
      ...props
    },
    ref
  ) => {
    return (
      <FormItem className={className}>
        {label && (
          <FormLabel>
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </FormLabel>
        )}
        <FormControl>
          <RadioGroup
            ref={ref}
            onValueChange={onValueChange}
            className="flex flex-col space-y-2"
            {...props}
          >
            {options.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label
                  htmlFor={option.value}
                  className="text-sm font-normal cursor-pointer"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </FormControl>
        {description && <FormDescription>{description}</FormDescription>}
        <FormMessage />
      </FormItem>
    );
  }
);

RadioGroupFormField.displayName = "RadioGroupFormField";
