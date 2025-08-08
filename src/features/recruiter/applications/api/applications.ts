import { api } from "@/lib/api-client";
import {
  ApiApplicationsResponse,
  ApiApplication,
  ApplicationFilters,
  UpdateApplicationRequest,
  ApplicationStats,
} from "../types";

/**
 * Get applications for a specific job (Recruiter only)
 */
export const getJobApplications = async (
  jobId: number,
  filters: ApplicationFilters = {}
): Promise<ApiApplicationsResponse> => {
  const params = new URLSearchParams();

  if (filters.status) params.append("status", filters.status);
  if (filters.page) params.append("page", filters.page.toString());
  if (filters.limit) params.append("limit", filters.limit.toString());

  const response = await api.get(
    `/applications/jobs/${jobId}/applications?${params.toString()}`
  );

  return response.data;
};

/**
 * Get application by ID (Recruiter only)
 */
export const getApplicationById = async (
  id: number
): Promise<ApiApplication> => {
  const response = await api.get(`/applications/${id}`);
  return response.data;
};

/**
 * Get all applications with filters (Recruiter only)
 */
export const getAllApplications = async (
  filters: ApplicationFilters = {}
): Promise<ApiApplicationsResponse> => {
  const params = new URLSearchParams();

  if (filters.search) params.append("search", filters.search);
  if (filters.status) params.append("status", filters.status);
  if (filters.jobId) params.append("jobId", filters.jobId.toString());
  if (filters.page) params.append("page", filters.page.toString());
  if (filters.limit) params.append("limit", filters.limit.toString());

  const response = await api.get(`/applications?${params.toString()}`);

  // Map backend response structure to frontend expected structure
  const backendData = response.data;
  return {
    applications: backendData.applications,
    total: backendData.pagination.total,
    page: backendData.pagination.page,
    limit: backendData.pagination.limit,
    totalPages: backendData.pagination.totalPages,
  };
};

/**
 * Update application status (Recruiter only)
 */
export const updateApplicationStatus = async (
  applicationId: number,
  updateData: UpdateApplicationRequest
): Promise<ApiApplication> => {
  const response = await api.patch(
    `/applications/${applicationId}`,
    updateData
  );
  return response.data;
};

/**
 * Bulk update application statuses
 */
export const bulkUpdateApplications = async (
  applicationIds: number[],
  updateData: UpdateApplicationRequest
): Promise<ApiApplication[]> => {
  const promises = applicationIds.map((id) =>
    updateApplicationStatus(id, updateData)
  );

  return Promise.all(promises);
};

/**
 * Get application statistics for recruiter
 */
export const getApplicationStats = async (): Promise<ApplicationStats> => {
  const response = await api.get("/applications/stats");
  return response.data;
};

/**
 * Export applications to CSV
 */
export const exportApplications = async (
  filters: ApplicationFilters = {}
): Promise<Blob> => {
  const params = new URLSearchParams();

  if (filters.status) params.append("status", filters.status);
  if (filters.jobId) params.append("jobId", filters.jobId.toString());

  const response = await api.get(`/applications/export?${params.toString()}`, {
    responseType: "blob",
  });

  return response.data;
};

/**
 * Search applications by candidate name or email
 */
export const searchApplications = async (
  query: string,
  filters: ApplicationFilters = {}
): Promise<ApiApplicationsResponse> => {
  const params = new URLSearchParams();
  params.append("search", query);

  if (filters.status) params.append("status", filters.status);
  if (filters.jobId) params.append("jobId", filters.jobId.toString());
  if (filters.page) params.append("page", filters.page.toString());
  if (filters.limit) params.append("limit", filters.limit.toString());

  const response = await api.get(`/applications/search?${params.toString()}`);

  return response.data;
};
