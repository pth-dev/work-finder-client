"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Send, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ApplyActionProps {
  hasApplied?: boolean;
  onApply?: () => void | Promise<void>;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "outline" | "secondary";
  className?: string;
  disabled?: boolean;
  showIcon?: boolean;
  children?: React.ReactNode;
}

/**
 * Reusable Apply Action Component
 * Handles job application functionality with consistent styling
 */
export function ApplyAction({
  hasApplied = false,
  onApply,
  size = "md",
  variant = "primary",
  className,
  disabled = false,
  showIcon = true,
  children,
}: ApplyActionProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (disabled || isLoading || hasApplied || !onApply) return;

    try {
      setIsLoading(true);
      await onApply();
    } catch (error) {
      toast.error("Ứng tuyển thất bại. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const getButtonText = () => {
    if (children) return children;
    if (isLoading) return "Đang ứng tuyển...";
    if (hasApplied) return "Đã ứng tuyển";
    return "Ứng tuyển";
  };

  const getIcon = () => {
    if (!showIcon) return null;

    if (hasApplied) {
      return <Check className={cn(iconSizes[size], "mr-2")} />;
    }

    return <Send className={cn(iconSizes[size], "mr-2")} />;
  };

  return (
    <Button
      variant={hasApplied ? "secondary" : variant}
      size={size}
      className={cn(
        "transition-all duration-200",
        hasApplied && "cursor-default",
        isLoading && "opacity-50 cursor-not-allowed",
        className
      )}
      onClick={handleClick}
      disabled={disabled || isLoading || hasApplied}
    >
      {getIcon()}
      {getButtonText()}
    </Button>
  );
}

// Preset variants for common use cases
export const ApplyButton = (props: Omit<ApplyActionProps, "variant">) => (
  <ApplyAction {...props} variant="primary" />
);

export const ApplyOutlineButton = (
  props: Omit<ApplyActionProps, "variant">
) => <ApplyAction {...props} variant="outline" />;

export const QuickApplyButton = (
  props: Omit<ApplyActionProps, "size" | "showIcon">
) => (
  <ApplyAction {...props} size="sm" showIcon={false}>
    Ứng tuyển nhanh
  </ApplyAction>
);
