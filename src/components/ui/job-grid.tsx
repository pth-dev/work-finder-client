import React from 'react';
import { cn } from '@/utils';

export interface JobGridProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4;
  className?: string;
}

const columnClasses = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
};

export const JobGrid = React.forwardRef<HTMLDivElement, JobGridProps>(
  ({ children, columns = 2, className, ...props }, ref) => {
    return (
      <div 
        ref={ref}
        className={cn(
          "grid gap-6",
          columnClasses[columns],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

JobGrid.displayName = "JobGrid";

// Job Card Skeleton - Pure UI Loading Component
export const JobCardSkeleton = React.forwardRef<HTMLDivElement, { className?: string }>(
  ({ className, ...props }, ref) => {
    return (
      <div 
        ref={ref}
        className={cn(
          "border border-[#ECEDF2] rounded-lg bg-white min-h-[156px] p-4",
          className
        )}
        {...props}
      >
        <div className="flex gap-4">
          {/* Logo skeleton */}
          <div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse flex-shrink-0" />
          
          {/* Content skeleton */}
          <div className="flex-1 space-y-3">
            {/* Title */}
            <div className="h-5 bg-gray-200 rounded animate-pulse w-3/4" />
            
            {/* Meta info */}
            <div className="flex gap-4">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-20" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-24" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-16" />
            </div>
            
            {/* Tags */}
            <div className="flex gap-2">
              <div className="h-6 bg-gray-200 rounded-full animate-pulse w-16" />
              <div className="h-6 bg-gray-200 rounded-full animate-pulse w-12" />
              <div className="h-6 bg-gray-200 rounded-full animate-pulse w-20" />
            </div>
          </div>
          
          {/* Bookmark skeleton */}
          <div className="w-4 h-4 bg-gray-200 rounded animate-pulse flex-shrink-0" />
        </div>
      </div>
    );
  }
);

JobCardSkeleton.displayName = "JobCardSkeleton";