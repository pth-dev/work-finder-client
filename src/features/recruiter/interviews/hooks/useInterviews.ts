import { useQuery } from "@tanstack/react-query";
import { getInterviews, getJobInterviews } from "../api";
import { InterviewFilters } from "../types";

// Query keys
export const interviewKeys = {
  all: ["interviews"] as const,
  lists: () => [...interviewKeys.all, "list"] as const,
  list: (filters: InterviewFilters) => [...interviewKeys.lists(), filters] as const,
  details: () => [...interviewKeys.all, "detail"] as const,
  detail: (id: number) => [...interviewKeys.details(), id] as const,
  jobInterviews: (jobId: number, filters: any) => ["job-interviews", jobId, filters] as const,
  stats: () => [...interviewKeys.all, "stats"] as const,
} as const;

// Get interviews with filters
export const useInterviews = (filters: InterviewFilters = {}) => {
  return useQuery({
    queryKey: interviewKeys.list(filters),
    queryFn: () => getInterviews(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
};

// Get interviews for a specific job
export const useJobInterviews = (
  jobId: number,
  filters: Omit<InterviewFilters, "jobId"> = {}
) => {
  return useQuery({
    queryKey: interviewKeys.jobInterviews(jobId, filters),
    queryFn: () => getJobInterviews(jobId, filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    enabled: !!jobId,
  });
};
