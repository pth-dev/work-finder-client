import React from "react";
import {
  useForm,
  FormProvider,
  useFormContext,
  FieldValues,
  UseFormProps,
  UseFormReturn,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodType } from "zod";
import { cn } from "@/shared/utils";
import { Button } from "@/shared/components/atoms";

// Type helper for Zod schemas in forms
type FormSchema<T = any> = ZodType<T, any, any>;

interface FormProps<TFieldValues extends FieldValues = FieldValues>
  extends Omit<
    React.FormHTMLAttributes<HTMLFormElement>,
    "onSubmit" | "children"
  > {
  schema?: FormSchema<TFieldValues>;
  defaultValues?: UseFormProps<TFieldValues>["defaultValues"];
  onSubmit: (data: TFieldValues) => Promise<void> | void;
  children:
    | React.ReactNode
    | ((methods: UseFormReturn<TFieldValues>) => React.ReactNode);
  mode?: UseFormProps<TFieldValues>["mode"];
  resetOnSubmit?: boolean;
}

export function Form<TFieldValues extends FieldValues = FieldValues>({
  schema,
  defaultValues,
  onSubmit,
  children,
  mode = "onChange",
  resetOnSubmit = false,
  className,
  ...props
}: FormProps<TFieldValues>) {
  const methods = useForm<TFieldValues>({
    resolver: schema ? zodResolver(schema) : undefined,
    defaultValues,
    mode,
  });

  const {
    handleSubmit,
    reset,
  } = methods;

  const handleFormSubmit = async (data: TFieldValues) => {
    try {
      await onSubmit(data);
      if (resetOnSubmit) {
        reset();
      }
    } catch (error) {
      // Handle submission errors - could be expanded to show toast notifications
      console.error("Form submission error:", error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className={cn("space-y-6", className)}
        {...props}
      >
        {typeof children === "function" ? children(methods) : children}
      </form>
    </FormProvider>
  );
}

// Form sections for better organization
interface FormSectionProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function FormSection({
  title,
  description,
  children,
  className,
}: FormSectionProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {(title || description) && (
        <div className="space-y-1">
          {title && (
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          )}
          {description && (
            <p className="text-sm text-gray-600">{description}</p>
          )}
        </div>
      )}
      <div className="space-y-4">{children}</div>
    </div>
  );
}

// Form actions for consistent button layouts
interface FormActionsProps {
  children: React.ReactNode;
  className?: string;
  align?: "left" | "center" | "right";
}

export function FormActions({
  children,
  className,
  align = "right",
}: FormActionsProps) {
  return (
    <div
      className={cn(
        "flex gap-3 pt-4 border-t",
        {
          "justify-start": align === "left",
          "justify-center": align === "center",
          "justify-end": align === "right",
        },
        className
      )}
    >
      {children}
    </div>
  );
}

// Submit button with loading state
interface FormSubmitButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loadingText?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg";
}

export function FormSubmitButton({
  children,
  loadingText = "Submitting...",
  disabled,
  variant = "default",
  size = "default",
  ...props
}: FormSubmitButtonProps) {
  const { formState } = useFormContext();
  const isSubmitting = formState.isSubmitting;

  return (
    <Button
      type="submit"
      disabled={disabled || isSubmitting}
      variant={variant}
      size={size}
      {...props}
    >
      {isSubmitting ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          {loadingText}
        </>
      ) : (
        children
      )}
    </Button>
  );
}

// Cancel button
interface FormCancelButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onCancel?: () => void;
}

export function FormCancelButton({
  children = "Cancel",
  onCancel,
  ...props
}: FormCancelButtonProps) {
  return (
    <Button type="button" variant="outline" onClick={onCancel} {...props}>
      {children}
    </Button>
  );
}
