import { api } from "@/lib/api-client";
import {
  ApiJobsResponse,
  ApiJobResponse,
  ApiJobSearchFilters,
  CreateJobRequest,
  UpdateJobRequest,
} from "@/features/jobs/types";

// ===== RECRUITER JOB MANAGEMENT APIs =====

/**
 * Create a new job posting (Recruiter only)
 */
export const createJob = (
  jobData: CreateJobRequest
): Promise<ApiJobResponse> => {
  return api.post("/jobs", jobData);
};

/**
 * Update job posting (Recruiter only)
 */
export const updateJob = (
  jobId: number,
  jobData: UpdateJobRequest
): Promise<ApiJobResponse> => {
  return api.patch(`/jobs/${jobId}`, jobData);
};

/**
 * Get job details by ID (Recruiter only)
 */
export const getJobById = (jobId: number): Promise<ApiJobResponse> => {
  return api.get(`/jobs/${jobId}`);
};

/**
 * Update job status (Recruiter only)
 */
export const updateJobStatus = (
  jobId: number,
  status: string
): Promise<ApiJobResponse> => {
  return api.patch(`/jobs/${jobId}`, { status });
};

/**
 * Extend job expiration (Recruiter only)
 */
export const extendJob = (
  jobId: number,
  expiresAt: string
): Promise<ApiJobResponse> => {
  return api.post(`/jobs/${jobId}/extend`, { expires_at: expiresAt });
};

/**
 * Delete job posting (Recruiter only)
 */
export const deleteJob = (jobId: number): Promise<void> => {
  return api.delete(`/jobs/${jobId}`);
};

/**
 * Get jobs posted by current user's company (Recruiter only)
 */
export const getMyCompanyJobs = async (
  filters: ApiJobSearchFilters = {}
): Promise<ApiJobsResponse> => {
  try {
    // First get user's company info
    const companyResponse = await api.get("/companies/my-company");

    if (!companyResponse.data || !companyResponse.data.company) {
      // User doesn't belong to any company
      return {
        data: {
          jobs: [],
          total: 0,
          page: filters.page || 1,
          limit: filters.limit || 10,
          totalPages: 0,
        },
      };
    }

    const companyId = companyResponse.data.company.company_id;

    // Get jobs for this company using the companies/:id/jobs endpoint
    // Include all statuses for job management (DRAFT, PENDING, ACTIVE, etc.)
    const jobsResponse = await api.get(
      `/companies/${companyId}/jobs?includeAllStatuses=true`
    );

    // Transform response to match expected format
    const jobs = jobsResponse.data?.jobs || [];

    // Apply client-side filtering if needed
    let filteredJobs = jobs;

    if (filters.search) {
      filteredJobs = jobs.filter(
        (job: any) =>
          job.job_title
            ?.toLowerCase()
            .includes(filters.search!.toLowerCase()) ||
          job.description?.toLowerCase().includes(filters.search!.toLowerCase())
      );
    }

    if (filters.status) {
      filteredJobs = filteredJobs.filter(
        (job: any) => job.status === filters.status
      );
    }

    if (filters.job_type) {
      filteredJobs = filteredJobs.filter(
        (job: any) => job.job_type === filters.job_type
      );
    }

    // Apply pagination
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedJobs = filteredJobs.slice(startIndex, endIndex);

    return {
      data: {
        jobs: paginatedJobs,
        total: filteredJobs.length,
        page,
        limit,
        totalPages: Math.ceil(filteredJobs.length / limit),
      },
    };
  } catch (error: any) {
    console.error("Error fetching company jobs:", error);

    // If user doesn't have a company (404 or similar error), return empty results
    if (
      error.response?.status === 404 ||
      error.response?.data?.message?.includes("Company not found")
    ) {
      return {
        data: {
          jobs: [],
          total: 0,
          page: filters.page || 1,
          limit: filters.limit || 10,
          totalPages: 0,
        },
      };
    }

    throw error;
  }
};
