"use client";

import { BaseCard, BaseCardSkeleton } from "./base-card";
import { Skeleton } from "./skeleton";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { cn } from "@/lib/utils";

// Job Card Skeleton
export function JobCardSkeleton({ className }: { className?: string }) {
  return (
    <BaseCard className={className}>
      <div className="flex items-start gap-3">
        {/* Company Logo Skeleton */}
        <Skeleton className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl flex-shrink-0" />

        {/* Job Details Skeleton */}
        <div className="flex-1 space-y-2">
          {/* Job Title */}
          <Skeleton className="h-5 w-3/4" />

          {/* Company Name */}
          <div className="hidden sm:flex items-center gap-2">
            <Skeleton className="w-4 h-4" />
            <Skeleton className="h-4 w-32" />
          </div>

          {/* Location and Time */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <Skeleton className="w-4 h-4" />
              <Skeleton className="h-4 w-20" />
            </div>
            <div className="flex items-center gap-1.5">
              <Skeleton className="w-4 h-4" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>

          {/* Salary */}
          <div className="flex items-center gap-1.5">
            <Skeleton className="w-4 h-4" />
            <Skeleton className="h-4 w-24" />
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-14 rounded-full" />
            <Skeleton className="h-6 w-12 rounded-full" />
          </div>
        </div>

        {/* Bookmark Button Skeleton */}
        <div className="hidden sm:block">
          <Skeleton className="w-10 h-10 rounded-lg" />
        </div>
      </div>
    </BaseCard>
  );
}

// Company Card Skeleton
export function CompanyCardSkeleton({
  variant = "grid",
  className,
}: {
  variant?: "grid" | "list";
  className?: string;
}) {
  const isGrid = variant === "grid";

  return (
    <BaseCard className={cn(isGrid ? "h-full" : "", className)}>
      <div className={cn(!isGrid && "flex items-center space-x-6")}>
        {/* Company Logo Skeleton */}
        <div className={cn("flex-shrink-0", isGrid ? "mb-4" : "")}>
          <Skeleton
            className={cn("rounded-lg", isGrid ? "w-16 h-16" : "w-12 h-12")}
          />
        </div>

        {/* Company Details Skeleton */}
        <div className="flex-1 space-y-3">
          {/* Company Name */}
          <Skeleton className="h-6 w-3/4" />

          {/* Description */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>

          {/* Location and Size */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <Skeleton className="w-4 h-4" />
              <Skeleton className="h-4 w-20" />
            </div>
            <div className="flex items-center gap-1.5">
              <Skeleton className="w-4 h-4" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="w-4 h-4" />
              ))}
            </div>
            <Skeleton className="h-4 w-12" />
          </div>

          {/* Industry Badge and Job Count */}
          <div
            className={cn(
              "flex items-center justify-between",
              isGrid ? "flex-col items-start space-y-2" : ""
            )}
          >
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-4 w-24" />
          </div>

          {/* Actions */}
          <div className={cn("flex gap-2", isGrid ? "pt-2" : "")}>
            <Skeleton className="h-9 flex-1" />
            <Skeleton className="h-9 w-12" />
          </div>
        </div>
      </div>
    </BaseCard>
  );
}

// Application Card Skeleton
export function ApplicationCardSkeleton({ className }: { className?: string }) {
  return (
    <BaseCard className={className}>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1">
            <Skeleton className="w-12 h-12 rounded-lg flex-shrink-0" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>

        {/* Details */}
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <Skeleton className="w-4 h-4" />
              <Skeleton className="h-4 w-20" />
            </div>
            <div className="flex items-center gap-1.5">
              <Skeleton className="w-4 h-4" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-20" />
        </div>
      </div>
    </BaseCard>
  );
}

// List Loading State
interface ListLoadingStateProps {
  count?: number;
  renderSkeleton: () => React.ReactNode;
  className?: string;
}

export function ListLoadingState({
  count = 6,
  renderSkeleton,
  className,
}: ListLoadingStateProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {[...Array(count)].map((_, index) => (
        <div key={index}>{renderSkeleton()}</div>
      ))}
    </div>
  );
}

// Grid Loading State
interface GridLoadingStateProps {
  count?: number;
  renderSkeleton: () => React.ReactNode;
  columns?: number;
  className?: string;
}

export function GridLoadingState({
  count = 6,
  renderSkeleton,
  columns = 3,
  className,
}: GridLoadingStateProps) {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  };

  return (
    <div
      className={cn(
        "grid gap-4",
        gridCols[columns as keyof typeof gridCols],
        className
      )}
    >
      {[...Array(count)].map((_, index) => (
        <div key={index}>{renderSkeleton()}</div>
      ))}
    </div>
  );
}

// Page Loading State
export function PageLoadingState() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <LoadingSpinner size="lg" text="Đang tải..." />
    </div>
  );
}
