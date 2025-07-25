/**
 * Companies API Functions
 * Using native fetch() with proper error handling
 */

import {
  handleResponse,
  getApiBaseUrl,
  buildQueryString,
  createFetchOptions,
} from "./utils";
import type { Job } from "@/types/job";
import type {
  Company,
  CompaniesResponse,
  CompanySearchParams,
} from "@/types/company";

// Base API URL
const API_BASE_URL = getApiBaseUrl();

/**
 * Get all companies with optional filtering
 */
export async function fetchCompanies(
  params?: CompanySearchParams
): Promise<CompaniesResponse> {
  const queryString = params ? buildQueryString(params) : "";
  const url = `${API_BASE_URL}/companies${
    queryString ? `?${queryString}` : ""
  }`;

  const response = await fetch(
    url,
    createFetchOptions({
      method: "GET",
    })
  );

  return handleResponse<CompaniesResponse>(response);
}

/**
 * Get company by ID
 */
export async function fetchCompany(id: string): Promise<Company> {
  const response = await fetch(
    `${API_BASE_URL}/companies/${id}`,
    createFetchOptions({
      method: "GET",
    })
  );

  return handleResponse<Company>(response);
}

/**
 * Search companies with query
 */
export async function searchCompanies(
  params: CompanySearchParams
): Promise<CompaniesResponse> {
  const queryString = buildQueryString(params);
  const url = `${API_BASE_URL}/companies/search?${queryString}`;

  const response = await fetch(
    url,
    createFetchOptions({
      method: "GET",
    })
  );

  return handleResponse<CompaniesResponse>(response);
}

/**
 * Get jobs from a specific company
 */
export async function fetchCompanyJobs(
  companyId: string,
  params?: { page?: number; limit?: number }
): Promise<{ jobs: Job[]; total: number }> {
  const queryString = params ? buildQueryString(params) : "";
  const url = `${API_BASE_URL}/companies/${companyId}/jobs${
    queryString ? `?${queryString}` : ""
  }`;

  const response = await fetch(
    url,
    createFetchOptions({
      method: "GET",
    })
  );

  return handleResponse<{ jobs: Job[]; total: number }>(response);
}

/**
 * Follow a company
 */
export async function followCompany(companyId: string): Promise<void> {
  const response = await fetch(
    `${API_BASE_URL}/companies/${companyId}/follow`,
    createFetchOptions({
      method: "POST",
    })
  );

  if (!response.ok) {
    await handleResponse(response); // This will throw with proper error message
  }
}

/**
 * Unfollow a company
 */
export async function unfollowCompany(companyId: string): Promise<void> {
  const response = await fetch(
    `${API_BASE_URL}/companies/${companyId}/follow`,
    createFetchOptions({
      method: "DELETE",
    })
  );

  if (!response.ok) {
    await handleResponse(response); // This will throw with proper error message
  }
}

/**
 * Create a new company (for employers)
 */
export async function createCompany(
  companyData: Partial<Company>
): Promise<Company> {
  const response = await fetch(
    `${API_BASE_URL}/companies`,
    createFetchOptions({
      method: "POST",
      body: JSON.stringify(companyData),
    })
  );

  return handleResponse<Company>(response);
}

/**
 * Update a company (for employers)
 */
export async function updateCompany(
  companyId: string,
  companyData: Partial<Company>
): Promise<Company> {
  const response = await fetch(
    `${API_BASE_URL}/companies/${companyId}`,
    createFetchOptions({
      method: "PUT",
      body: JSON.stringify(companyData),
    })
  );

  return handleResponse<Company>(response);
}

/**
 * Delete a company (for employers)
 */
export async function deleteCompany(companyId: string): Promise<void> {
  const response = await fetch(
    `${API_BASE_URL}/companies/${companyId}`,
    createFetchOptions({
      method: "DELETE",
    })
  );

  if (!response.ok) {
    await handleResponse(response); // This will throw with proper error message
  }
}

/**
 * Get featured companies
 */
export async function fetchFeaturedCompanies(limit = 6): Promise<Company[]> {
  const response = await fetch(
    `${API_BASE_URL}/companies?featured=true&limit=${limit}`,
    createFetchOptions({
      method: "GET",
    })
  );

  const result = await handleResponse<CompaniesResponse>(response);
  return result.items;
}

/**
 * Get top companies by followers
 */
export async function fetchTopCompanies(limit = 10): Promise<Company[]> {
  const response = await fetch(
    `${API_BASE_URL}/companies?sort=followers&limit=${limit}`,
    createFetchOptions({
      method: "GET",
    })
  );

  const result = await handleResponse<CompaniesResponse>(response);
  return result.items;
}

/**
 * Get companies by industry
 */
export async function fetchCompaniesByIndustry(
  industry: string,
  limit = 10
): Promise<Company[]> {
  const response = await fetch(
    `${API_BASE_URL}/companies?industry=${encodeURIComponent(
      industry
    )}&limit=${limit}`,
    createFetchOptions({
      method: "GET",
    })
  );

  const result = await handleResponse<CompaniesResponse>(response);
  return result.items;
}
