import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { JobManagementFilters } from "../types";
import { useJobs } from "./useJobs";
import { useDeleteJob } from "./useDeleteJob";

/**
 * Composite hook for job management that combines multiple hooks
 * following the pattern used in other features
 */
export const useJobManagement = (initialFilters: JobManagementFilters = {}) => {
  const { t } = useTranslation();
  const [filters, setFilters] = useState<JobManagementFilters>(initialFilters);

  // Use React Query hooks
  const { data: jobsResponse, isLoading, refetch } = useJobs(filters);
  const deleteJobMutation = useDeleteJob();

  const jobs = jobsResponse?.data?.jobs || [];
  const loading = isLoading;

  const updateFilters = useCallback((newFilters: Partial<JobManagementFilters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
  }, [filters]);

  const handleDeleteJob = useCallback(async (jobId: number) => {
    if (!confirm(t("recruiter.jobs.management.confirmDelete"))) return;
    
    deleteJobMutation.mutate(jobId);
  }, [deleteJobMutation, t]);

  const loadJobs = useCallback(() => {
    refetch();
  }, [refetch]);

  return {
    jobs,
    loading,
    filters,
    loadJobs,
    updateFilters,
    handleDeleteJob,
    isDeleting: deleteJobMutation.isPending,
  };
};