// Meta interfaces for API responses
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface SortingMeta {
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  availableFields?: string[];
}

export interface FilteringMeta {
  filters?: Record<string, any>;
  availableFields?: string[];
}

// Base response interface
export interface BaseResponse {
  message: string;
  timestamp: string;
}

// Success API Response Format (matches backend)
export interface ApiResponse<T = unknown> extends BaseResponse {
  success: true;
  status: number;
  data: T;
  meta?: {
    pagination?: PaginationMeta;
    sorting?: SortingMeta;
    filtering?: FilteringMeta;
    [key: string]: any;
  };
}

// Error Response Format (matches backend)
export interface ErrorResponse extends BaseResponse {
  success: false;
  status: number;
  error: {
    code: string;
    details?: any;
    stack?: string; // Only in development
  };
}

// Union type for all API responses
export type AnyApiResponse<T = unknown> = ApiResponse<T> | ErrorResponse;

export interface PaginatedResponse<T = unknown> extends ApiResponse<T[]> {
  meta: {
    pagination: PaginationMeta;
    [key: string]: any;
  };
}

// Common paginated response format used by API endpoints
export interface PaginatedApiResponse<T = unknown> {
  items: T[];
  total: number;
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface ApiError {
  message: string;
  statusCode: number;
  error: string;
  timestamp: string;
}

export type QueryKey = readonly unknown[];

export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

// Common search parameters interface
export interface BaseSearchParams extends Record<string, unknown> {
  q?: string;
  page?: number;
  limit?: number;
  sort?: string;
}
