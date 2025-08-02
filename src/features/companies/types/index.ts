// ===== COMPANY TYPES =====

export interface CompanySearchFilters {
  page?: number;
  limit?: number;
  search?: string;
  industry?: string;
}

export interface ApiCompany {
  company_id: number;
  company_name: string; // ← API trả về "company_name", không phải "name"
  description?: string | null;
  company_image?: string | null; // ← API trả về "company_image", không phải "logo"
  industry?: string | null;
  company_size?: string | null; // ← API trả về "company_size", không phải "size"
  website?: string | null;
  address?: string | null; // ← API có field "address"
  location?: string | null;
  founded_year?: number | null;
  employee_count?: number | null;
  is_verified?: boolean; // ← API có field "is_verified"
  job_count?: number; // ← API trả về job_count từ backend optimization
  created_at: string;
  updated_at: string;
}

// ===== API RESPONSE TYPES =====

export interface ApiCompaniesResponse {
  success: boolean;
  data: {
    companies: ApiCompany[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  message: string;
}

export interface ApiCompanyResponse {
  success: boolean;
  data: ApiCompany;
  message: string;
}

// ===== REQUEST TYPES =====

export interface CreateCompanyRequest {
  name: string;
  description: string;
  industry: string;
  size: string;
  website?: string;
  logo?: string;
  location: string;
  founded_year?: number;
  employee_count?: number;
}

export interface UpdateCompanyRequest extends Partial<CreateCompanyRequest> {}

export interface JoinCompanyRequest {
  company_id: number;
  message?: string;
}
