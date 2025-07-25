/**
 * Jobs API Functions
 * Using native fetch() with proper error handling
 */

import {
  handleResponse,
  getApiBaseUrl,
  buildQueryString,
  createFetchOptions,
} from "./utils";
import { fetchWithAuth } from "./with-auth";
import type { Job, JobsResponse, JobSearchParams } from "@/types/job";

// Base API URL
const API_BASE_URL = getApiBaseUrl();

/**
 * Get all jobs with optional filtering
 */
export async function fetchJobs(
  params?: JobSearchParams
): Promise<JobsResponse> {
  const queryString = params ? buildQueryString(params) : "";
  const url = `${API_BASE_URL}/jobs${queryString ? `?${queryString}` : ""}`;

  const response = await fetch(url, {
    method: "GET",
    credentials: "include",
  });

  return handleResponse<JobsResponse>(response);
}

/**
 * Get job by ID
 */
export async function fetchJob(id: string): Promise<Job> {
  const response = await fetch(`${API_BASE_URL}/jobs/${id}`, {
    method: "GET",
    credentials: "include",
  });

  return handleResponse<Job>(response);
}

/**
 * Search jobs with query
 */
export async function searchJobs(
  params: JobSearchParams
): Promise<JobsResponse> {
  const queryString = buildQueryString(params);
  const url = `${API_BASE_URL}/jobs/search?${queryString}`;

  const response = await fetch(url, {
    method: "GET",
    credentials: "include",
  });

  return handleResponse<JobsResponse>(response);
}

/**
 * Apply to a job
 */
export async function applyToJob(
  jobId: string,
  applicationData?: Record<string, unknown>
): Promise<void> {
  const response = await fetchWithAuth(
    `${API_BASE_URL}/jobs/${jobId}/apply`,
    createFetchOptions({
      method: "POST",
      body: applicationData ? JSON.stringify(applicationData) : undefined,
    })
  );

  if (!response.ok) {
    await handleResponse(response); // This will throw with proper error message
  }
}

/**
 * Save/bookmark a job
 */
export async function saveJob(jobId: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/jobs/${jobId}/save`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    await handleResponse(response); // This will throw with proper error message
  }
}

/**
 * Unsave/unbookmark a job
 */
export async function unsaveJob(jobId: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/jobs/${jobId}/save`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    await handleResponse(response); // This will throw with proper error message
  }
}

/**
 * Create a new job (for employers)
 */
export async function createJob(jobData: Partial<Job>): Promise<Job> {
  const response = await fetch(`${API_BASE_URL}/jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(jobData),
  });

  return handleResponse<Job>(response);
}

/**
 * Update a job (for employers)
 */
export async function updateJob(
  jobId: string,
  jobData: Partial<Job>
): Promise<Job> {
  const response = await fetch(`${API_BASE_URL}/jobs/${jobId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(jobData),
  });

  return handleResponse<Job>(response);
}

/**
 * Delete a job (for employers)
 */
export async function deleteJob(jobId: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/jobs/${jobId}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    await handleResponse(response); // This will throw with proper error message
  }
}

/**
 * Get featured jobs
 */
export async function fetchFeaturedJobs(limit = 6): Promise<Job[]> {
  const response = await fetch(
    `${API_BASE_URL}/jobs?featured=true&limit=${limit}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  const result = await handleResponse<JobsResponse>(response);
  return result.items;
}

/**
 * Get recent jobs
 */
export async function fetchRecentJobs(limit = 10): Promise<Job[]> {
  const response = await fetch(
    `${API_BASE_URL}/jobs?sort=newest&limit=${limit}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  const result = await handleResponse<JobsResponse>(response);
  return result.items;
}
