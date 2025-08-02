import React from "react";
import {
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Building2,
} from "lucide-react";
import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components";
import { JobCard } from "@/components/ui/job-card";
import { type Job } from "@/types";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { formatTimeAgo, formatSalary } from "@/utils/common";

interface JobListingsProps {
  jobs: Job[];
  totalJobs: number;
  currentPage: number;
  totalPages: number;
  isLoading?: boolean;
  sortBy: string;
  onSortChange: (sortBy: string) => void;
  onPageChange: (page: number) => void;
  onSaveJob?: (jobId: string) => void;
  showFilters?: boolean;
}

const JobListingCard: React.FC<{
  job: Job;
  onSaveJob?: (jobId: string) => void;
  onViewJob: (jobId: string) => void;
}> = ({ job, onSaveJob, onViewJob }) => {
  const { t } = useTranslation();
  const getLocationDisplay = (job: Job) => {
    if (job.location?.city && job.location?.country) {
      return `${job.location.city}, ${job.location.country}`;
    }
    return (
      job.location?.city || job.location?.country || "Location not specified"
    );
  };

  const getJobTags = (job: Job) => {
    const tags = [];

    if (job.type) {
      tags.push({
        text: job.type,
        variant: "outline" as const,
        color: "blue" as const,
      });
    }

    if (job.experienceLevel) {
      tags.push({
        text: job.experienceLevel,
        variant: "outline" as const,
        color: "yellow" as const,
      });
    }

    if (job.featured) {
      tags.push({
        text: "Featured",
        variant: "outline" as const,
        color: "red" as const,
      });
    }

    return tags;
  };

  return (
    <JobCard
      title={job.title}
      company={job.companyName}
      location={getLocationDisplay(job)}
      timeAgo={formatTimeAgo(job.postedAt, t)}
      salary={formatSalary(
        {
          salary_min: job.salary?.min,
          salary_max: job.salary?.max,
        },
        t
      )}
      tags={getJobTags(job)}
      onBookmark={() => onSaveJob?.(job.id)}
      onClick={() => onViewJob(job.id)}
      logo={
        <div className="w-12 h-12 bg-[#ECEDF2] rounded-lg flex items-center justify-center">
          <Building2 className="w-6 h-6 text-gray-400" />
        </div>
      }
      className="mb-4"
    />
  );
};

const JobCardSkeleton: React.FC = () => {
  return (
    <div className="mb-4 p-4 border border-gray-200 rounded-lg bg-white animate-pulse">
      <div className="flex gap-4">
        <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
        <div className="flex-1">
          <div className="w-48 h-5 bg-gray-200 rounded mb-2"></div>
          <div className="w-32 h-4 bg-gray-200 rounded mb-2"></div>
          <div className="flex gap-2">
            <div className="w-16 h-6 bg-gray-200 rounded"></div>
            <div className="w-20 h-6 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const JobListings: React.FC<JobListingsProps> = ({
  jobs,
  totalJobs,
  currentPage,
  totalPages,
  isLoading = false,
  sortBy,
  onSortChange,
  onPageChange,
  onSaveJob,
  showFilters = false,
}) => {
  const navigate = useNavigate();

  const handleViewJob = (jobId: string) => {
    navigate(`/jobs/${jobId}`);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-6">
          <div className="w-32 h-6 bg-gray-200 rounded animate-pulse"></div>
          <div className="w-40 h-10 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div
          className={`grid grid-cols-1 ${
            showFilters ? "lg:grid-cols-1" : "lg:grid-cols-2"
          } gap-4`}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <JobCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header with Results Count and Sort */}
      <div className="flex items-center justify-between mb-6">
        <div className="text-gray-600">
          <span className="font-medium text-gray-900">{totalJobs}</span> jobs
          found
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <ArrowUpDown className="h-4 w-4 text-gray-500" />
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="posted_date">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="salary_high">Salary: High to Low</SelectItem>
              <SelectItem value="salary_low">Salary: Low to High</SelectItem>
              <SelectItem value="relevance">Most Relevant</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Job Cards - Dynamic Grid Layout */}
      <div
        className={`grid grid-cols-1 ${
          showFilters ? "lg:grid-cols-1" : "lg:grid-cols-2"
        } gap-4`}
      >
        {jobs.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <div className="text-gray-500 text-lg mb-2">No jobs found</div>
            <div className="text-gray-400">
              Try adjusting your search criteria
            </div>
          </div>
        ) : (
          jobs.map((job) => (
            <JobListingCard
              key={job.id}
              job={job}
              onSaveJob={onSaveJob}
              onViewJob={handleViewJob}
            />
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = i + 1;
              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "default" : "outline"}
                  size="sm"
                  onClick={() => onPageChange(pageNum)}
                  className="w-10"
                >
                  {pageNum}
                </Button>
              );
            })}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};
