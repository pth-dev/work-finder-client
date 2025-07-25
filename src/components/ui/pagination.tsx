"use client";

import { memo } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  variant?: "dots" | "numbered" | "simple";
  size?: "sm" | "lg" | "default";
  showPrevNext?: boolean;
  showFirstLast?: boolean;
  maxVisiblePages?: number;
  className?: string;
}

/**
 * Flexible Pagination Component
 * Supports dots (for carousels), numbered (for listings), and simple (prev/next only)
 */
export const Pagination = memo(
  ({
    currentPage,
    totalPages,
    onPageChange,
    variant = "numbered",
    size = "default",
    showPrevNext = true,
    showFirstLast = false,
    maxVisiblePages = 7,
    className,
  }: PaginationProps) => {
    if (totalPages <= 1) return null;

    const sizeClasses = {
      sm: "h-8 w-8 text-sm",
      default: "h-10 w-10 text-sm",
      lg: "h-12 w-12 text-base",
    };

    const dotSizeClasses = {
      sm: "h-2 w-2",
      default: "h-3 w-3",
      lg: "h-4 w-4",
    };

    // Dots variant - Simple dots for carousels/galleries
    if (variant === "dots") {
      return (
        <div
          className={cn("flex items-center justify-center gap-2", className)}
        >
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={cn(
                "rounded-full transition-all duration-200",
                dotSizeClasses[size],
                page === currentPage
                  ? "bg-[#1967d2]"
                  : "bg-gray-300 hover:bg-gray-400"
              )}
              aria-label={`Go to page ${page}`}
              aria-current={page === currentPage ? "page" : undefined}
            />
          ))}
        </div>
      );
    }

    // Simple variant - Just prev/next buttons
    if (variant === "simple") {
      return (
        <div className={cn("flex items-center justify-between", className)}>
          <Button
            variant="outline"
            size={size}
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          <span className="text-sm text-[#696969]">
            Page {currentPage} of {totalPages}
          </span>

          <Button
            variant="outline"
            size={size}
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="flex items-center gap-2"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      );
    }

    // Numbered variant - Full pagination with numbers
    const getVisiblePages = () => {
      const pages: (number | "ellipsis")[] = [];

      if (totalPages <= maxVisiblePages) {
        // Show all pages if total is small
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Complex logic for large page counts
        const halfVisible = Math.floor(maxVisiblePages / 2);

        if (currentPage <= halfVisible + 1) {
          // Near beginning
          for (let i = 1; i <= maxVisiblePages - 2; i++) {
            pages.push(i);
          }
          pages.push("ellipsis");
          pages.push(totalPages);
        } else if (currentPage >= totalPages - halfVisible) {
          // Near end
          pages.push(1);
          pages.push("ellipsis");
          for (let i = totalPages - maxVisiblePages + 3; i <= totalPages; i++) {
            pages.push(i);
          }
        } else {
          // Middle
          pages.push(1);
          pages.push("ellipsis");
          for (
            let i = currentPage - halfVisible + 2;
            i <= currentPage + halfVisible - 2;
            i++
          ) {
            pages.push(i);
          }
          pages.push("ellipsis");
          pages.push(totalPages);
        }
      }

      return pages;
    };

    const visiblePages = getVisiblePages();

    return (
      <nav
        className={cn("flex items-center justify-center gap-1", className)}
        aria-label="Pagination"
      >
        {/* First page button */}
        {showFirstLast && currentPage > 1 && (
          <Button
            variant="outline"
            size={size}
            onClick={() => onPageChange(1)}
            className={sizeClasses[size]}
            aria-label="Go to first page"
          >
            1
          </Button>
        )}

        {/* Previous button */}
        {showPrevNext && (
          <Button
            variant="outline"
            size={size}
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className={cn(sizeClasses[size], "px-3")}
            aria-label="Go to previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        )}

        {/* Page numbers */}
        {visiblePages.map((page, index) =>
          page === "ellipsis" ? (
            <div
              key={`ellipsis-${index}`}
              className={cn(
                "flex items-center justify-center",
                sizeClasses[size]
              )}
            >
              <MoreHorizontal className="h-4 w-4 text-[#696969]" />
            </div>
          ) : (
            <Button
              key={page}
              variant={page === currentPage ? "primary" : "outline"}
              size={size}
              onClick={() => onPageChange(page)}
              className={cn(
                sizeClasses[size],
                page === currentPage &&
                  "bg-[#1967d2] hover:bg-[#0146a6] text-white border-[#1967d2]"
              )}
              aria-label={`Go to page ${page}`}
              aria-current={page === currentPage ? "page" : undefined}
            >
              {page}
            </Button>
          )
        )}

        {/* Next button */}
        {showPrevNext && (
          <Button
            variant="outline"
            size={size}
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className={cn(sizeClasses[size], "px-3")}
            aria-label="Go to next page"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}

        {/* Last page button */}
        {showFirstLast && currentPage < totalPages && (
          <Button
            variant="outline"
            size={size}
            onClick={() => onPageChange(totalPages)}
            className={sizeClasses[size]}
            aria-label="Go to last page"
          >
            {totalPages}
          </Button>
        )}
      </nav>
    );
  }
);

Pagination.displayName = "Pagination";
