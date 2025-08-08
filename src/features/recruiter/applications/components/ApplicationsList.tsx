import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Users } from "lucide-react";
import { ApplicationsTable } from "./ApplicationsTable";
import { RecruiterApplicationFilters } from "./ApplicationFilters";
import {
  ApiApplication,
  ApplicationStatus,
  ApplicationFilters as FilterType,
} from "../types";
import { cn } from "@/lib/utils";

interface ApplicationsListProps {
  applications: ApiApplication[];
  isLoading?: boolean;
  error?: Error | null;
  filters: FilterType;
  onFiltersChange: (filters: FilterType) => void;

  onCreateInterview?: (application: ApiApplication) => void;
  totalCount?: number;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  jobOptions?: Array<{ value: number; label: string }>;
}

export function ApplicationsList({
  applications,
  isLoading = false,
  error,
  filters,
  onFiltersChange,

  onCreateInterview,
  totalCount = 0,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  jobOptions = [],
}: ApplicationsListProps) {
  const { t } = useTranslation();

  // Pagination
  const handlePageChange = (page: number) => {
    onPageChange?.(page);
  };

  const paginationRange = useMemo(() => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots.filter(
      (item, index, arr) => arr.indexOf(item) === index
    );
  }, [currentPage, totalPages]);

  // Loading skeleton
  if (isLoading && applications.length === 0) {
    return (
      <div className="space-y-6">
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="border rounded-lg p-6">
              <div className="flex items-start space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-3 w-1/2" />
                  <Skeleton className="h-3 w-2/3" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">
          <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-semibold">
            {t("applications.errors.loadFailed")}
          </h3>
          <p className="text-sm text-muted-foreground mt-2">
            {error.message || t("applications.errors.generic")}
          </p>
        </div>
        <Button onClick={() => window.location.reload()}>
          {t("common.retry")}
        </Button>
      </div>
    );
  }

  // Empty state
  if (!isLoading && applications.length === 0) {
    return (
      <div className="space-y-6">
        <RecruiterApplicationFilters
          filters={filters}
          onFiltersChange={onFiltersChange}
          jobOptions={jobOptions}
          isLoading={isLoading}
          totalCount={totalCount}
        />

        <div className="text-center py-12">
          <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold">
            {t("applications.empty.title")}
          </h3>
          <p className="text-muted-foreground mt-2">
            {filters.search || filters.status || filters.jobId
              ? t("applications.empty.noResults")
              : t("applications.empty.noApplications")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <RecruiterApplicationFilters
        filters={filters}
        onFiltersChange={onFiltersChange}
        jobOptions={jobOptions}
        isLoading={isLoading}
        totalCount={totalCount}
      />

      {/* List Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          {t("applications.list.title")}
        </h2>
      </div>

      {/* Applications Table */}
      <ApplicationsTable
        applications={applications}
        onCreateInterview={onCreateInterview}
        isLoading={isLoading}
      />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {t("applications.pagination.showing", {
              start: (currentPage - 1) * (filters.limit || 10) + 1,
              end: Math.min(currentPage * (filters.limit || 10), totalCount),
              total: totalCount,
            })}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage <= 1}
            >
              {t("common.previous")}
            </Button>

            {paginationRange.map((page, index) => (
              <React.Fragment key={index}>
                {page === "..." ? (
                  <span className="px-2">...</span>
                ) : (
                  <Button
                    variant={page === currentPage ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(page as number)}
                    className={cn(
                      "w-8 h-8 p-0",
                      page === currentPage &&
                        "bg-primary text-primary-foreground"
                    )}
                  >
                    {page}
                  </Button>
                )}
              </React.Fragment>
            ))}

            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
            >
              {t("common.next")}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
