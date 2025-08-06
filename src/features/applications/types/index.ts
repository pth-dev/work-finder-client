export const ApplicationStatus = {
  PENDING: "pending",
  REVIEWING: "reviewing",
  INTERVIEW_SCHEDULED: "interview_scheduled",
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
    title: string;
    company: {
      company_name: string;
      company_image?: string;
    };
  };
  resume?: {
    resume_id: number;
    file_name: string;
    file_path: string;
  };
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
