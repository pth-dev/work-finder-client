export type CompanySize = 'startup' | 'small' | 'medium' | 'large' | 'enterprise';
export type CompanyType = 'public' | 'private' | 'non-profit' | 'government' | 'startup';

export interface CompanyLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  isHeadquarters: boolean;
}

export interface CompanySocialLinks {
  website?: string;
  linkedin?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
  github?: string;
}

export interface CompanyBenefit {
  id: string;
  name: string;
  description: string;
  category: 'health' | 'financial' | 'time-off' | 'development' | 'perks' | 'other';
}

export interface CompanyReview {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number; // 1-5
  title: string;
  content: string;
  pros: string[];
  cons: string[];
  advice?: string;
  position: string;
  employmentType: 'current' | 'former';
  workLocation: 'remote' | 'hybrid' | 'on-site';
  yearsWorked: number;
  createdAt: string;
  helpful: number;
  notHelpful: number;
  isVerified: boolean;
}

export interface CompanyStats {
  totalEmployees: number;
  totalJobs: number;
  averageRating: number;
  totalReviews: number;
  responseRate: number; // percentage
  avgResponseTime: number; // in days
  hiringGrowth: number; // percentage change
}

export interface Company {
  id: string;
  name: string;
  slug: string;
  description: string;
  mission?: string;
  vision?: string;
  values?: string[];
  logo?: string;
  coverImage?: string;
  size: CompanySize;
  type: CompanyType;
  foundedYear?: number;
  industry: string;
  specialties: string[];
  locations: CompanyLocation[];
  socialLinks: CompanySocialLinks;
  benefits: CompanyBenefit[];
  stats: CompanyStats;
  isVerified: boolean;
  isSponsored: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CompanyFilter {
  query?: string;
  industry?: string[];
  size?: CompanySize[];
  type?: CompanyType[];
  location?: string;
  minRating?: number;
  hasJobs?: boolean;
  isVerified?: boolean;
  page?: number;
  limit?: number;
  sortBy?: 'name' | 'rating' | 'jobs' | 'employees' | 'founded';
  sortOrder?: 'asc' | 'desc';
}

export interface CompanySearchResult {
  companies: Company[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
  filters: CompanyFilter;
}