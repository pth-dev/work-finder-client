import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MutationConfig } from "@/lib/react-query";
import {
  createApplication,
  withdrawApplication,
  getMyApplications,
  getApplication,
} from "../api/applications";

/**
 * Hook to create a new application
 */
type UseCreateApplicationOptions = {
  mutationConfig?: MutationConfig<typeof createApplication>;
};

export const useCreateApplication = ({
  mutationConfig,
}: UseCreateApplicationOptions = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createApplication,
    onSuccess: () => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: ["my-applications"] });
      queryClient.invalidateQueries({ queryKey: ["jobs"] }); // To update is_applied status
    },
    ...mutationConfig,
  });
};

/**
 * Hook to withdraw an application
 */
type UseWithdrawApplicationOptions = {
  mutationConfig?: MutationConfig<typeof withdrawApplication>;
};

export const useWithdrawApplication = ({
  mutationConfig,
}: UseWithdrawApplicationOptions = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: withdrawApplication,
    onSuccess: () => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: ["my-applications"] });
      queryClient.invalidateQueries({ queryKey: ["jobs"] }); // To update is_applied status
    },
    ...mutationConfig,
  });
};

/**
 * Hook to get user's applications with pagination and filters
 */
type UseMyApplicationsOptions = {
  filters?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
  };
  enabled?: boolean;
};

export const useMyApplications = ({
  filters = {},
  enabled = true,
}: UseMyApplicationsOptions = {}) => {
  return useQuery({
    queryKey: ["my-applications", filters],
    queryFn: () => getMyApplications(filters),
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });
};

/**
 * Hook to get application details by ID
 */
type UseApplicationOptions = {
  applicationId?: number;
  enabled?: boolean;
};

export const useApplication = ({
  applicationId,
  enabled = true,
}: UseApplicationOptions) => {
  return useQuery({
    queryKey: ["application", applicationId],
    queryFn: () => {
      if (!applicationId) {
        throw new Error("Application ID is required");
      }
      return getApplication(applicationId);
    },
    enabled: enabled && Boolean(applicationId),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });
};
