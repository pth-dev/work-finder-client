// ===== JOB TYPES =====

export type ApiJobType =
  | "full_time"
  | "part_time"
  | "contract"
  | "freelance"
  | "internship"
  | "temporary";

export type ApiJobStatus = "active" | "inactive" | "closed" | "draft";

export interface ApiCompany {
  company_id: number;
  company_name: string;
  description?: string;
  company_image?: string;
  industry?: string;
  website?: string;
  address?: string;
  location?: string;
  company_size?: string;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface ApiJobPost {
  job_id: number;
  company_id: number;
  job_title: string;
  description?: string;
  requirements?: string;
  benefits?: string;
  location?: string;
  category?: string;
  salary_min?: number;
  salary_max?: number;
  salary?: string;
  job_type?: ApiJobType;
  status: ApiJobStatus;
  posted_date: string;
  updated_at: string;
  expires_at?: string;
  view_count: number;
  save_count: number;
  application_count: number;
  company?: ApiCompany; // Optional populated relation
}

// ===== API RESPONSE TYPES =====

export interface ApiJobsResponse {
  data: {
    jobs: ApiJobPost[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface ApiJobResponse {
  data: ApiJobPost;
}

// ===== SEARCH FILTER TYPES =====

export interface ApiJobSearchFilters {
  page?: number;
  limit?: number;
  search?: string;
  location?: string;
  category?: string;
  job_type?: ApiJobType;
  salary_min?: number;
  salary_max?: number;
  company_id?: number;
  sortBy?: string;
  sortOrder?: "ASC" | "DESC";
}
