// Interview types for recruiter features

export interface ApiCandidate {
  user_id: number;
  full_name: string;
  email: string;
  phone?: string;
  avatar_url?: string;
  location?: string;
}

export interface ApiJobPost {
  job_id: number;
  job_title: string;
  company?: {
    company_id: number;
    company_name: string;
    company_image?: string;
  };
}

export interface ApiInterview {
  interview_id: number;
  application_id: number;
  candidate?: ApiCandidate;
  job_post?: ApiJobPost;
  interview_type: InterviewType;
  status: InterviewStatus;
  scheduled_at: string;
  duration_minutes: number;
  location?: string;
  meeting_link?: string;
  notes?: string;
  feedback?: string;
  rating?: number;
  created_at: string;
  updated_at: string;
}

export interface ApiInterviewsResponse {
  interviews: ApiInterview[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const InterviewType = {
  PHONE: "phone",
  VIDEO: "video",
  IN_PERSON: "in_person",
} as const;

export type InterviewType = (typeof InterviewType)[keyof typeof InterviewType];

export const InterviewStatus = {
  SCHEDULED: "scheduled",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
  RESCHEDULED: "rescheduled",
  NO_SHOW: "no_show",
} as const;

export type InterviewStatus =
  (typeof InterviewStatus)[keyof typeof InterviewStatus];

export interface InterviewFilters {
  search?: string;
  status?: InterviewStatus;
  type?: InterviewType;
  jobId?: number;
  dateFrom?: string;
  dateTo?: string;
  page?: number;
  limit?: number;
  sortBy?: "scheduled_at" | "created_at" | "updated_at" | "status";
  sortOrder?: "asc" | "desc";
}

export interface CreateInterviewRequest {
  application_id: number;
  interview_type: InterviewType;
  scheduled_at: string;
  duration_minutes: number;
  location?: string;
  meeting_link?: string;
  notes?: string;
}

export interface UpdateInterviewRequest {
  status?: InterviewStatus;
  scheduled_at?: string;
  duration_minutes?: number;
  location?: string;
  meeting_link?: string;
  notes?: string;
  feedback?: string;
  rating?: number;
}

export interface InterviewStats {
  total: number;
  scheduled: number;
  completed: number;
  cancelled: number;
  rescheduled: number;
  no_show: number;
}

// UI-specific types
export interface InterviewCardProps {
  interview: ApiInterview;
  onStatusChange: (interviewId: number, status: InterviewStatus) => void;
  onViewDetail: (interview: ApiInterview) => void;
  onEdit: (interview: ApiInterview) => void;
  isSelected?: boolean;
  onSelect?: (interviewId: number) => void;
}

export interface InterviewFiltersProps {
  filters: InterviewFilters;
  onFiltersChange: (filters: InterviewFilters) => void;
  jobOptions?: Array<{ value: number; label: string }>;
  isLoading?: boolean;
}

export interface InterviewTableProps {
  interviews: ApiInterview[];
  selectedInterviews: number[];
  onSelectInterview: (interviewId: number) => void;
  onSelectAll: (checked: boolean) => void;
  onViewDetail: (interview: ApiInterview) => void;
  onStatusChange: (interviewId: number, status: InterviewStatus) => void;
  onEdit: (interview: ApiInterview) => void;
  isLoading?: boolean;
}
