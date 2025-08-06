// Saved Jobs Types - Use JobPost directly from API
export interface SavedJobPost {
  job_id: number;
  company_id: number;
  job_title: string;
  location?: string;
  salary_min?: number;
  salary_max?: number;
  job_type?: string;
  company: {
    company_id: number;
    company_name: string;
    company_image?: string;
  };
}

export interface SavedJobsResponse {
  jobs: SavedJobPost[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface SavedJobsFilters {
  page?: number;
  limit?: number;
  search?: string;
  location?: string;
  job_type?: string;
}
