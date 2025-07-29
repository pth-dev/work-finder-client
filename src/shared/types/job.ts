export type JobType = 'full-time' | 'part-time' | 'contract' | 'internship' | 'freelance';
export type ExperienceLevel = 'entry-level' | 'mid-level' | 'senior-level' | 'executive';
export type WorkLocation = 'remote' | 'hybrid' | 'on-site';

export interface JobSalary {
  min: number;
  max: number;
  currency: string;
  period: 'hourly' | 'monthly' | 'yearly';
}

export interface JobRequirement {
  id: string;
  type: 'skill' | 'experience' | 'education' | 'language';
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  required: boolean;
}

export interface JobBenefit {
  id: string;
  name: string;
  description?: string;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  summary: string;
  companyId: string;
  companyName: string;
  companyLogo?: string;
  type: JobType;
  experienceLevel: ExperienceLevel;
  workLocation: WorkLocation;
  location: {
    city: string;
    state: string;
    country: string;
    isRemote: boolean;
  };
  salary?: JobSalary;
  requirements: JobRequirement[];
  benefits: JobBenefit[];
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
  applicationDeadline?: string;
  contactEmail?: string;
  applicationUrl?: string;
}

export interface JobFilter {
  query?: string;
  location?: string;
  type?: JobType[];
  experienceLevel?: ExperienceLevel[];
  workLocation?: WorkLocation[];
  salaryMin?: number;
  salaryMax?: number;
  categories?: string[];
  skills?: string[];
  companyId?: string;
  postedWithin?: 'day' | 'week' | 'month' | 'all';
  featured?: boolean;
  page?: number;
  limit?: number;
  sortBy?: 'relevance' | 'date' | 'salary' | 'company';
  sortOrder?: 'asc' | 'desc';
}

export interface JobSearchResult {
  jobs: Job[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
  filters: JobFilter;
}

export interface SavedJob {
  id: string;
  userId: string;
  jobId: string;
  job: Job;
  savedAt: string;
  notes?: string;
}