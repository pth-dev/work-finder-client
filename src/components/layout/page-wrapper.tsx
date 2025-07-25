"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// Page container variants
export type PageContainerVariant = "default" | "centered" | "wide" | "narrow";
export type PageContainerPadding = "none" | "sm" | "md" | "lg";

interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: PageContainerVariant;
  padding?: PageContainerPadding;
  maxWidth?: string;
  children: React.ReactNode;
}

/**
 * PageContainer - Consistent page layout container following Next.js App Router conventions
 * Provides responsive design and consistent spacing across all pages
 */
export const PageContainer = React.forwardRef<
  HTMLDivElement,
  PageContainerProps
>(
  (
    {
      className,
      variant = "default",
      padding = "md",
      maxWidth,
      children,
      ...props
    },
    ref
  ) => {
    const containerVariants = {
      default: "mx-auto px-4 sm:px-6 lg:px-8",
      centered: "mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center",
      wide: "mx-auto px-4 sm:px-6 lg:px-12 xl:px-16",
      narrow: "mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl",
    };

    const paddingVariants = {
      none: "",
      sm: "py-4",
      md: "py-6 lg:py-8",
      lg: "py-8 lg:py-12",
    };

    const maxWidthClass = maxWidth ? `max-w-${maxWidth}` : "max-w-7xl";

    return (
      <div
        ref={ref}
        className={cn(
          containerVariants[variant],
          paddingVariants[padding],
          !maxWidth && maxWidthClass,
          className
        )}
        style={maxWidth ? { maxWidth } : undefined}
        {...props}
      >
        {children}
      </div>
    );
  }
);

PageContainer.displayName = "PageContainer";

// Grid layout component
interface PageGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  cols?: 1 | 2 | 3 | 4 | 6 | 12;
  gap?: "none" | "sm" | "md" | "lg";
  responsive?: boolean;
}

export const ResponsiveGrid = React.forwardRef<HTMLDivElement, PageGridProps>(
  (
    { className, children, cols = 1, gap = "md", responsive = true, ...props },
    ref
  ) => {
    const colsVariants = {
      1: "grid-cols-1",
      2: responsive ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-2",
      3: responsive
        ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        : "grid-cols-3",
      4: responsive
        ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        : "grid-cols-4",
      6: responsive
        ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6"
        : "grid-cols-6",
      12: responsive
        ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-12"
        : "grid-cols-12",
    };

    const gapVariants = {
      none: "gap-0",
      sm: "gap-3",
      md: "gap-4 lg:gap-6",
      lg: "gap-6 lg:gap-8",
    };

    return (
      <div
        ref={ref}
        className={cn("grid", colsVariants[cols], gapVariants[gap], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ResponsiveGrid.displayName = "ResponsiveGrid";

// Export all components
export { PageContainer as default };
