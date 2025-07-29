import React from 'react'
import { useFormContext, FieldPath, FieldValues } from 'react-hook-form'
import { cn } from '@/shared/utils'
import { Label } from '@/shared/components/atoms'

interface FormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  name: TName
  label?: string
  description?: string
  required?: boolean
  children: (field: {
    value: any
    onChange: (value: any) => void
    onBlur: () => void
    name: TName
    error?: string
    invalid: boolean
  }) => React.ReactNode
  className?: string
}

export function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  label,
  description,
  required,
  children,
  className,
}: FormFieldProps<TFieldValues, TName>) {
  const {
    formState: { errors },
    watch,
    setValue,
    trigger,
  } = useFormContext<TFieldValues>()

  const error = errors[name]?.message as string | undefined
  const value = watch(name)

  const handleChange = (newValue: any) => {
    setValue(name, newValue, { shouldValidate: true, shouldDirty: true })
    trigger(name)
  }

  const handleBlur = () => {
    trigger(name)
  }

  const fieldProps = {
    value,
    onChange: handleChange,
    onBlur: handleBlur,
    name,
    error,
    invalid: !!error,
  }

  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <Label htmlFor={name} className="text-sm font-medium text-gray-900">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}
      
      {description && (
        <p className="text-sm text-gray-600">{description}</p>
      )}
      
      <div className="space-y-1">
        {children(fieldProps)}
        
        {error && (
          <p className="text-sm text-red-600 flex items-center gap-1">
            <svg 
              className="h-4 w-4 flex-shrink-0" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path 
                fillRule="evenodd" 
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" 
                clipRule="evenodd" 
              />
            </svg>
            {error}
          </p>
        )}
      </div>
    </div>
  )
}

// Specialized form field components
interface FormInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<FormFieldProps<TFieldValues, TName>, 'children'> {
  type?: 'text' | 'email' | 'password' | 'tel' | 'url' | 'number'
  placeholder?: string
  autoComplete?: string
  disabled?: boolean
}

export function FormInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  type = 'text',
  placeholder,
  autoComplete,
  disabled,
  ...props
}: FormInputProps<TFieldValues, TName>) {
  return (
    <FormField {...props}>
      {({ value, onChange, onBlur, name, invalid }) => (
        <input
          id={name}
          name={name}
          type={type}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          autoComplete={autoComplete}
          disabled={disabled}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            invalid && 'border-red-500 focus-visible:ring-red-500'
          )}
        />
      )}
    </FormField>
  )
}

interface FormTextareaProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<FormFieldProps<TFieldValues, TName>, 'children'> {
  placeholder?: string
  rows?: number
  disabled?: boolean
}

export function FormTextarea<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  placeholder,
  rows = 3,
  disabled,
  ...props
}: FormTextareaProps<TFieldValues, TName>) {
  return (
    <FormField {...props}>
      {({ value, onChange, onBlur, name, invalid }) => (
        <textarea
          id={name}
          name={name}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          rows={rows}
          disabled={disabled}
          className={cn(
            'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            invalid && 'border-red-500 focus-visible:ring-red-500'
          )}
        />
      )}
    </FormField>
  )
}

interface FormCheckboxProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<FormFieldProps<TFieldValues, TName>, 'children' | 'label'> {
  label: string
  disabled?: boolean
}

export function FormCheckbox<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  label,
  disabled,
  ...props
}: FormCheckboxProps<TFieldValues, TName>) {
  return (
    <FormField {...props}>
      {({ value, onChange, onBlur, name, invalid }) => (
        <div className="flex items-center space-x-2">
          <input
            id={name}
            name={name}
            type="checkbox"
            checked={value || false}
            onChange={(e) => onChange(e.target.checked)}
            onBlur={onBlur}
            disabled={disabled}
            className={cn(
              'h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500',
              invalid && 'border-red-500 focus:ring-red-500'
            )}
          />
          <Label 
            htmlFor={name} 
            className={cn(
              'text-sm font-normal cursor-pointer',
              disabled && 'cursor-not-allowed opacity-50'
            )}
          >
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </Label>
        </div>
      )}
    </FormField>
  )
}