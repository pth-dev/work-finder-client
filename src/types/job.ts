// ✅ BACKEND-FIRST: Simple types matching backend enums
export type JobType =
  | "full_time"
  | "part_time"
  | "contract"
  | "internship"
  | "freelance";
export type JobStatus = "active" | "inactive" | "expired" | "draft";

// ✅ BACKEND-FIRST: Company info from populated relation
export interface JobCompany {
  company_id: number;
  company_name: string;
  company_image?: string;
  location?: string;
  is_verified: boolean;
}

// 🔄 KEEP ORIGINAL: Job interface for existing components
export interface Job {
  id: string;
  title: string;
  description: string;
  summary: string;
  companyId: string;
  companyName: string;
  companyLogo?: string;
  type: JobType;
  experienceLevel?: string; // Add missing field for mock data
  location: {
    city: string;
    state: string;
    country: string;
    isRemote: boolean;
  };
  salary?: {
    min: number;
    max: number;
    currency: string;
    period: "hourly" | "monthly" | "yearly";
  };
  skills: string[];
  categories: string[];
  postedAt: string;
  updatedAt: string;
  expiresAt?: string;
  isActive: boolean;
  applicationsCount: number;
  viewsCount: number;
  featured: boolean;
  urgent: boolean;
}

// ✅ NEW: Backend job interface for direct API consumption
export interface BackendJob {
  job_id: number;
  company_id: number;
  job_title: string;
  description?: string;
  location?: string;
  category?: string;
  salary_min?: number;
  salary_max?: number;
  salary?: string;
  job_type?: JobType;
  status: JobStatus;
  posted_date: string;
  expires_at?: string;
  view_count: number;
  save_count: number;
  application_count: number;
  company?: JobCompany;
}

// ✅ BACKEND-FIRST: Filter interface matching backend API
export interface JobFilter {
  search?: string; // Backend uses 'search' not 'query'
  location?: string;
  category?: string;
  job_type?: JobType; // Backend uses single value
  company_id?: number; // Backend uses number ID
  page?: number;
  limit?: number;
  sortBy?: "posted_date" | "salary" | "save_count";
  sortOrder?: "ASC" | "DESC"; // Backend uses uppercase
}

// ✅ BACKEND-FIRST: Response interface matching backend format
export interface JobSearchResult {
  jobs: Job[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  // Removed hasNext/hasPrev - can be calculated from other fields
}
