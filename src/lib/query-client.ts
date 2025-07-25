import { QueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// Type definitions for query parameters
interface QueryParams {
  [key: string]: string | number | boolean | undefined;
}

/**
 * Modern Query Client Configuration
 * Following TanStack Query best practices with global error handling
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Cache data for 5 minutes
      staleTime: 5 * 60 * 1000,
      // Keep data in cache for 30 minutes
      gcTime: 30 * 60 * 1000,
      // Don't refetch on window focus (better UX)
      refetchOnWindowFocus: false,
      // Smart retry logic
      retry: (failureCount, error: unknown) => {
        // Don't retry on 4xx errors except 401 (auth errors)
        const errorWithStatus = error as { status?: number };
        if (
          errorWithStatus?.status >= 400 &&
          errorWithStatus?.status < 500 &&
          errorWithStatus?.status !== 401
        ) {
          return false;
        }
        // Retry up to 3 times for other errors
        return failureCount < 3;
      },
      // Global error handling for queries
      onError: (error: unknown) => {
        // Don't show toast for auth errors (handled by redirect)
        if (
          error instanceof Error &&
          !error.message.includes("Authentication failed")
        ) {
          toast.error(error.message || "Đã xảy ra lỗi khi tải dữ liệu");
        }
      },
    },
    mutations: {
      // Don't retry mutations by default
      retry: false,
      // Global error handling for mutations
      onError: (error: unknown) => {
        // Don't show toast for auth errors (handled by redirect)
        if (
          error instanceof Error &&
          !error.message.includes("Authentication failed")
        ) {
          toast.error(error.message || "Thao tác thất bại");
        }
      },
    },
  },
});

/**
 * Query Keys Factory
 * Centralized query key management following TkDodo's best practices
 */
export const queryKeys = {
  // Authentication
  auth: {
    user: ["auth", "user"] as const,
  },

  // Jobs
  jobs: {
    all: ["jobs"] as const,
    lists: () => [...queryKeys.jobs.all, "list"] as const,
    list: (params?: QueryParams) =>
      [...queryKeys.jobs.lists(), params] as const,
    details: () => [...queryKeys.jobs.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.jobs.details(), id] as const,
    search: (query: string) =>
      [...queryKeys.jobs.all, "search", query] as const,
    filters: ["jobs", "filters"] as const,
  },

  // Companies
  companies: {
    all: ["companies"] as const,
    lists: () => [...queryKeys.companies.all, "list"] as const,
    list: (params?: QueryParams) =>
      [...queryKeys.companies.lists(), params] as const,
    details: () => [...queryKeys.companies.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.companies.details(), id] as const,
    jobs: (id: string) => [...queryKeys.companies.detail(id), "jobs"] as const,
  },

  // Applications
  applications: {
    all: ["applications"] as const,
    lists: () => [...queryKeys.applications.all, "list"] as const,
    list: (params?: QueryParams) =>
      [...queryKeys.applications.lists(), params] as const,
    details: () => [...queryKeys.applications.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.applications.details(), id] as const,
    stats: ["applications", "stats"] as const,
  },

  // Profile
  profile: {
    all: ["profile"] as const,
    details: () => [...queryKeys.profile.all, "detail"] as const,
  },
} as const;

/**
 * Utility function to invalidate related queries
 * Helps maintain data consistency after mutations
 */
export const invalidateQueries = {
  // Invalidate all job-related queries
  jobs: () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.jobs.all });
  },

  // Invalidate specific job and related data
  job: (jobId: string) => {
    queryClient.invalidateQueries({ queryKey: queryKeys.jobs.detail(jobId) });
    queryClient.invalidateQueries({ queryKey: queryKeys.jobs.lists() });
  },

  // Invalidate all company-related queries
  companies: () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.companies.all });
  },

  // Invalidate specific company and related data
  company: (companyId: string) => {
    queryClient.invalidateQueries({
      queryKey: queryKeys.companies.detail(companyId),
    });
    queryClient.invalidateQueries({ queryKey: queryKeys.companies.lists() });
  },

  // Invalidate all application-related queries
  applications: () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.applications.all });
  },

  // Invalidate user profile
  profile: () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.profile.all });
  },

  // Invalidate user data (profile + applications)
  user: () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.auth.user });
    queryClient.invalidateQueries({ queryKey: queryKeys.profile.all });
    queryClient.invalidateQueries({ queryKey: queryKeys.applications.all });
  },
};
