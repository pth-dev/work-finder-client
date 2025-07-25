/**
 * Jobs Hooks
 * Modern TanStack Query hooks following best practices
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  fetchJobs,
  fetchJob,
  searchJobs,
  applyToJob,
  saveJob,
  unsaveJob,
  fetchFeaturedJobs,
  fetchRecentJobs,
  type Job,
  type JobsResponse,
  type JobSearchParams,
} from "@/lib/api/jobs";
import { queryKeys, invalidateQueries } from "@/lib/query-client";

// Query Hooks (with proper TypeScript inference - no manual generics)

/**
 * Get all jobs with optional filtering
 */
export function useJobs(params?: JobSearchParams) {
  return useQuery({
    queryKey: queryKeys.jobs.list(params),
    queryFn: () => fetchJobs(params),
    staleTime: 2 * 60 * 1000, // 2 minutes for job listings
  });
}

/**
 * Get job by ID
 */
export function useJob(id: string) {
  return useQuery({
    queryKey: queryKeys.jobs.detail(id),
    queryFn: () => fetchJob(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes for job details
  });
}

/**
 * Search jobs with query
 */
export function useJobSearch(params?: JobSearchParams) {
  return useQuery({
    queryKey: queryKeys.jobs.search(params?.q || ""),
    queryFn: () => searchJobs(params || {}),
    enabled: !!params?.q, // Only search when there's a query
    staleTime: 1 * 60 * 1000, // 1 minute for search results
  });
}

/**
 * Hook for search functionality - returns search handler
 */
export function useSearchHandler() {
  const queryClient = useQueryClient();

  const handleSearch = (query: string, filters?: Partial<JobSearchParams>) => {
    const searchParams = { q: query, ...filters };

    // Update filters in cache
    queryClient.setQueryData(queryKeys.jobs.filters, searchParams);

    // Trigger search query
    queryClient.invalidateQueries({ queryKey: queryKeys.jobs.list() });
  };

  return { handleSearch };
}

/**
 * Get featured jobs
 */
export function useFeaturedJobs(limit = 6) {
  return useQuery({
    queryKey: ["jobs", "featured", limit],
    queryFn: () => fetchFeaturedJobs(limit),
    staleTime: 10 * 60 * 1000, // 10 minutes for featured jobs
  });
}

/**
 * Get recent jobs
 */
export function useRecentJobs(limit = 10) {
  return useQuery({
    queryKey: ["jobs", "recent", limit],
    queryFn: () => fetchRecentJobs(limit),
    staleTime: 5 * 60 * 1000, // 5 minutes for recent jobs
  });
}

// Mutation Hooks (specific, not generic - following research best practices)

/**
 * Apply to a job
 */
export function useApplyJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      jobId,
      applicationData,
    }: {
      jobId: string;
      applicationData?: Record<string, unknown>;
    }) => applyToJob(jobId, applicationData),
    onSuccess: (_, { jobId }) => {
      toast.success("Ứng tuyển thành công!");

      // Invalidate related queries
      invalidateQueries.applications();

      // Update the specific job to reflect application status
      queryClient.invalidateQueries({
        queryKey: queryKeys.jobs.detail(jobId),
      });
    },
    onError: (error) => {
      // Error is handled globally, but we can add specific handling here if needed
      console.error("Apply job error:", error);
    },
  });
}

/**
 * Save/bookmark a job
 */
export function useSaveJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: saveJob,
    onSuccess: (_, jobId) => {
      toast.success("Đã lưu công việc!");

      // Invalidate job lists to show updated save status
      queryClient.invalidateQueries({
        queryKey: queryKeys.jobs.lists(),
      });

      // Update the specific job
      queryClient.invalidateQueries({
        queryKey: queryKeys.jobs.detail(jobId),
      });
    },
    onError: (error) => {
      console.error("Save job error:", error);
    },
  });
}

/**
 * Unsave/unbookmark a job
 */
export function useUnsaveJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: unsaveJob,
    onSuccess: (_, jobId) => {
      toast.success("Đã bỏ lưu công việc!");

      // Invalidate job lists to show updated save status
      queryClient.invalidateQueries({
        queryKey: queryKeys.jobs.lists(),
      });

      // Update the specific job
      queryClient.invalidateQueries({
        queryKey: queryKeys.jobs.detail(jobId),
      });
    },
    onError: (error) => {
      console.error("Unsave job error:", error);
    },
  });
}

// Optimistic Updates for Better UX

/**
 * Toggle job save status with optimistic updates
 */
export function useToggleJobSave() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      jobId,
      isSaved,
    }: {
      jobId: string;
      isSaved: boolean;
    }) => {
      if (isSaved) {
        await unsaveJob(jobId);
      } else {
        await saveJob(jobId);
      }
      return { jobId, newSavedStatus: !isSaved };
    },

    // Optimistic update
    onMutate: async ({ jobId, isSaved }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: queryKeys.jobs.detail(jobId),
      });

      // Snapshot the previous value
      const previousJob = queryClient.getQueryData<Job>(
        queryKeys.jobs.detail(jobId)
      );

      // Optimistically update to the new value
      if (previousJob) {
        queryClient.setQueryData<Job>(queryKeys.jobs.detail(jobId), {
          ...previousJob,
          // Add saved status to job type if needed
        });
      }

      // Return a context object with the snapshotted value
      return { previousJob };
    },

    onSuccess: ({ jobId, newSavedStatus }) => {
      toast.success(
        newSavedStatus ? "Đã lưu công việc!" : "Đã bỏ lưu công việc!"
      );

      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: queryKeys.jobs.lists() });
    },

    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (err, { jobId }, context) => {
      if (context?.previousJob) {
        queryClient.setQueryData(
          queryKeys.jobs.detail(jobId),
          context.previousJob
        );
      }
      console.error("Toggle job save error:", err);
    },

    // Always refetch after error or success
    onSettled: (_, __, { jobId }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.jobs.detail(jobId) });
    },
  });
}

// Prefetch utilities for better performance

/**
 * Prefetch job details
 */
export function usePrefetchJob() {
  const queryClient = useQueryClient();

  return (jobId: string) => {
    queryClient.prefetchQuery({
      queryKey: queryKeys.jobs.detail(jobId),
      queryFn: () => fetchJob(jobId),
      staleTime: 5 * 60 * 1000,
    });
  };
}

/**
 * Prefetch jobs list
 */
export function usePrefetchJobs() {
  const queryClient = useQueryClient();

  return (params?: JobSearchParams) => {
    queryClient.prefetchQuery({
      queryKey: queryKeys.jobs.list(params),
      queryFn: () => fetchJobs(params),
      staleTime: 2 * 60 * 1000,
    });
  };
}

/**
 * Job filters hook for managing search filters state
 * Converts between JobFilters (UI) and JobSearchParams (API)
 */
export function useJobFilters() {
  const queryClient = useQueryClient();

  // Get current filters from query cache or use defaults
  const getCurrentFilters = () => {
    const apiFilters =
      (queryClient.getQueryData(queryKeys.jobs.filters) as JobSearchParams) ||
      {};

    // Convert API format to UI format
    return {
      search: apiFilters.q || "",
      location: apiFilters.location || "",
      workType: apiFilters.type ? [apiFilters.type] : [],
      employmentType: apiFilters.level ? [apiFilters.level] : [],
      experienceLevel: [],
      salaryRange:
        apiFilters.salary_min && apiFilters.salary_max
          ? [apiFilters.salary_min, apiFilters.salary_max]
          : [],
      remote: apiFilters.remote || false,
      featured: apiFilters.featured || false,
    };
  };

  const updateFilters = (newFilters: Record<string, unknown>) => {
    const currentApiFilters =
      (queryClient.getQueryData(queryKeys.jobs.filters) as JobSearchParams) ||
      {};

    // Convert UI format to API format
    const apiFilters: Partial<JobSearchParams> = {};

    if (newFilters.search !== undefined) {
      apiFilters.q = newFilters.search;
    }
    if (newFilters.location !== undefined) {
      apiFilters.location = newFilters.location;
    }
    if (newFilters.workType !== undefined) {
      apiFilters.type = Array.isArray(newFilters.workType)
        ? newFilters.workType[0]
        : newFilters.workType;
    }
    if (newFilters.employmentType !== undefined) {
      apiFilters.level = Array.isArray(newFilters.employmentType)
        ? newFilters.employmentType[0]
        : newFilters.employmentType;
    }
    if (newFilters.remote !== undefined) {
      apiFilters.remote = newFilters.remote;
    }
    if (newFilters.featured !== undefined) {
      apiFilters.featured = newFilters.featured;
    }

    const updatedFilters = { ...currentApiFilters, ...apiFilters };

    // Update filters in cache
    queryClient.setQueryData(queryKeys.jobs.filters, updatedFilters);

    // Invalidate jobs list to trigger refetch with new filters
    queryClient.invalidateQueries({ queryKey: queryKeys.jobs.list() });
  };

  const clearFilters = () => {
    queryClient.setQueryData(queryKeys.jobs.filters, {});
    queryClient.invalidateQueries({ queryKey: queryKeys.jobs.list() });
  };

  const hasActiveFilters = (): boolean => {
    const filters =
      (queryClient.getQueryData(queryKeys.jobs.filters) as JobSearchParams) ||
      {};
    return Object.keys(filters).length > 0;
  };

  return {
    filters: getCurrentFilters(),
    updateFilters,
    clearFilters,
    hasActiveFilters: hasActiveFilters(),
  };
}
