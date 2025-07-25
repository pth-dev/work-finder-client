/**
 * Applications API Functions
 * Using native fetch() with proper error handling
 */

import { handleResponse, getApiBaseUrl, buildQueryString, createFetchOptions } from './utils';
import { fetchWithAuth } from './with-auth';
import type { Job } from './jobs';
import type { Company } from './companies';

// Types
export interface Application {
  id: string;
  job: Job;
  company: Company;
  status: 'pending' | 'reviewing' | 'interviewed' | 'offered' | 'rejected' | 'withdrawn';
  appliedAt: string;
  updatedAt: string;
  coverLetter?: string;
  resume?: string;
  notes?: string;
  interviewDate?: string;
  feedback?: string;
}

export interface ApplicationsResponse {
  applications: Application[];
  total: number;
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface ApplicationStats {
  total: number;
  pending: number;
  reviewing: number;
  interviewed: number;
  offered: number;
  rejected: number;
  withdrawn: number;
}

export interface ApplicationSearchParams {
  status?: string;
  company_id?: string;
  job_id?: string;
  page?: number;
  limit?: number;
  sort?: 'newest' | 'oldest' | 'status';
}

// Base API URL
const API_BASE_URL = getApiBaseUrl();

/**
 * Get all applications with optional filtering
 */
export async function fetchApplications(params?: ApplicationSearchParams): Promise<ApplicationsResponse> {
  const queryString = params ? buildQueryString(params) : '';
  const url = `${API_BASE_URL}/applications${queryString ? `?${queryString}` : ''}`;
  
  const response = await fetchWithAuth(url, createFetchOptions({
    method: 'GET',
  }));
  
  return handleResponse<ApplicationsResponse>(response);
}

/**
 * Get application by ID
 */
export async function fetchApplication(id: string): Promise<Application> {
  const response = await fetchWithAuth(`${API_BASE_URL}/applications/${id}`, createFetchOptions({
    method: 'GET',
  }));
  
  return handleResponse<Application>(response);
}

/**
 * Get application statistics
 */
export async function fetchApplicationStats(): Promise<ApplicationStats> {
  const response = await fetchWithAuth(`${API_BASE_URL}/applications/stats`, createFetchOptions({
    method: 'GET',
  }));
  
  return handleResponse<ApplicationStats>(response);
}

/**
 * Create a new application
 */
export async function createApplication(applicationData: {
  jobId: string;
  coverLetter?: string;
  resume?: string;
}): Promise<Application> {
  const response = await fetchWithAuth(`${API_BASE_URL}/applications`, createFetchOptions({
    method: 'POST',
    body: JSON.stringify(applicationData),
  }));
  
  return handleResponse<Application>(response);
}

/**
 * Update an application
 */
export async function updateApplication(applicationId: string, applicationData: Partial<Application>): Promise<Application> {
  const response = await fetchWithAuth(`${API_BASE_URL}/applications/${applicationId}`, createFetchOptions({
    method: 'PUT',
    body: JSON.stringify(applicationData),
  }));
  
  return handleResponse<Application>(response);
}

/**
 * Withdraw an application
 */
export async function withdrawApplication(applicationId: string): Promise<void> {
  const response = await fetchWithAuth(`${API_BASE_URL}/applications/${applicationId}`, createFetchOptions({
    method: 'DELETE',
  }));
  
  if (!response.ok) {
    await handleResponse(response); // This will throw with proper error message
  }
}

/**
 * Get applications by status
 */
export async function fetchApplicationsByStatus(status: string, params?: { page?: number; limit?: number }): Promise<ApplicationsResponse> {
  const queryString = buildQueryString({ status, ...params });
  const url = `${API_BASE_URL}/applications?${queryString}`;
  
  const response = await fetchWithAuth(url, createFetchOptions({
    method: 'GET',
  }));
  
  return handleResponse<ApplicationsResponse>(response);
}

/**
 * Get recent applications
 */
export async function fetchRecentApplications(limit = 10): Promise<Application[]> {
  const response = await fetchWithAuth(`${API_BASE_URL}/applications?sort=newest&limit=${limit}`, createFetchOptions({
    method: 'GET',
  }));
  
  const result = await handleResponse<ApplicationsResponse>(response);
  return result.applications;
}

/**
 * Check if user has applied to a job
 */
export async function checkJobApplication(jobId: string): Promise<{ hasApplied: boolean; applicationId?: string }> {
  const response = await fetchWithAuth(`${API_BASE_URL}/jobs/${jobId}/application-status`, createFetchOptions({
    method: 'GET',
  }));
  
  return handleResponse<{ hasApplied: boolean; applicationId?: string }>(response);
}
