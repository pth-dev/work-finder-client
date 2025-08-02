export interface User {
  user_id: number;
  email: string;
  full_name?: string;
  phone?: string;
  address?: string;
  avatar?: string;
  role: 'job_seeker' | 'recruiter' | 'admin';
  email_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  full_name?: string;
  phone?: string;
  address?: string;
  role?: 'job_seeker' | 'recruiter';
}

export interface RegisterResponse {
  message: string;
  email: string;
}

export interface ApiResponse<T> {
  success: boolean;
  status: number;
  data: T;
  message: string;
  timestamp: string;
  meta?: {
    pagination?: PaginationMeta;
    [key: string]: any;
  };
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  user: User;
}

export interface OTPVerificationRequest {
  email: string;
  otp_code: string;
}

export interface OTPVerificationResponse {
  access_token: string;
  refresh_token: string;
  user: User;
}

export interface ResendOTPRequest {
  email: string;
}