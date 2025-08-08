import { useQuery } from "@tanstack/react-query";
import { getInterviewStats } from "../api";
import { interviewKeys } from "./useInterviews";

// Get interview statistics
export const useInterviewStats = () => {
  return useQuery({
    queryKey: interviewKeys.stats(),
    queryFn: getInterviewStats,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
};
