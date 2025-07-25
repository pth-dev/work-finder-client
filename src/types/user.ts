export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: "job_seeker" | "employer" | "admin";
  profile: UserProfile;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  phone?: string;
  location?: string;
  bio?: string;
  website?: string;
  linkedIn?: string;
  github?: string;
  skills: string[];
  experience: WorkExperience[];
  education: Education[];
  resumeUrl?: string;
  preferences: JobPreferences;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  description: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  skills: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  gpa?: number;
  description?: string;
}

export interface JobPreferences {
  desiredRoles: string[];
  preferredLocations: string[];
  workType: ("remote" | "hybrid" | "onsite")[];
  employmentType: ("full-time" | "part-time" | "contract" | "internship")[];
  salaryExpectation: {
    min: number;
    max: number;
    currency: string;
    period: "hourly" | "monthly" | "yearly";
  };
  willingToRelocate: boolean;
}
