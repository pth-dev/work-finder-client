import type { BaseSearchParams, PaginatedApiResponse } from "./api";

export interface Company {
  id: string;
  name: string;
  description: string;
  logo?: string;
  website?: string;
  location: string;
  industry: string;
  size: "startup" | "small" | "medium" | "large" | "enterprise";
  founded?: number;
  employees?: string;
  benefits: string[];
  culture: string[];
  socialLinks: {
    linkedin?: string;
    facebook?: string;
    twitter?: string;
    instagram?: string;
  };
  verified: boolean;
  featured: boolean;
  jobsCount: number;
  followersCount: number;
  rating?: number;
  reviewsCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CompanyFilters {
  search?: string;
  location?: string;
  industry?: string;
  size?: Company["size"][];
  verified?: boolean;
  featured?: boolean;
}

export interface CompanySearchParams extends BaseSearchParams {
  location?: string;
  industry?: string;
  size?: string;
  verified?: boolean;
  featured?: boolean;
  sort?: "newest" | "oldest" | "name" | "jobs_count" | "followers";
}

export interface CompaniesResponse extends PaginatedApiResponse<Company> {}
