// Common types used throughout the application

export type UserRole = "candidate" | "recruiter";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  code: string;
  details?: any;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
}

// Form types
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  role: UserRole;
  email: string;
  password: string;
  confirmPassword: string;
}

// Navigation types
export interface MenuItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
  path?: string;
  children?: MenuItem[];
}

// TODO: Add your specific types here
// Example:
/*
export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'remote';
  description: string;
  postedAt: string;
  isActive: boolean;
}
*/
