"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface BookmarkButtonProps {
  jobId: string;
  isBookmarked: boolean;
  onBookmark?: (id: string, bookmarked: boolean) => void;
}

export function BookmarkButton({
  jobId,
  isBookmarked: initialBookmarked = false,
  onBookmark,
}: BookmarkButtonProps) {
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);
  const [isLoading, setIsLoading] = useState(false);

  const toggleBookmark = async () => {
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 300));

      const newBookmarkState = !isBookmarked;
      setIsBookmarked(newBookmarkState);

      onBookmark?.(jobId, newBookmarkState);

      toast.success(
        newBookmarkState
          ? "Job added to bookmarks"
          : "Job removed from bookmarks"
      );
    } catch (error) {
      toast.error("Failed to update bookmark");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleBookmark}
      disabled={isLoading}
      className="absolute top-3 right-3 text-[#696969] hover:text-[#202124]"
    >
      <Bookmark
        className={cn("h-4 w-4", isBookmarked && "fill-current text-[#1967D2]")}
      />
    </Button>
  );
}
