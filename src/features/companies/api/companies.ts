import { api } from "@/lib/api-client";
import { ApiJobsResponse } from "@/features/jobs/types";
import {
  CompanySearchFilters,
  ApiCompaniesResponse,
  ApiCompanyResponse,
  CreateCompanyRequest,
  UpdateCompanyRequest,
  JoinCompanyRequest,
  FollowCompanyResponse,
  CompanyJobsFilters,
  ApiUserCompanyResponse,
} from "../types";

// ===== API FUNCTIONS =====

/**
 * Get all companies with filters and pagination
 */
export const getCompanies = (
  filters: CompanySearchFilters = {}
): Promise<ApiCompaniesResponse> => {
  return api.get("/companies", { params: filters });
};

/**
 * Get single company by ID
 */
export const getCompany = (id: number): Promise<ApiCompanyResponse> => {
  return api.get(`/companies/${id}`);
};

/**
 * Create a new company
 */
export const createCompany = (
  data: CreateCompanyRequest
): Promise<ApiCompanyResponse> => {
  return api.post("/companies", data);
};

/**
 * Update company information
 */
export const updateCompany = (
  id: number,
  data: UpdateCompanyRequest
): Promise<ApiCompanyResponse> => {
  return api.patch(`/companies/${id}`, data);
};

/**
 * Delete company
 */
export const deleteCompany = (
  id: number
): Promise<{ success: boolean; message: string }> => {
  return api.delete(`/companies/${id}`);
};

/**
 * Request to join a company
 */
export const requestJoinCompany = (data: JoinCompanyRequest) => {
  return api.post("/companies/join", data);
};

/**
 * Get user's company membership
 */
export const getUserCompany = (): Promise<ApiUserCompanyResponse> => {
  return api.get("/companies/my-company");
};

/**
 * Get featured companies (for homepage)
 */
export const getFeaturedCompanies = (
  limit: number = 6
): Promise<ApiCompaniesResponse> => {
  return api.get("/companies", {
    params: {
      limit,
      sortBy: "created_at",
      sortOrder: "DESC",
    },
  });
};

/**
 * Follow a company
 */
export const followCompany = (
  companyId: number
): Promise<FollowCompanyResponse> => {
  return api.post(`/companies/${companyId}/follow`);
};

/**
 * Unfollow a company
 */
export const unfollowCompany = (
  companyId: number
): Promise<FollowCompanyResponse> => {
  return api.delete(`/companies/${companyId}/follow`);
};

/**
 * Get jobs from a specific company
 */
export const getCompanyJobs = (
  companyId: number,
  filters: CompanyJobsFilters = {}
): Promise<ApiJobsResponse> => {
  return api.get(`/companies/${companyId}/jobs`, { params: filters });
};
