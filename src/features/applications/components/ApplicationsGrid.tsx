import { Button } from "@/components/ui/button";
import { 
  ChevronLeft, 
  ChevronRight, 
  FileText,
  Briefcase 
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { ApplicationCard } from "./ApplicationCard";

interface Application {
  application_id: number;
  job_id: number;
  status: string;
  applied_at: string;
  updated_at: string;
  job_post?: {
    job_id: number;
    job_title: string;
    location?: string;
    salary_min?: number;
    salary_max?: number;
    job_type?: string;
    company: {
      company_id: number;
      company_name: string;
      company_image?: string;
    };
  };
}

interface ApplicationsGridProps {
  applications: Application[];
  isLoading: boolean;
  filters: {
    search?: string;
    status?: string;
    page?: number;
    limit?: number;
  };
  totalPages: number;
  currentPage: number;
  total: number;
  onPageChange: (page: number) => void;
  onViewDetails: (applicationId: number) => void;
}

export function ApplicationsGrid({
  applications,
  isLoading,
  filters,
  totalPages,
  currentPage,
  total,
  onPageChange,
  onViewDetails,
}: ApplicationsGridProps) {
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
              <div className="w-20 h-6 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Empty State
  if (!applications.length) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <FileText className="h-12 w-12 text-gray-400" />
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {filters.search || filters.status
            ? t("applications.noResultsFound", "No applications found")
            : t("applications.noApplications", "No applications yet")
          }
        </h3>
        
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          {filters.search || filters.status
            ? t("applications.noResultsSubtitle", "Try adjusting your filters to see more results")
            : t("applications.noApplicationsSubtitle", "Start applying to jobs to see your applications here")
          }
        </p>

        {!filters.search && !filters.status && (
          <Button asChild>
            <a href="/jobs">
              <Briefcase className="h-4 w-4 mr-2" />
              {t("applications.browseJobs", "Browse Jobs")}
            </a>
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          {t("applications.showingResults", "Showing {{start}}-{{end}} of {{total}} applications", {
            start: (currentPage - 1) * (filters.limit || 10) + 1,
            end: Math.min(currentPage * (filters.limit || 10), total),
            total,
          })}
        </p>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {applications.map((application) => (
          <ApplicationCard
            key={application.application_id}
            application={application}
            onViewDetails={onViewDetails}
          />
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
