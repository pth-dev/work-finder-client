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

export interface CreateApplicationRequest {
  job_id: number;
  resume_id: number;
  cover_letter?: string;
}

export interface Application {
  application_id: number;
  job_id: number;
  resume_id: number;
  user_id: number;
  status: ApplicationStatus;
  applied_at: string;
  updated_at: string;
  job_post?: {
    job_id: number;
    job_title: string;
    company_id: number;
    location?: string;
    job_type?: string;
    salary_min?: number;
    salary_max?: number;
    description?: string;
    requirements?: string;
    benefits?: string;
    company?: {
      company_id: number;
      company_name: string;
      company_image?: string;
    };
  };
  resume?: {
    resume_id: number;
    user_id: number;
    file_name: string;
    file_path: string;
    upload_time?: string;
  };
  interviews?: Array<{
    interview_id: number;
    application_id: number;
    interviewer_id?: number;
    interview_type: string;
    scheduled_at?: string;
    status?: string;
    notes?: string;
  }>;
  user?: {
    user_id: number;
    full_name: string;
    email: string;
  };
}

export interface ApiApplicationResponse {
  data: Application;
  message?: string;
}

export interface ApiApplicationsResponse {
  data: Application[];
  message?: string;
}
