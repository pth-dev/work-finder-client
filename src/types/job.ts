import type { Company } from "./company";
import type { BaseSearchParams, PaginatedApiResponse } from "./api";

export interface Job {
  id: string;
  title: string;
  description: string;
  summary: string;
  requirements: string[];
  benefits: string[];
  location: string;
  workType: "remote" | "hybrid" | "onsite";
  employmentType: "full-time" | "part-time" | "contract" | "internship";
  experienceLevel: "entry" | "mid" | "senior" | "lead";
  salary: {
    min: number;
    max: number;
    currency: string;
    period: "hourly" | "monthly" | "yearly";
  };
  company: Company;
  skills: string[];
  tags: string[];
  postedAt: string;
  deadline: string;
  applicationsCount: number;
  isBookmarked?: boolean;
  featured?: boolean;
  urgent?: boolean;
  status: "active" | "closed" | "draft";
}

export interface JobsResponse extends PaginatedApiResponse<Job> {}

export interface JobSearchParams extends BaseSearchParams {
  location?: string;
  workType?: Job["workType"][];
  employmentType?: Job["employmentType"][];
  experienceLevel?: Job["experienceLevel"][];
  salaryRange?: {
    min: number;
    max: number;
  };
  skills?: string[];
  companySize?: string[];
  industry?: string[];
  postedWithin?: "day" | "week" | "month" | "all";
}

export interface JobFilters {
  search?: string;
  location?: string;
  workType?: Job["workType"][];
  employmentType?: Job["employmentType"][];
  experienceLevel?: Job["experienceLevel"][];
  salaryRange?: {
    min: number;
    max: number;
  };
  skills?: string[];
  companySize?: string[];
  industry?: string[];
  postedWithin?: "day" | "week" | "month" | "all";
}

export interface JobApplication {
  id: string;
  jobId: string;
  userId: string;
  coverLetter: string;
  resumeUrl: string;
  status: "pending" | "reviewed" | "shortlisted" | "rejected" | "accepted";
  appliedAt: string;
  updatedAt: string;
}
