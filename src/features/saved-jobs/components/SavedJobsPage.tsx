import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Heart } from "lucide-react";
import { SavedJobsGrid } from "./SavedJobsGrid";
import { useSavedJobs } from "../hooks";

export function SavedJobsPage() {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 12;

  const { data, isLoading, refetch } = useSavedJobs({
    page: currentPage,
    limit,
  });

  const savedJobsData = data?.data || {
    jobs: [],
    pagination: {
      total: 0,
      page: 1,
      limit: 12,
      totalPages: 0,
    },
  };

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleJobRemove = useCallback(
    (_jobId: number) => {
      // Refetch data after removing a job
      refetch();
    },
    [refetch]
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
          <Heart className="h-5 w-5 text-red-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {t("savedJobs.title", "Saved Jobs")}
          </h1>
          <p className="text-gray-600">
            {t("savedJobs.subtitle", "Manage your saved job opportunities")}
          </p>
        </div>
      </div>

      <SavedJobsGrid
        jobs={savedJobsData.jobs}
        isLoading={isLoading}
        totalPages={savedJobsData.pagination.totalPages}
        currentPage={savedJobsData.pagination.page}
        total={savedJobsData.pagination.total}
        limit={limit}
        onPageChange={handlePageChange}
        onJobRemove={handleJobRemove}
      />
    </div>
  );
}
