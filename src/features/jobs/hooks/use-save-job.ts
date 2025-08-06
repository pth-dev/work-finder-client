import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { api } from "@/lib/api-client";
import { useToast } from "@/services/toast-service";

interface SaveJobRequest {
  jobId: string;
  action: "save" | "unsave";
}

interface SaveJobResponse {
  success: boolean;
  message: string;
  data: {
    jobId: string;
    isSaved: boolean;
    saveCount: number;
  };
}

/**
 * Hook for saving/unsaving jobs with optimistic updates and cache management
 *
 * Features:
 * - Optimistic UI updates for instant feedback
 * - Automatic cache invalidation for consistency
 * - Error handling with rollback on failure
 * - Toast notifications for user feedback
 *
 * @example
 * ```tsx
 * const { mutate: saveJob, isPending } = useSaveJob();
 *
 * const handleSaveJob = (jobId: string, currentlySaved: boolean) => {
 *   saveJob({
 *     jobId,
 *     action: currentlySaved ? 'unsave' : 'save'
 *   });
 * };
 * ```
 */
export const useSaveJob = () => {
  const queryClient = useQueryClient();
  const toastService = useToast();
  const { t } = useTranslation();

  return useMutation<SaveJobResponse, Error, SaveJobRequest>({
    mutationFn: async ({
      jobId,
      action,
    }: SaveJobRequest): Promise<SaveJobResponse> => {
      if (action === "save") {
        const response = await api.post(`/jobs/${jobId}/save`);
        return response.data;
      } else {
        const response = await api.delete(`/jobs/${jobId}/save`);
        return response.data;
      }
    },

    // Optimistic updates for instant UI feedback
    onMutate: async ({ jobId, action }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["jobs"] });
      await queryClient.cancelQueries({ queryKey: ["job", jobId] });
      await queryClient.cancelQueries({ queryKey: ["featured-jobs"] });

      // Snapshot the previous values
      const previousJobsData = queryClient.getQueriesData({
        queryKey: ["jobs"],
      });
      const previousJobData = queryClient.getQueryData(["job", jobId]);
      const previousFeaturedData = queryClient.getQueriesData({
        queryKey: ["featured-jobs"],
      });

      // Optimistically update job data
      const isSaved = action === "save";

      // Update individual job query
      queryClient.setQueryData(["job", jobId], (old: any) => {
        if (!old?.data) return old;
        return {
          ...old,
          data: {
            ...old.data,
            is_saved: isSaved,
            save_count: old.data.save_count + (isSaved ? 1 : -1),
          },
        };
      });

      // Update jobs list queries
      queryClient.setQueriesData({ queryKey: ["jobs"] }, (old: any) => {
        if (!old?.data?.jobs) return old;
        return {
          ...old,
          data: {
            ...old.data,
            jobs: old.data.jobs.map((job: any) =>
              job.job_id.toString() === jobId
                ? {
                    ...job,
                    is_saved: isSaved,
                    save_count: job.save_count + (isSaved ? 1 : -1),
                  }
                : job
            ),
          },
        };
      });

      // Update featured jobs queries
      queryClient.setQueriesData(
        { queryKey: ["featured-jobs"] },
        (old: any) => {
          if (!old?.data?.jobs) return old;
          return {
            ...old,
            data: {
              ...old.data,
              jobs: old.data.jobs.map((job: any) =>
                job.job_id.toString() === jobId
                  ? {
                      ...job,
                      is_saved: isSaved,
                      save_count: job.save_count + (isSaved ? 1 : -1),
                    }
                  : job
              ),
            },
          };
        }
      );

      // Return context for rollback
      return { previousJobsData, previousJobData, previousFeaturedData };
    },

    onSuccess: (_, { action }) => {
      const messageKey =
        action === "save" ? "jobs.save.success" : "jobs.unsave.success";

      toastService.success(t(messageKey));

      // Invalidate and refetch related queries to ensure consistency
      queryClient.invalidateQueries({ queryKey: ["saved-jobs"] });
      queryClient.invalidateQueries({ queryKey: ["jobs"], type: "all" });
      queryClient.invalidateQueries({
        queryKey: ["featured-jobs"],
        type: "all",
      });
      queryClient.invalidateQueries({ queryKey: ["job"], type: "all" });
    },

    // On error - rollback optimistic updates and show error message
    onError: (_, { action }, context: any) => {
      const messageKey =
        action === "save" ? "jobs.save.error" : "jobs.unsave.error";

      toastService.error(t(messageKey));

      // Rollback optimistic updates
      if (context) {
        const { previousJobsData, previousJobData, previousFeaturedData } =
          context;

        // Restore previous jobs data
        if (previousJobsData) {
          previousJobsData.forEach(([queryKey, data]: [any, any]) => {
            queryClient.setQueryData(queryKey, data);
          });
        }

        // Restore previous job data
        if (previousJobData) {
          queryClient.setQueryData(["job", action], previousJobData);
        }

        // Restore previous featured data
        if (previousFeaturedData) {
          previousFeaturedData.forEach(([queryKey, data]: [any, any]) => {
            queryClient.setQueryData(queryKey, data);
          });
        }
      }
    },

    // Always refetch to ensure consistency
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["saved-jobs"] });
    },
  });
};

/**
 * @deprecated Use is_saved field from API response instead
 * Hook to get saved job status for a specific job
 */
export const useSavedJobStatus = (jobId: string) => {
  const queryClient = useQueryClient();
  const savedJobs = queryClient.getQueryData(["saved-jobs"]) as any;
  const isSaved =
    savedJobs?.data?.jobs?.some(
      (savedJob: any) => savedJob.job_id.toString() === jobId
    ) || false;
  return { isSaved };
};

/**
 * @deprecated Use is_saved field from API response instead
 * Utility function to create a Set of saved job IDs for fast lookup
 */
export const createSavedJobsSet = (savedJobsData: any): Set<string> => {
  if (!savedJobsData?.data?.jobs) return new Set();
  return new Set(
    savedJobsData.data.jobs.map((job: any) => job.job_id.toString())
  );
};

/**
 * Utility function to toggle save status
 *
 * @param jobId - The job ID
 * @param currentlySaved - Current save status
 * @param saveJobMutation - The save job mutation from useSaveJob
 */
export const toggleSaveJob = (
  jobId: string,
  currentlySaved: boolean,
  saveJobMutation: ReturnType<typeof useSaveJob>["mutate"]
) => {
  saveJobMutation({
    jobId,
    action: currentlySaved ? "unsave" : "save",
  });
};
