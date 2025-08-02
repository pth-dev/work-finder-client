// ✅ BACKEND-FIRST: Simple types matching backend format
export type CompanySize = string; // Backend uses simple string like "100-500"

// ✅ BACKEND-FIRST: Company interface matching backend entity exactly
export interface Company {
  company_id: number; // Backend uses number ID
  company_name: string; // Backend uses snake_case
  description?: string;
  company_image?: string; // Backend field name
  industry?: string;
  website?: string;
  address?: string;
  location?: string; // Simple string like "Hà Nội"
  company_size?: string; // Simple string like "100-500"
  is_verified: boolean; // Backend uses snake_case
  created_at: string; // Backend uses snake_case
  updated_at: string; // Backend uses snake_case
  job_count?: number; // Computed field from backend
}

// ✅ BACKEND-FIRST: Simplified filter interface matching backend API
export interface CompanyFilter {
  search?: string; // Backend uses 'search' not 'query'
  industry?: string; // Backend uses single string
  page?: number;
  limit?: number;
}

// ✅ BACKEND-FIRST: Response interface matching backend format
export interface CompanySearchResult {
  companies: Company[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  // Removed hasNext/hasPrev - can be calculated from other fields
}
