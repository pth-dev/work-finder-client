import * as React from 'react';
import { Label } from './label';
import { cn } from '@/utils';

interface FieldWrapperProps {
  label?: string;
  className?: string;
  children: React.ReactNode;
  error?: string;
  description?: string;
  required?: boolean;
}

export const FieldWrapper = ({
  label,
  className,
  children,
  error,
  description,
  required,
}: FieldWrapperProps) => {
  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}
      {children}
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      {error && (
        <p className="text-sm font-medium text-destructive">{error}</p>
      )}
    </div>
  );
};
