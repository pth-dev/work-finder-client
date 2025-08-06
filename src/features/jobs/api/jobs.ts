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
 * Get single job by ID or slug
 */
export const getJob = (
  identifier: string | number
): Promise<{ data: ApiJobPost }> => {
  return api.get(`/jobs/${identifier}`);
};

/**
 * Get single job by slug (SEO-friendly)
 */
export const getJobBySlug = (slug: string): Promise<{ data: ApiJobPost }> => {
  return api.get(`/jobs/${slug}`);
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
  if (action === "save") {
    return api.post(`/jobs/${jobId}/save`);
  } else {
    return api.delete(`/jobs/${jobId}/save`);
  }
};

/**
 * Get user's saved jobs
 */
export const getSavedJobs = (): Promise<ApiJobsResponse> => {
  return api.get("/jobs/saved");
};
