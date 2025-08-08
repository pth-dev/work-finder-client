/**
 * Query keys for job-related queries
 * Centralized query key management for better cache invalidation
 */
export const jobKeys = {
  all: ["jobs"] as const,
  lists: () => [...jobKeys.all, "list"] as const,
  list: (filters: any) => [...jobKeys.lists(), filters] as const,
  details: () => [...jobKeys.all, "detail"] as const,
  detail: (id: number) => [...jobKeys.details(), id] as const,
  companyJobs: (filters: any) => ["company-jobs", filters] as const,
} as const;
