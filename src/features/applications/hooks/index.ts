import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MutationConfig } from "@/lib/react-query";
import { createApplication, withdrawApplication } from "../api/applications";
import { CreateApplicationRequest, Application } from "../types";

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
