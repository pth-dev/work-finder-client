"use client";

import { forwardRef } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Base Card Props
interface BaseCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  featured?: boolean;
  urgent?: boolean;
  interactive?: boolean;
  variant?: "default" | "elevated" | "outlined" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

// Card variants
const cardVariants = {
  default: "bg-white border border-gray-200 shadow-sm",
  elevated: "bg-white border border-gray-200 shadow-md",
  outlined: "bg-white border-2 border-gray-300 shadow-none",
  ghost: "bg-transparent border-none shadow-none",
};

// Card sizes
const cardSizes = {
  sm: "p-3",
  md: "p-4 sm:p-6",
  lg: "p-6 sm:p-8",
};

/**
 * BaseCard - Composition-based card component
 * Extends shadcn/ui Card with consistent styling and interaction patterns
 */
export const BaseCard = forwardRef<HTMLDivElement, BaseCardProps>(
  (
    {
      children,
      className,
      featured = false,
      urgent = false,
      interactive = false,
      variant = "default",
      size = "md",
      loading = false,
      onClick,
      ...props
    },
    ref
  ) => {
    return (
      <Card
        ref={ref}
        className={cn(
          // Base styles
          "w-full rounded-xl transition-all duration-200",

          // Variant styles
          cardVariants[variant],

          // Interactive styles
          interactive && [
            "cursor-pointer",
            "hover:shadow-lg hover:-translate-y-0.5",
            "active:translate-y-0 active:shadow-md",
          ],

          // Featured styles
          featured && [
            "ring-2 ring-blue-500/20",
            "border-blue-200",
            "bg-gradient-to-br from-blue-50/50 to-white",
          ],

          // Urgent styles
          urgent && [
            "ring-2 ring-red-500/20",
            "border-red-200",
            "bg-gradient-to-br from-red-50/50 to-white",
          ],

          // Loading styles
          loading && "animate-pulse",

          className
        )}
        onClick={interactive ? onClick : undefined}
        {...props}
      >
        <div className={cn(cardSizes[size])}>{children}</div>
      </Card>
    );
  }
);

BaseCard.displayName = "BaseCard";

// Card Header Component
interface BaseCardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const BaseCardHeader = forwardRef<HTMLDivElement, BaseCardHeaderProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <CardHeader
        ref={ref}
        className={cn("pb-2 px-0 pt-0", className)}
        {...props}
      >
        {children}
      </CardHeader>
    );
  }
);

BaseCardHeader.displayName = "BaseCardHeader";

// Card Content Component
interface BaseCardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const BaseCardContent = forwardRef<HTMLDivElement, BaseCardContentProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <CardContent ref={ref} className={cn("px-0 pb-0", className)} {...props}>
        {children}
      </CardContent>
    );
  }
);

BaseCardContent.displayName = "BaseCardContent";

// Card Footer Component
interface BaseCardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const BaseCardFooter = forwardRef<HTMLDivElement, BaseCardFooterProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("pt-4 mt-4 border-t border-gray-100", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

BaseCardFooter.displayName = "BaseCardFooter";

// Card Actions Component
interface BaseCardActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  align?: "left" | "center" | "right" | "between";
}

export const BaseCardActions = forwardRef<HTMLDivElement, BaseCardActionsProps>(
  ({ children, className, align = "right", ...props }, ref) => {
    const alignmentClasses = {
      left: "justify-start",
      center: "justify-center",
      right: "justify-end",
      between: "justify-between",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center gap-2 pt-3",
          alignmentClasses[align],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

BaseCardActions.displayName = "BaseCardActions";

// Card Badge Component
interface BaseCardBadgeProps {
  children: React.ReactNode;
  variant?: "default" | "featured" | "urgent" | "success" | "warning";
  className?: string;
}

export const BaseCardBadge = ({
  children,
  variant = "default",
  className,
}: BaseCardBadgeProps) => {
  const badgeVariants = {
    default: "bg-gray-100 text-gray-700",
    featured: "bg-blue-100 text-blue-700",
    urgent: "bg-red-100 text-red-700",
    success: "bg-green-100 text-green-700",
    warning: "bg-yellow-100 text-yellow-700",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
        badgeVariants[variant],
        className
      )}
    >
      {children}
    </span>
  );
};

// Card Loading Skeleton
export const BaseCardSkeleton = ({ className }: { className?: string }) => {
  return (
    <BaseCard loading className={className}>
      <BaseCardHeader>
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse" />
            <div className="h-3 bg-gray-200 rounded w-2/3 animate-pulse" />
          </div>
        </div>
      </BaseCardHeader>
      <BaseCardContent>
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded animate-pulse" />
          <div className="h-3 bg-gray-200 rounded w-3/4 animate-pulse" />
        </div>
      </BaseCardContent>
      <BaseCardActions>
        <div className="h-8 w-16 bg-gray-200 rounded animate-pulse" />
        <div className="h-8 w-16 bg-gray-200 rounded animate-pulse" />
      </BaseCardActions>
    </BaseCard>
  );
};

// Export all components
export { BaseCard as default };
