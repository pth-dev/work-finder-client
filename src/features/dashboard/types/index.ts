// Dashboard Types
export interface DashboardStats {
  total: number;
  byStatus: {
    [key: string]: number;
  };
}

export interface UserApplication {
  application_id: number;
  job_id: number;
  resume_id: number;
  user_id: number;
  status: string;
  applied_at: string;
  updated_at: string;
  job_post?: {
    job_id: number;
    job_title: string;
    title: string; // Alias for job_title
    location?: string;
    salary_min?: number;
    salary_max?: number;
    job_type?: string;
    company: {
      company_id: number;
      company_name: string;
      company_image?: string;
    };
  };
}

export interface SavedJobsResponse {
  data: any[];
  meta: {
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}
