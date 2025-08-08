import { useQuery } from "@tanstack/react-query";
import { getJobById } from "../api/jobs";
import { jobKeys } from "./queryKeys";

/**
 * Hook to fetch job details by ID
 */
export const useJobDetail = (
  jobId: number,
  options: {
    enabled?: boolean;
  } = {}
) => {
  return useQuery({
    queryKey: jobKeys.detail(jobId),
    queryFn: () => getJobById(jobId),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
    enabled: options.enabled ?? !!jobId,
    refetchOnWindowFocus: false,
    retry: 2,
  });
};
