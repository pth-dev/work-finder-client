// Application types based on backend API response
export interface ApiApplication {
  application_id: number;
  job_id: number;
  resume_id: number;
  user_id: number;
  status: ApplicationStatus;
  applied_at: string;
  updated_at: string;
  cover_letter?: string;

  // Relations
  job_post: {
    job_id: number;
    job_title: string;
    location: string;
    salary_min?: number;
    salary_max?: number;
    job_type: string;
    status: string;
    company: {
      company_id: number;
      company_name: string;
      company_image?: string;
    };
  };

  resume: {
    resume_id: number;
    file_name: string;
    file_path: string;
    user: {
      user_id: number;
      full_name: string;
      email: string;
      phone?: string;
      avatar?: string;
    };
  };
}

export interface ApiApplicationsResponse {
  applications: ApiApplication[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const ApplicationStatus = {
  PENDING: "pending",
  REVIEWING: "reviewing",
  INTERVIEWED: "interviewed",
  ACCEPTED: "accepted",
  REJECTED: "rejected",
  WITHDRAWN: "withdrawn",
} as const;

export type ApplicationStatus =
  (typeof ApplicationStatus)[keyof typeof ApplicationStatus];

export interface ApplicationFilters {
  search?: string;
  status?: ApplicationStatus;
  jobId?: number;
  page?: number;
  limit?: number;
  sortBy?: "applied_at" | "updated_at" | "status";
  sortOrder?: "asc" | "desc";
}

export interface UpdateApplicationRequest {
  status?: ApplicationStatus;
  recruiter_notes?: string;
  rejection_reason?: string;
}

export interface ApplicationStats {
  total: number;
  pending: number;
  reviewing: number;
  interview_scheduled: number;
  interviewed: number;
  accepted: number;
  rejected: number;
  withdrawn: number;
}

// UI-specific types
export interface ApplicationCardProps {
  application: ApiApplication;
  onStatusChange: (applicationId: number, status: ApplicationStatus) => void;
  onViewDetail: (application: ApiApplication) => void;
  isSelected?: boolean;
  onSelect?: (applicationId: number) => void;
}

export interface ApplicationFiltersProps {
  filters: ApplicationFilters;
  onFiltersChange: (filters: ApplicationFilters) => void;
  jobOptions?: Array<{ value: number; label: string }>;
  isLoading?: boolean;
}

export interface BulkActionType {
  type: "status_change" | "export" | "delete";
  payload?: any;
}
