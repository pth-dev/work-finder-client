import { api } from "@/lib/api-client";
import { SavedJobsResponse, SavedJobsFilters } from "../types";

// Get user's saved jobs - simplified without search filters
export const getSavedJobs = (
  filters: Pick<SavedJobsFilters, "page" | "limit"> = {}
): Promise<{ data: SavedJobsResponse }> => {
  const { page = 1, limit = 12 } = filters;

  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  return api.get(`/jobs/saved?${params.toString()}`);
};

// Save a job
export const saveJob = (
  jobId: number
): Promise<{ data: { message: string } }> => {
  return api.post(`/jobs/${jobId}/save`);
};

// Unsave a job
export const unsaveJob = (
  jobId: number
): Promise<{ data: { message: string } }> => {
  return api.delete(`/jobs/${jobId}/save`);
};

// Check if job is saved
export const checkJobSaved = (
  jobId: number
): Promise<{ data: { isSaved: boolean } }> => {
  return api.get(`/jobs/${jobId}/saved-status`);
};
