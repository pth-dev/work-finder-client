import { useQuery } from "@tanstack/react-query";
import { getMyCompanyJobs } from "../api/jobs";
import { JobManagementFilters } from "../types";
import { jobKeys } from "./queryKeys";

/**
 * Hook to get jobs for current user's company
 */
export const useJobs = (filters: JobManagementFilters = {}) => {
  return useQuery({
    queryKey: jobKeys.companyJobs(filters),
    queryFn: () => getMyCompanyJobs(filters),
    staleTime: 2 * 60 * 1000, // 2 minutes
    retry: 2,
  });
};
