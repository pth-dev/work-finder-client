import React from 'react';
import { cn } from '@/utils';

export interface CompanyLogoProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  fallback?: React.ReactNode;
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12', 
  lg: 'w-16 h-16'
};

export const CompanyLogo = React.forwardRef<HTMLDivElement, CompanyLogoProps>(
  ({ src, alt, size = 'md', className, fallback, ...props }, ref) => {
    const [imageError, setImageError] = React.useState(false);

    const handleImageError = () => {
      setImageError(true);
    };

    if (!src || imageError) {
      return (
        <div 
          ref={ref}
          className={cn(
            "bg-[#ECEDF2] rounded-lg flex items-center justify-center flex-shrink-0",
            sizeClasses[size],
            className
          )}
          {...props}
        >
          {fallback || (
            <div className="w-1/2 h-1/2 bg-gray-400 rounded opacity-50" />
          )}
        </div>
      );
    }

    return (
      <div 
        ref={ref}
        className={cn(
          "rounded-lg overflow-hidden flex-shrink-0 border border-[#ECEDF2]",
          sizeClasses[size],
          className
        )}
        {...props}
      >
        <img
          src={src}
          alt={alt}
          onError={handleImageError}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }
);

CompanyLogo.displayName = "CompanyLogo";