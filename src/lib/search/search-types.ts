// Shared search types across the app
export interface BaseSearchParams {
  query?: string;
  page?: number;
  limit?: number;
  sortBy?: 'relevance' | 'date' | 'salary';
  sortOrder?: 'asc' | 'desc';
}

export interface JobSearchParams extends BaseSearchParams {
  location?: string;
  category?: string;
  salaryRange?: [number, number];
  jobType?: 'full-time' | 'part-time' | 'contract' | 'internship';
  experience?: 'entry' | 'mid' | 'senior' | 'executive';
  remote?: boolean;
  datePosted?: '24h' | '7d' | '30d' | 'any';
  companySize?: 'startup' | 'small' | 'medium' | 'large';
}

export interface CompanySearchParams extends BaseSearchParams {
  industry?: string;
  size?: 'startup' | 'small' | 'medium' | 'large';
  location?: string;
  founded?: string;
}

export interface SearchResult<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  facets?: SearchFacets;
}

export interface SearchFacets {
  locations: FacetItem[];
  categories: FacetItem[];
  jobTypes: FacetItem[];
  experienceLevels: FacetItem[];
  salaryRanges: FacetItem[];
  companies: FacetItem[];
}

export interface FacetItem {
  value: string;
  label: string;
  count: number;
}

export interface SearchSuggestion {
  text: string;
  type: 'keyword' | 'company' | 'location' | 'category';
  count?: number;
}

// Job-related types
export interface Job {
  id: string;
  title: string;
  company: {
    id: string;
    name: string;
    logo?: string;
    size?: string;
  };
  location: string;
  salary?: {
    min: number;
    max: number;
    currency: string;
    period: 'hour' | 'month' | 'year';
  };
  jobType: JobSearchParams['jobType'];
  experience: JobSearchParams['experience'];
  description: string;
  requirements: string[];
  benefits: string[];
  remote: boolean;
  featured: boolean;
  postedAt: string;
  expiresAt?: string;
  category: string;
  tags: string[];
}

// Company-related types
export interface Company {
  id: string;
  name: string;
  logo?: string;
  description: string;
  industry: string;
  size: CompanySearchParams['size'];
  location: string;
  website?: string;
  founded?: string;
  employees?: string;
  jobCount: number;
  rating?: number;
  benefits: string[];
}

// Search state management
export interface SearchState {
  query: string;
  filters: JobSearchParams;
  results: SearchResult<Job> | null;
  loading: boolean;
  error: string | null;
  suggestions: SearchSuggestion[];
  recentSearches: string[];
}

// Search events
export interface SearchEvents {
  onSearch: (params: JobSearchParams) => void;
  onFilterChange: (filters: Partial<JobSearchParams>) => void;
  onSuggestionSelect: (suggestion: SearchSuggestion) => void;
  onRecentSearchSelect: (query: string) => void;
  onClearFilters: () => void;
}
