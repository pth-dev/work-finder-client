import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { FileText } from "lucide-react";
import { ApplicationsFilters } from "./ApplicationsFilters";
import { ApplicationsGrid } from "./ApplicationsGrid";
import { ApplicationDetailModal } from "./ApplicationDetailModal";
import { useMyApplications } from "../hooks";

export function ApplicationsPage() {
  const { t } = useTranslation();
  const [filters, setFilters] = useState<{
    page: number;
    limit: number;
    status?: string;
  }>({
    page: 1,
    limit: 10,
  });
  const [selectedApplicationId, setSelectedApplicationId] = useState<
    number | null
  >(null);

  // Fetch applications from API
  const {
    data: apiResponse,
    isLoading,
    error,
  } = useMyApplications({
    filters,
  });

  const applicationsData = apiResponse?.data || {
    applications: [],
    pagination: {
      total: 0,
      page: 1,
      limit: 10,
      totalPages: 0,
    },
  };

  const handleFiltersChange = useCallback((newFilters: any) => {
    setFilters(newFilters);
  }, []);

  const handleClearFilters = useCallback(() => {
    setFilters({
      page: 1,
      limit: 10,
    });
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  }, []);

  const handleViewDetails = useCallback((applicationId: number) => {
    setSelectedApplicationId(applicationId);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedApplicationId(null);
  }, []);

  // Show error state
  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
            <FileText className="h-5 w-5 text-red-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {t("applications.title", "My Applications")}
            </h1>
            <p className="text-red-600">
              Failed to load applications. Please try again.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
          <FileText className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {t("applications.title", "My Applications")}
          </h1>
          <p className="text-gray-600">
            {t(
              "applications.subtitle",
              "Track and manage your job applications"
            )}
          </p>
        </div>
      </div>

      {/* Filters */}
      <ApplicationsFilters
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onClearFilters={handleClearFilters}
      />

      {/* Applications Grid */}
      <ApplicationsGrid
        applications={applicationsData.applications}
        isLoading={isLoading}
        filters={filters}
        totalPages={applicationsData.pagination.totalPages}
        currentPage={applicationsData.pagination.page}
        total={applicationsData.pagination.total}
        onPageChange={handlePageChange}
        onViewDetails={handleViewDetails}
      />

      {/* Application Detail Modal */}
      <ApplicationDetailModal
        isOpen={selectedApplicationId !== null}
        onClose={handleCloseModal}
        applicationId={selectedApplicationId || undefined}
      />
    </div>
  );
}
