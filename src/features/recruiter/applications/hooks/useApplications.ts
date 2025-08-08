import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import {
  getAllApplications,
  getJobApplications,
  updateApplicationStatus,
  bulkUpdateApplications,
  getApplicationStats,
  searchApplications,
} from "../api";
import {
  ApplicationFilters,
  UpdateApplicationRequest,
  ApplicationStatus,
} from "../types";

// Query keys
export const applicationKeys = {
  all: ["applications"] as const,
  lists: () => [...applicationKeys.all, "list"] as const,
  list: (filters: ApplicationFilters) =>
    [...applicationKeys.lists(), filters] as const,
  jobApplications: (jobId: number, filters: ApplicationFilters) =>
    [...applicationKeys.all, "job", jobId, filters] as const,
  stats: () => [...applicationKeys.all, "stats"] as const,
  search: (query: string, filters: ApplicationFilters) =>
    [...applicationKeys.all, "search", query, filters] as const,
};

/**
 * Hook to get all applications with filters and pagination
 */
export const useApplications = (filters: ApplicationFilters = {}) => {
  const { t } = useTranslation();

  return useQuery({
    queryKey: applicationKeys.list(filters),
    queryFn: () => getAllApplications(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    meta: {
      errorMessage: t("recruiterApplications.errors.fetchFailed"),
    },
  });
};

/**
 * Hook to get applications for a specific job
 */
export const useJobApplications = (
  jobId: number,
  filters: ApplicationFilters = {}
) => {
  const { t } = useTranslation();

  return useQuery({
    queryKey: applicationKeys.jobApplications(jobId, filters),
    queryFn: () => getJobApplications(jobId, filters),
    enabled: !!jobId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 2,
    meta: {
      errorMessage: t("applications.errors.fetchJobApplicationsFailed"),
    },
  });
};

/**
 * Hook to get application statistics
 */
export const useApplicationStats = () => {
  const { t } = useTranslation();

  return useQuery({
    queryKey: applicationKeys.stats(),
    queryFn: getApplicationStats,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    retry: 2,
    meta: {
      errorMessage: t("applications.errors.fetchStatsFailed"),
    },
  });
};

/**
 * Hook to search applications
 */
export const useSearchApplications = (
  query: string,
  filters: ApplicationFilters = {}
) => {
  const { t } = useTranslation();

  return useQuery({
    queryKey: applicationKeys.search(query, filters),
    queryFn: () => searchApplications(query, filters),
    enabled: query.length >= 2, // Only search with 2+ characters
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
    meta: {
      errorMessage: t("applications.errors.searchFailed"),
    },
  });
};

/**
 * Hook to update application status with optimistic updates
 */
export const useUpdateApplicationStatus = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      applicationId,
      updateData,
    }: {
      applicationId: number;
      updateData: UpdateApplicationRequest;
    }) => updateApplicationStatus(applicationId, updateData),

    onMutate: async ({ applicationId, updateData }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: applicationKeys.all });

      // Snapshot previous values
      const previousData = queryClient.getQueriesData({
        queryKey: applicationKeys.all,
      });

      // Optimistically update
      queryClient.setQueriesData(
        { queryKey: applicationKeys.lists() },
        (old: any) => {
          if (!old?.applications) return old;

          return {
            ...old,
            applications: old.applications.map((app: any) =>
              app.application_id === applicationId
                ? {
                    ...app,
                    ...updateData,
                    updated_at: new Date().toISOString(),
                  }
                : app
            ),
          };
        }
      );

      return { previousData };
    },

    onError: (error, variables, context) => {
      // Rollback optimistic update
      if (context?.previousData) {
        context.previousData.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }

      toast.error(t("applications.errors.updateStatusFailed"));
    },

    onSuccess: (data, { updateData }) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: applicationKeys.all });
      queryClient.invalidateQueries({ queryKey: applicationKeys.stats() });

      const statusText = t(`applications.status.${updateData.status}`);
      toast.success(
        t("applications.messages.statusUpdated", { status: statusText })
      );
    },
  });
};

/**
 * Hook for bulk operations
 */
export const useBulkUpdateApplications = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      applicationIds,
      updateData,
    }: {
      applicationIds: number[];
      updateData: UpdateApplicationRequest;
    }) => bulkUpdateApplications(applicationIds, updateData),

    onSuccess: (data, { applicationIds, updateData }) => {
      queryClient.invalidateQueries({ queryKey: applicationKeys.all });
      queryClient.invalidateQueries({ queryKey: applicationKeys.stats() });

      const count = applicationIds.length;
      const statusText = t(`applications.status.${updateData.status}`);
      toast.success(
        t("applications.messages.bulkUpdateSuccess", {
          count,
          status: statusText,
        })
      );
    },

    onError: () => {
      toast.error(t("applications.errors.bulkUpdateFailed"));
    },
  });
};
