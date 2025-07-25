export interface JobCategory {
  id: string;
  title: string;
  jobCount: string;
  iconName: string;
  href?: string;
}

export interface CategoryFilters {
  search?: string;
  location?: string;
  experienceLevel?: string[];
  employmentType?: string[];
  salaryRange?: {
    min: number;
    max: number;
  };
}

export interface CategoryStats {
  totalJobs: number;
  newJobsToday: number;
  topCategories: JobCategory[];
}
