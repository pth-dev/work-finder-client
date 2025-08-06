import { useQuery } from "@tanstack/react-query";
import {
  getUserWithStats,
  // Old APIs for backward compatibility
  getApplicationStats,
  getUserApplications,
  getSavedJobsCount,
} from "../api/dashboard";

/**
 * ✅ NEW: Hook to fetch user with dashboard stats (replaces multiple calls)
 */
export const useUserWithStats = (
  options: {
    enabled?: boolean;
    staleTime?: number;
    gcTime?: number;
  } = {}
) => {
  return useQuery({
    queryKey: ["user-with-stats"],
    queryFn: getUserWithStats,
    staleTime: options.staleTime ?? 5 * 60 * 1000, // 5 minutes
    gcTime: options.gcTime ?? 10 * 60 * 1000, // 10 minutes
    enabled: options.enabled ?? true,
    refetchOnWindowFocus: false,
    retry: 2,
  });
};

/**
 * ✅ NEW: Hook to fetch recent applications (reuse existing endpoint)
 */
export const useRecentApplications = (
  limit = 5,
  options: {
    enabled?: boolean;
    staleTime?: number;
    gcTime?: number;
  } = {}
) => {
  return useQuery({
    queryKey: ["recent-applications", limit],
    queryFn: () => getUserApplications(limit),
    staleTime: options.staleTime ?? 2 * 60 * 1000, // 2 minutes
    gcTime: options.gcTime ?? 5 * 60 * 1000, // 5 minutes
    enabled: options.enabled ?? true,
    refetchOnWindowFocus: false,
    retry: 2,
  });
};

/**
 * ❌ OLD: Hook to fetch application statistics (deprecated)
 */
export const useApplicationStats = (
  options: {
    enabled?: boolean;
    staleTime?: number;
    gcTime?: number;
  } = {}
) => {
  return useQuery({
    queryKey: ["application-stats"],
    queryFn: getApplicationStats,
    staleTime: options.staleTime ?? 5 * 60 * 1000, // 5 minutes
    gcTime: options.gcTime ?? 10 * 60 * 1000, // 10 minutes
    enabled: options.enabled ?? true,
    refetchOnWindowFocus: false,
    retry: 2,
  });
};

/**
 * Hook to fetch user applications
 */
export const useUserApplications = (
  limit = 5,
  options: {
    enabled?: boolean;
    staleTime?: number;
    gcTime?: number;
  } = {}
) => {
  return useQuery({
    queryKey: ["user-applications", limit],
    queryFn: () => getUserApplications(limit),
    staleTime: options.staleTime ?? 5 * 60 * 1000, // 5 minutes
    gcTime: options.gcTime ?? 10 * 60 * 1000, // 10 minutes
    enabled: options.enabled ?? true,
    refetchOnWindowFocus: false,
    retry: 2,
  });
};

/**
 * Hook to fetch saved jobs count
 */
export const useSavedJobsCount = (
  options: {
    enabled?: boolean;
    staleTime?: number;
    gcTime?: number;
  } = {}
) => {
  return useQuery({
    queryKey: ["saved-jobs-count"],
    queryFn: getSavedJobsCount,
    staleTime: options.staleTime ?? 5 * 60 * 1000, // 5 minutes
    gcTime: options.gcTime ?? 10 * 60 * 1000, // 10 minutes
    enabled: options.enabled ?? true,
    refetchOnWindowFocus: false,
    retry: 2,
  });
};
