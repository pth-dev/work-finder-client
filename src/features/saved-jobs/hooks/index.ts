import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getSavedJobs, saveJob, unsaveJob, checkJobSaved } from "../api";
import { SavedJobsFilters } from "../types";
import { toast } from "react-hot-toast";

// Hook to get saved jobs
export const useSavedJobs = (filters: SavedJobsFilters = {}) => {
  return useQuery({
    queryKey: ["saved-jobs", filters],
    queryFn: () => getSavedJobs(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook to save/unsave job
export const useSaveJob = () => {
  const queryClient = useQueryClient();
  
  const saveMutation = useMutation({
    mutationFn: saveJob,
    onSuccess: () => {
      toast.success("Job saved successfully!");
      queryClient.invalidateQueries({ queryKey: ["saved-jobs"] });
    },
    onError: () => {
      toast.error("Failed to save job");
    },
  });
  
  const unsaveMutation = useMutation({
    mutationFn: unsaveJob,
    onSuccess: () => {
      toast.success("Job removed from saved");
      queryClient.invalidateQueries({ queryKey: ["saved-jobs"] });
    },
    onError: () => {
      toast.error("Failed to remove job");
    },
  });
  
  return {
    saveJob: saveMutation.mutate,
    unsaveJob: unsaveMutation.mutate,
    isSaving: saveMutation.isPending,
    isUnsaving: unsaveMutation.isPending,
  };
};

// Hook to check if job is saved
export const useJobSavedStatus = (jobId: number) => {
  return useQuery({
    queryKey: ["job-saved-status", jobId],
    queryFn: () => checkJobSaved(jobId),
    enabled: !!jobId,
  });
};
