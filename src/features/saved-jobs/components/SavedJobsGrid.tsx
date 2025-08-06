import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Heart, Briefcase } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SavedJobPost } from "../types";
import { SavedJobCard } from "./SavedJobCard";

interface SavedJobsGridProps {
  jobs: SavedJobPost[];
  isLoading: boolean;
  totalPages: number;
  currentPage: number;
  total: number;
  limit?: number; // Add limit prop
  onPageChange: (page: number) => void;
  onJobRemove: (jobId: number) => void;
}

export function SavedJobsGrid({
  jobs,
  isLoading,
  totalPages,
  currentPage,
  total,
  limit = 12,
  onPageChange,
  onJobRemove,
}: SavedJobsGridProps) {
  const { t } = useTranslation();

  // Loading State
  if (isLoading) {
    return (
      <div className="space-y-4">
        {/* Loading Skeleton */}
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="animate-pulse bg-white rounded-lg border p-4"
          >
            <div className="flex items-start space-x-3">
              <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/4"></div>
              </div>
              <div className="w-20 h-8 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Empty State
  if (!jobs.length) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <Heart className="h-12 w-12 text-gray-400" />
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {t("savedJobs.noSavedJobs", "No saved jobs yet")}
        </h3>

        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          {t(
            "savedJobs.noSavedJobsSubtitle",
            "Start saving jobs you're interested in to see them here"
          )}
        </p>

        <Button asChild>
          <a href="/jobs">
            <Briefcase className="h-4 w-4 mr-2" />
            {t("savedJobs.browseJobs", "Browse Jobs")}
          </a>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          {t(
            "savedJobs.showingResults",
            "Showing {{start}}-{{end}} of {{total}} saved jobs",
            {
              start: (currentPage - 1) * limit + 1,
              end: Math.min(currentPage * limit, total),
              total,
            }
          )}
        </p>
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {jobs.map((job) => (
          <SavedJobCard key={job.job_id} job={job} onRemove={onJobRemove} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2 pt-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage <= 1}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            {t("common.previous", "Previous")}
          </Button>

          <div className="flex items-center space-x-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "default" : "outline"}
                  size="sm"
                  onClick={() => onPageChange(pageNum)}
                  className="w-8 h-8 p-0"
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
            disabled={currentPage >= totalPages}
          >
            {t("common.next", "Next")}
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      )}
    </div>
  );
}
