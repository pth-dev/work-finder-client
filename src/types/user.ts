export type UserRole = 'job_seeker' | 'employer' | 'admin';
export type ProfileCompletionStatus = 'incomplete' | 'basic' | 'complete' | 'premium';

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  avatar?: string;
  title?: string;
  summary?: string;
  location: {
    city: string;
    state: string;
    country: string;
  };
  website?: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
}

export interface WorkExperience {
  id: string;
  companyName: string;
  companyLogo?: string;
  position: string;
  description: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  location: string;
  achievements: string[];
  skills: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  gpa?: number;
  achievements: string[];
  description?: string;
}

export interface Skill {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  category: string;
  yearsOfExperience: number;
  isEndorsed: boolean;
  endorsements: number;
}

export interface Language {
  id: string;
  name: string;
  proficiency: 'basic' | 'conversational' | 'professional' | 'native';
}

export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  description?: string;
}

export interface UserPreferences {
  jobTypes: string[];
  workLocation: string[];
  industries: string[];
  salaryMin?: number;
  salaryMax?: number;
  locations: string[];
  remoteWork: boolean;
  willingToRelocate: boolean;
  availabilityDate?: string;
  emailNotifications: {
    jobAlerts: boolean;
    applicationUpdates: boolean;
    companyUpdates: boolean;
    newsletter: boolean;
  };
}

export interface User {
  id: string;
  role: UserRole;
  profile: UserProfile;
  workExperience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  languages: Language[];
  certificates: Certificate[];
  preferences: UserPreferences;
  profileCompletion: ProfileCompletionStatus;
  profileCompletionScore: number; // 0-100
  isProfilePublic: boolean;
  isEmailVerified: boolean;
  isPremium: boolean;
  createdAt: string;
  updatedAt: string;
  lastLoginAt: string;
}

export interface UserStats {
  totalApplications: number;
  pendingApplications: number;
  interviewsScheduled: number;
  jobsViewed: number;
  profileViews: number;
  savedJobs: number;
  completedAssessments: number;
}