import React from "react";
import { cn } from "@/utils";

export interface CompanyLogoProps {
  src?: string;
  alt?: string;
  companyName?: string;
  fallbackText?: string;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "square" | "rounded" | "circle";
  className?: string;
  fallback?: React.ReactNode;
}

const sizeClasses = {
  sm: "w-8 h-8 text-xs",
  md: "w-12 h-12 text-sm",
  lg: "w-16 h-16 text-lg",
  xl: "w-20 h-20 text-xl",
};

const variantClasses = {
  square: "rounded-none",
  rounded: "rounded-lg",
  circle: "rounded-full",
};

export const CompanyLogo = React.forwardRef<HTMLDivElement, CompanyLogoProps>(
  (
    {
      src,
      alt,
      companyName,
      fallbackText,
      size = "md",
      variant = "rounded",
      className,
      fallback,
      ...props
    },
    ref
  ) => {
    const [imageError, setImageError] = React.useState(false);

    const handleImageError = () => {
      setImageError(true);
    };

    // Generate initials from companyName or fallbackText
    const getInitials = () => {
      const name = companyName || fallbackText || alt || "";
      return name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    };

    const initials = getInitials();

    if (!src || imageError) {
      return (
        <div
          ref={ref}
          className={cn(
            "bg-[#1967D2]/10 flex items-center justify-center flex-shrink-0 text-[#1967D2] font-semibold",
            sizeClasses[size],
            variantClasses[variant],
            className
          )}
          {...props}
        >
          {fallback || initials || (
            <div className="w-1/2 h-1/2 bg-gray-400 rounded opacity-50" />
          )}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          "overflow-hidden flex-shrink-0 border border-[#ECEDF2]",
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        {...props}
      >
        <img
          src={src}
          alt={alt || `${companyName || "Company"} logo`}
          onError={handleImageError}
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </div>
    );
  }
);

CompanyLogo.displayName = "CompanyLogo";
