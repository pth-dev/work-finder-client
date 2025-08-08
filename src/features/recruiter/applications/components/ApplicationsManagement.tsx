import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";

import { ApplicationsList } from "./ApplicationsList";
import { useApplications, useUpdateApplicationStatus } from "../hooks";
import {
  ApplicationStatus,
  ApplicationFilters,
  ApiApplication,
} from "../types";
import { CreateInterviewModal } from "../../interviews/components";

export function ApplicationsManagement() {
  const { t } = useTranslation();
  const [filters, setFilters] = useState<ApplicationFilters>({
    page: 1,
    limit: 10,
    sortBy: "applied_at",
    sortOrder: "desc",
  });

  // Interview modal state
  const [createInterviewModal, setCreateInterviewModal] = useState<{
    isOpen: boolean;
    application: ApiApplication | null;
  }>({ isOpen: false, application: null });

  // Queries
  const {
    data: applicationsData,
    isLoading: applicationsLoading,
    error: applicationsError,
  } = useApplications(filters);

  // Mutations
  const updateStatusMutation = useUpdateApplicationStatus();

  // Handlers
  const handleFiltersChange = useCallback((newFilters: ApplicationFilters) => {
    setFilters(newFilters);
  }, []);

  const handleStatusChange = useCallback(
    (applicationId: number, status: ApplicationStatus) => {
      updateStatusMutation.mutate({
        applicationId,
        updateData: { status },
      });
    },
    [updateStatusMutation]
  );

  const handlePageChange = useCallback((page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  }, []);

  // Interview handlers
  const handleCreateInterview = useCallback((application: ApiApplication) => {
    setCreateInterviewModal({ isOpen: true, application });
  }, []);

  const handleCloseInterviewModal = useCallback(() => {
    setCreateInterviewModal({ isOpen: false, application: null });
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">
          {t("recruiterApplications.title")}
        </h1>
        <p className="text-gray-600">{t("recruiterApplications.subtitle")}</p>
      </div>

      {/* Applications List */}
      <ApplicationsList
        applications={applicationsData?.applications || []}
        isLoading={applicationsLoading}
        error={applicationsError}
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onCreateInterview={handleCreateInterview}
        totalCount={applicationsData?.total || 0}
        currentPage={applicationsData?.page || 1}
        totalPages={applicationsData?.totalPages || 1}
        onPageChange={handlePageChange}
      />

      {/* Create Interview Modal */}
      {createInterviewModal.application && (
        <CreateInterviewModal
          isOpen={createInterviewModal.isOpen}
          onClose={handleCloseInterviewModal}
          application={createInterviewModal.application}
        />
      )}
    </div>
  );
}
