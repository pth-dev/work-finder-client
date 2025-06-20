import React from "react";
import { Loader2 } from "lucide-react";
import { Skeleton } from "./skeleton";
import { cn } from "@/lib/utils";

interface LoadingProps {
  size?: "sm" | "md" | "lg";
  tip?: string;
  spinning?: boolean;
  children?: React.ReactNode;
  type?: "spin" | "skeleton";
  skeletonProps?: {
    rows?: number;
    avatar?: boolean;
    title?: boolean;
    active?: boolean;
  };
}

// Size classes for the spinner
const sizeClasses = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8",
};

const Loading: React.FC<LoadingProps> = ({
  size = "md",
  tip,
  spinning = true,
  children,
  type = "spin",
  skeletonProps = {},
}) => {
  if (type === "skeleton") {
    if (!spinning && children) {
      return <>{children}</>;
    }

    const rows = skeletonProps.rows || 4;
    return (
      <div className="space-y-3">
        {skeletonProps.avatar && (
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        )}
        {skeletonProps.title && <Skeleton className="h-4 w-[250px]" />}
        <div className="space-y-2">
          {Array.from({ length: rows }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (children) {
    return (
      <div className="relative">
        {spinning && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-2">
              <Loader2 className={cn("animate-spin", sizeClasses[size])} />
              {tip && (
                <span className="text-sm text-muted-foreground">{tip}</span>
              )}
            </div>
          </div>
        )}
        {children}
      </div>
    );
  }

  return (
    <div className="loading-container">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className={cn("animate-spin", sizeClasses[size])} />
        {tip && <span className="text-sm text-muted-foreground">{tip}</span>}
      </div>
    </div>
  );
};

// Specialized loading components
export const PageLoading: React.FC<{ tip?: string }> = ({
  tip = "Loading...",
}) => (
  <div className="h-screen flex items-center justify-center">
    <Loading size="lg" tip={tip} />
  </div>
);

export const ContentLoading: React.FC<{ tip?: string }> = ({
  tip = "Loading...",
}) => (
  <div className="min-h-[200px] flex items-center justify-center">
    <Loading tip={tip} />
  </div>
);

export const InlineLoading: React.FC<{ tip?: string }> = ({ tip }) => (
  <Loading size="sm" tip={tip} />
);

export const SkeletonLoading: React.FC<{
  rows?: number;
  avatar?: boolean;
  title?: boolean;
  active?: boolean;
}> = ({ rows = 4, avatar = false, title = true, active = true }) => (
  <Loading type="skeleton" skeletonProps={{ rows, avatar, title, active }} />
);

export default Loading;
