import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";

// ===== TYPES =====
export interface AdminJobPost {
  job_id: number;
  title: string;
  description: string;
  requirements: string;
  location: string;
  salary_min?: number;
  salary_max?: number;
  employment_type: string;
  experience_level: string;
  status: "pending" | "active" | "inactive" | "rejected" | "closed";
  posted_date: string;
  expires_at?: string;
  company: {
    company_id: number;
    company_name: string;
    company_image?: string;
    location?: string;
  };
}

export interface PendingJobsResponse {
  jobs: AdminJobPost[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface JobStatistics {
  total: number;
  byStatus: {
    draft: number;
    pending: number;
    active: number;
    inactive: number;
    closed: number;
    rejected: number;
  };
  pendingReview: number;
  activeJobs: number;
  expiringSoon: number;
}

export interface RejectJobRequest {
  reason?: string;
}

// ===== API FUNCTIONS =====

/**
 * Get pending jobs for admin review
 */
export const getPendingJobs = (
  page: number = 1,
  limit: number = 20
): Promise<{ data: PendingJobsResponse }> => {
  return api.get("/admin/jobs/pending", {
    params: { page, limit },
  });
};

/**
 * Get job statistics for admin dashboard
 */
export const getJobStatistics = (): Promise<{ data: JobStatistics }> => {
  return api.get("/admin/jobs/statistics");
};

/**
 * Approve a job
 */
export const approveJob = (jobId: number): Promise<{ data: AdminJobPost }> => {
  return api.post(`/admin/jobs/${jobId}/approve`);
};

/**
 * Reject a job
 */
export const rejectJob = (
  jobId: number,
  data?: RejectJobRequest
): Promise<{ data: AdminJobPost }> => {
  return api.post(`/admin/jobs/${jobId}/reject`, data);
};

// ===== REACT QUERY HOOKS =====

/**
 * Hook to get pending jobs
 */
export const usePendingJobs = (page: number = 1, limit: number = 20) => {
  return useQuery({
    queryKey: ["admin", "jobs", "pending", page, limit],
    queryFn: () => getPendingJobs(page, limit),
    staleTime: 30 * 1000, // 30 seconds
  });
};

/**
 * Hook to get job statistics
 */
export const useJobStatistics = () => {
  return useQuery({
    queryKey: ["admin", "jobs", "statistics"],
    queryFn: getJobStatistics,
    staleTime: 60 * 1000, // 1 minute
  });
};

/**
 * Hook to approve a job
 */
export const useApproveJob = (mutationConfig?: any) => {
  const queryClient = useQueryClient();

  return useMutation<{ data: AdminJobPost }, Error, number>({
    mutationFn: (jobId: number) => approveJob(jobId),
    onMutate: async (jobId: number) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({
        queryKey: ["admin", "jobs", "pending"],
      });

      // Optimistically update pending jobs list
      queryClient.setQueriesData(
        { queryKey: ["admin", "jobs", "pending"] },
        (old: any) => {
          if (!old?.data?.jobs) return old;

          return {
            ...old,
            data: {
              ...old.data,
              jobs: old.data.jobs.filter(
                (job: AdminJobPost) => job.job_id !== jobId
              ),
              total: old.data.total - 1,
            },
          };
        }
      );

      // Call custom onMutate if provided
      if (mutationConfig?.onMutate) {
        return mutationConfig.onMutate(jobId);
      }
    },
    onSuccess: (data, variables, context) => {
      // Invalidate queries to ensure fresh data
      queryClient.invalidateQueries({ queryKey: ["admin", "jobs", "pending"] });
      queryClient.invalidateQueries({
        queryKey: ["admin", "jobs", "statistics"],
      });

      // Then call custom onSuccess if provided
      if (mutationConfig?.onSuccess) {
        mutationConfig.onSuccess(data, variables, context);
      }
    },
    onError: (error, variables, context) => {
      // Revert optimistic update on error
      queryClient.invalidateQueries({ queryKey: ["admin", "jobs", "pending"] });

      if (mutationConfig?.onError) {
        mutationConfig.onError(error, variables, context);
      }
    },
    onSettled: mutationConfig?.onSettled,
  });
};

/**
 * Hook to reject a job
 */
export const useRejectJob = (mutationConfig?: any) => {
  const queryClient = useQueryClient();

  return useMutation<
    { data: AdminJobPost },
    Error,
    { jobId: number; data?: RejectJobRequest }
  >({
    mutationFn: ({ jobId, data }) => rejectJob(jobId, data),
    onMutate: async ({ jobId }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({
        queryKey: ["admin", "jobs", "pending"],
      });

      // Optimistically update pending jobs list
      queryClient.setQueriesData(
        { queryKey: ["admin", "jobs", "pending"] },
        (old: any) => {
          if (!old?.data?.jobs) return old;

          return {
            ...old,
            data: {
              ...old.data,
              jobs: old.data.jobs.filter(
                (job: AdminJobPost) => job.job_id !== jobId
              ),
              total: old.data.total - 1,
            },
          };
        }
      );

      // Call custom onMutate if provided
      if (mutationConfig?.onMutate) {
        return mutationConfig.onMutate({ jobId });
      }
    },
    onSuccess: (data, variables, context) => {
      // Invalidate queries to ensure fresh data
      queryClient.invalidateQueries({ queryKey: ["admin", "jobs", "pending"] });
      queryClient.invalidateQueries({
        queryKey: ["admin", "jobs", "statistics"],
      });

      // Then call custom onSuccess if provided
      if (mutationConfig?.onSuccess) {
        mutationConfig.onSuccess(data, variables, context);
      }
    },
    onError: (error, variables, context) => {
      // Revert optimistic update on error
      queryClient.invalidateQueries({ queryKey: ["admin", "jobs", "pending"] });

      if (mutationConfig?.onError) {
        mutationConfig.onError(error, variables, context);
      }
    },
    onSettled: mutationConfig?.onSettled,
  });
};
