"use client";

import { memo } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, DollarSign, Bookmark, Package } from "lucide-react";
import {
  BaseCard,
  BaseCardHeader,
  BaseCardActions,
  BaseCardBadge,
} from "@/components/ui/base-card";
import type { Job } from "@/types/job";
import { cn } from "@/lib/utils";

interface JobCardProps {
  job: Job;
  className?: string;
  onBookmark?: (jobId: string) => void;
  onApply?: (jobId: string) => void;
  onViewDetails?: (jobId: string) => void;
  variant?: "grid" | "list";
  isMobile?: boolean;
}

/**
 * JobCard component matching exact design specifications
 */
export const JobCard = memo(
  ({ job, className, onBookmark, onViewDetails }: JobCardProps) => {
    // Helper functions
    const formatSalary = (salary: Job["salary"]) => {
      const { min, max, currency } = salary;
      if (min && max) {
        if (currency === "USD") {
          return `$${(min / 1000).toFixed(0)}k - $${(max / 1000).toFixed(0)}k`;
        }
        return `${(min / 1000000).toFixed(0)} - ${(max / 1000000).toFixed(
          0
        )} triệu`;
      }
      if (min) {
        if (currency === "USD") {
          return `$${(min / 1000).toFixed(0)}k+`;
        }
        return `${(min / 1000000).toFixed(0)}+ triệu`;
      }
      return "Thỏa thuận";
    };

    const formatTimeAgo = (dateString: string) => {
      const now = new Date();
      const posted = new Date(dateString);
      const diffInHours = Math.floor(
        (now.getTime() - posted.getTime()) / (1000 * 60 * 60)
      );

      if (diffInHours < 24) {
        return `${diffInHours} hours ago`;
      }
      const diffInDays = Math.floor(diffInHours / 24);
      if (diffInDays < 7) {
        return `${diffInDays} days ago`;
      }
      const diffInWeeks = Math.floor(diffInDays / 7);
      return `${diffInWeeks} week${diffInWeeks > 1 ? "s" : ""} ago`;
    };

    const getJobTypeDisplay = (employmentType: Job["employmentType"]) => {
      const typeMap = {
        "full-time": "Full Time",
        "part-time": "Part Time",
        contract: "Contract",
        internship: "Internship",
      };
      return typeMap[employmentType] || "Full Time";
    };

    const getPrivacyStatus = () => {
      // Could be based on company size, job visibility, etc.
      return "Private";
    };

    const getUrgencyStatus = (urgent?: boolean) => {
      return urgent ? "Urgent" : "Normal";
    };

    // Using BaseCard with composition pattern
    return (
      <BaseCard
        className={className}
        featured={job.featured}
        urgent={job.urgent}
        interactive
        onClick={() => onViewDetails?.(job.id)}
      >
        <BaseCardHeader>
          <div className="flex items-start justify-between">
            <div className="flex gap-2 sm:gap-3 flex-1 min-w-0">
              {/* Company Logo */}
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#ff4081] rounded-xl sm:rounded-lg flex-shrink-0 flex items-center justify-center">
                <span className="text-white font-bold text-sm sm:text-lg">
                  {job.company.name.charAt(0)}
                </span>
              </div>

              {/* Job Details */}
              <div className="flex-1 min-w-0">
                {/* Job Title - Truncated on mobile */}
                <h2 className="text-base sm:text-xl lg:text-2xl font-semibold text-[#202124] leading-tight mb-1 sm:mb-2">
                  <span className="block sm:hidden">
                    {job.title.length > 30
                      ? `${job.title.substring(0, 30)}...`
                      : job.title}
                  </span>
                  <span className="hidden sm:block">{job.title}</span>
                </h2>

                {/* Company Name - Hidden on mobile */}
                <div className="hidden sm:flex items-center gap-2 text-[#696969] mb-2">
                  <Package className="w-4 h-4 flex-shrink-0" />
                  <span>{job.company.name}</span>
                </div>

                {/* Location and Time - Mobile layout */}
                <div className="flex items-center gap-3 text-sm text-[#696969] mb-2 sm:mb-3">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 flex-shrink-0" />
                    <span>{formatTimeAgo(job.postedAt)}</span>
                  </div>
                  {/* Salary - Hidden on mobile, shown on desktop */}
                  <div className="hidden sm:flex items-center gap-1.5">
                    <DollarSign className="w-4 h-4 flex-shrink-0" />
                    <span>{formatSalary(job.salary)}</span>
                  </div>
                </div>

                {/* Status Badges */}
                <div className="flex flex-wrap gap-1.5">
                  <BaseCardBadge
                    variant={
                      job.employmentType === "full-time" ? "default" : "warning"
                    }
                  >
                    {getJobTypeDisplay(job.employmentType)}
                  </BaseCardBadge>
                  <BaseCardBadge variant="success">
                    {getPrivacyStatus()}
                  </BaseCardBadge>
                  {job.urgent && (
                    <BaseCardBadge variant="urgent">
                      {getUrgencyStatus(job.urgent)}
                    </BaseCardBadge>
                  )}
                </div>
              </div>
            </div>
          </div>
        </BaseCardHeader>

        <BaseCardActions align="right" className="hidden sm:flex">
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "w-10 h-10 transition-colors duration-200",
              job.isBookmarked
                ? "text-[#1967d2] hover:text-[#1557b0] hover:bg-gray-100"
                : "text-[#696969] hover:text-[#202124] hover:bg-gray-100"
            )}
            onClick={(e) => {
              e.stopPropagation();
              onBookmark?.(job.id);
            }}
          >
            <Bookmark
              className={cn("w-5 h-5", job.isBookmarked ? "fill-current" : "")}
            />
          </Button>
        </BaseCardActions>
      </BaseCard>
    );
  }
);

JobCard.displayName = "JobCard";
