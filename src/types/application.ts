export type ApplicationStatus =
  | "draft"
  | "submitted"
  | "under_review"
  | "screening"
  | "interview_completed"
  | "reference_check"
  | "offer_pending"
  | "offer_accepted"
  | "offer_declined"
  | "rejected"
  | "withdrawn";

export interface ApplicationDocument {
  id: string;
  name: string;
  type: "resume" | "cover_letter" | "portfolio" | "certificate" | "other";
  url: string;
  size: number;
  uploadedAt: string;
}

export interface ApplicationNote {
  id: string;
  content: string;
  createdAt: string;
  createdBy: string; // user id
  isPrivate: boolean;
}

export interface InterviewSchedule {
  id: string;
  type: "phone" | "video" | "in_person" | "technical" | "group";
  title: string;
  description?: string;
  scheduledAt: string;
  duration: number; // in minutes
  location?: string;
  meetingUrl?: string;
  interviewers: {
    id: string;
    name: string;
    title: string;
    email: string;
  }[];
  status: "scheduled" | "completed" | "cancelled" | "rescheduled";
  feedback?: string;
  rating?: number; // 1-5
}

export interface ApplicationTimeline {
  id: string;
  status: ApplicationStatus;
  timestamp: string;
  description: string;
  performer?: {
    id: string;
    name: string;
    role: "applicant" | "recruiter" | "hiring_manager" | "system";
  };
  metadata?: Record<string, any>;
}

export interface Application {
  id: string;
  userId: string;
  jobId: string;
  job: {
    id: string;
    title: string;
    companyName: string;
    companyLogo?: string;
    location: string;
    type: string;
    salary?: {
      min: number;
      max: number;
      currency: string;
    };
  };
  status: ApplicationStatus;
  appliedAt: string;
  updatedAt: string;
  coverLetter?: string;
  documents: ApplicationDocument[];
  notes: ApplicationNote[];
  interviews: InterviewSchedule[];
  timeline: ApplicationTimeline[];
  recruiterFeedback?: string;
  rejectionReason?: string;
  withdrawalReason?: string;
  expectedSalary?: number;
  availabilityDate?: string;
  isUrgent: boolean;
  priority: "low" | "medium" | "high";
  tags: string[];
  customFields: Record<string, any>;
}

export interface ApplicationFilter {
  status?: ApplicationStatus[];
  jobTitle?: string;
  companyName?: string;
  appliedDateFrom?: string;
  appliedDateTo?: string;
  priority?: ("low" | "medium" | "high")[];
  tags?: string[];
  hasInterview?: boolean;
  page?: number;
  limit?: number;
  sortBy?: "appliedAt" | "updatedAt" | "companyName" | "jobTitle" | "status";
  sortOrder?: "asc" | "desc";
}

export interface ApplicationSearchResult {
  applications: Application[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
  statusCounts: Record<ApplicationStatus, number>;
  filters: ApplicationFilter;
}

export interface ApplicationStats {
  total: number;
  statusBreakdown: Record<ApplicationStatus, number>;
  averageResponseTime: number; // in days
  responseRate: number; // percentage
  interviewRate: number; // percentage
  offerRate: number; // percentage
  thisMonth: number;
  lastMonth: number;
  monthlyGrowth: number; // percentage
}
