import { api } from "@/lib/api-client";
import {
  CompanySearchFilters,
  ApiCompaniesResponse,
  ApiCompanyResponse,
  CreateCompanyRequest,
  UpdateCompanyRequest,
  JoinCompanyRequest,
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
export const getUserCompany = () => {
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
