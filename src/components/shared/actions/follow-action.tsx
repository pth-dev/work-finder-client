"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserPlus, UserCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface FollowActionProps {
  isFollowing?: boolean;
  onToggle?: () => void | Promise<void>;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "outline" | "ghost";
  className?: string;
  disabled?: boolean;
  showIcon?: boolean;
  followText?: string;
  followingText?: string;
}

/**
 * Reusable Follow Action Component
 * Handles follow/unfollow functionality with consistent styling
 */
export function FollowAction({
  isFollowing = false,
  onToggle,
  size = "md",
  variant = "outline",
  className,
  disabled = false,
  showIcon = true,
  followText = "Theo dõi",
  followingText = "Đang theo dõi",
}: FollowActionProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (disabled || isLoading || !onToggle) return;

    try {
      setIsLoading(true);
      await onToggle();
    } catch (error) {
      toast.error("Thao tác thất bại. Vui lòng thử lại.");
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
    if (isLoading)
      return isFollowing ? "Đang bỏ theo dõi..." : "Đang theo dõi...";
    return isFollowing ? followingText : followText;
  };

  const getIcon = () => {
    if (!showIcon) return null;

    const IconComponent = isFollowing ? UserCheck : UserPlus;
    return <IconComponent className={cn(iconSizes[size], "mr-2")} />;
  };

  return (
    <Button
      variant={isFollowing ? "secondary" : variant}
      size={size}
      className={cn(
        "transition-all duration-200",
        isFollowing &&
          "hover:bg-red-50 hover:text-red-600 hover:border-red-200",
        isLoading && "opacity-50 cursor-not-allowed",
        className
      )}
      onClick={handleClick}
      disabled={disabled || isLoading}
    >
      {getIcon()}
      {getButtonText()}
    </Button>
  );
}

// Preset variants for common use cases
export const FollowButton = (props: Omit<FollowActionProps, "variant">) => (
  <FollowAction {...props} variant="primary" />
);

export const FollowOutlineButton = (
  props: Omit<FollowActionProps, "variant">
) => <FollowAction {...props} variant="outline" />;

export const FollowGhostButton = (
  props: Omit<FollowActionProps, "variant">
) => <FollowAction {...props} variant="ghost" />;

export const CompactFollowButton = (
  props: Omit<FollowActionProps, "size" | "showIcon">
) => <FollowAction {...props} size="sm" showIcon={false} />;
