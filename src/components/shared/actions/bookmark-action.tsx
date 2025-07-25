"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface BookmarkActionProps {
  isBookmarked?: boolean;
  onToggle?: () => void | Promise<void>;
  size?: "sm" | "md" | "lg";
  variant?: "ghost" | "outline" | "default";
  className?: string;
  disabled?: boolean;
  showText?: boolean;
}

/**
 * Reusable Bookmark Action Component
 * Handles bookmark/save functionality with consistent styling
 */
export function BookmarkAction({
  isBookmarked = false,
  onToggle,
  size = "md",
  variant = "ghost",
  className,
  disabled = false,
  showText = false,
}: BookmarkActionProps) {
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

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10", 
    lg: "w-12 h-12",
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  return (
    <Button
      variant={variant}
      size={showText ? "sm" : "icon"}
      className={cn(
        "transition-colors duration-200",
        !showText && sizeClasses[size],
        isBookmarked
          ? "text-blue-600 hover:text-blue-700 hover:bg-blue-50"
          : "text-gray-500 hover:text-gray-700 hover:bg-gray-50",
        isLoading && "opacity-50 cursor-not-allowed",
        className
      )}
      onClick={handleClick}
      disabled={disabled || isLoading}
    >
      <Bookmark
        className={cn(
          iconSizes[size],
          isBookmarked && "fill-current",
          showText && "mr-2"
        )}
      />
      {showText && (isBookmarked ? "Đã lưu" : "Lưu")}
    </Button>
  );
}

// Export with different variants for convenience
export const BookmarkIconButton = (props: Omit<BookmarkActionProps, 'showText'>) => (
  <BookmarkAction {...props} showText={false} />
);

export const BookmarkTextButton = (props: Omit<BookmarkActionProps, 'showText'>) => (
  <BookmarkAction {...props} showText={true} />
);
