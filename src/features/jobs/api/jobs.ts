import { api } from "@/lib/api-client";
import {
  ApiJobsResponse,
  ApiJobResponse,
  ApiJobSearchFilters,
  ApiJobPost,
} from "../types";

// ===== API FUNCTIONS =====

/**
 * Get all jobs with filters and pagination
 */
export const getJobs = (
  filters: ApiJobSearchFilters = {}
): Promise<ApiJobsResponse> => {
  return api.get("/jobs", { params: filters });
};

/**
 * Get featured jobs (latest jobs sorted by posted_date)
 */
export const getFeaturedJobs = (
  limit: number = 6
): Promise<ApiJobsResponse> => {
  return api.get("/jobs", {
    params: {
      limit,
      sortBy: "posted_date",
      sortOrder: "DESC",
    },
  });
};

/**
 * Get single job by ID
 */
export const getJob = (id: number): Promise<{ data: ApiJobPost }> => {
  return api.get(`/jobs/${id}`);
};

/**
 * Get jobs by company
 */
export const getJobsByCompany = (
  companyId: number,
  limit?: number
): Promise<ApiJobsResponse> => {
  return api.get("/jobs", {
    params: {
      companyId,
      limit,
      sortBy: "posted_date",
      sortOrder: "DESC",
    },
  });
};

/**
 * Save/unsave a job
 */
export const saveJob = (jobId: string, action: "save" | "unsave") => {
  return api.post(`/jobs/${jobId}/${action}`);
};

/**
 * Get user's saved jobs
 */
export const getSavedJobs = (): Promise<ApiJobsResponse> => {
  return api.get("/jobs/saved");
};
