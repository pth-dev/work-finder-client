import { useQuery } from "@tanstack/react-query";
import { ApiJobSearchFilters } from "../types";
import {
  getJobs,
  getFeaturedJobs,
  getJob,
  getJobsByCompany,
  getSavedJobs,
} from "../api/jobs";

// ===== QUERY HOOKS =====

/**
 * Hook to fetch jobs with filters
 */
export const useJobs = (
  filters: ApiJobSearchFilters = {},
  options: {
    enabled?: boolean;
    staleTime?: number;
    gcTime?: number;
  } = {}
) => {
  // Create stable query key by sorting object keys
  const stableFilters = Object.keys(filters)
    .sort()
    .reduce((result, key) => {
      const value = filters[key as keyof ApiJobSearchFilters];
      if (value !== undefined && value !== null && value !== "") {
        result[key] = value;
      }
      return result;
    }, {} as Record<string, any>);

  return useQuery({
    queryKey: ["jobs", stableFilters],
    queryFn: () => getJobs(filters),
    staleTime: options.staleTime ?? 5 * 60 * 1000, // 5 minutes
    gcTime: options.gcTime ?? 10 * 60 * 1000, // 10 minutes
    enabled: options.enabled ?? true,
    refetchOnWindowFocus: false,
    retry: 2,
  });
};

/**
 * Hook to fetch featured jobs
 */
export const useFeaturedJobs = (
  limit: number = 6,
  options: {
    enabled?: boolean;
    staleTime?: number;
  } = {}
) => {
  return useQuery({
    queryKey: ["featured-jobs", limit],
    queryFn: () => getFeaturedJobs(limit),
    staleTime: options.staleTime ?? 3 * 60 * 1000, // 3 minutes for featured content
    gcTime: 10 * 60 * 1000, // 10 minutes
    enabled: options.enabled ?? true,
    refetchOnWindowFocus: false,
    retry: 2,
  });
};

/**
 * Hook to fetch single job by ID or slug
 */
export const useJob = (
  identifier: string | number,
  options: {
    enabled?: boolean;
  } = {}
) => {
  return useQuery({
    queryKey: ["job", identifier],
    queryFn: () => getJob(identifier),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
    enabled: options.enabled ?? !!identifier,
    refetchOnWindowFocus: false,
    retry: 2,
  });
};

/**
 * Hook to fetch jobs by company
 */
export const useJobsByCompany = (
  companyId: number,
  limit?: number,
  options: {
    enabled?: boolean;
  } = {}
) => {
  return useQuery({
    queryKey: ["jobs", "company", companyId, limit],
    queryFn: () => getJobsByCompany(companyId, limit),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    enabled: options.enabled ?? !!companyId,
    refetchOnWindowFocus: false,
    retry: 2,
  });
};

/**
 * Hook to fetch saved jobs
 */
export const useSavedJobs = (
  options: {
    enabled?: boolean;
  } = {}
) => {
  return useQuery({
    queryKey: ["saved-jobs"],
    queryFn: getSavedJobs,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
    enabled: options.enabled ?? true,
    refetchOnWindowFocus: true,
    retry: 2,
  });
};

// Re-export existing hooks
export * from "./use-save-job";
