// Re-export all types for easy importing
export * from "./common";
export * from "./job";
export * from "./company";
export * from "./user";
export * from "./application";

// Common types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
  errors?: string[];
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SearchSuggestion {
  id: string;
  type: "job" | "company" | "location" | "skill";
  text: string;
  count?: number;
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  sms: boolean;
}

export interface Notification {
  id: string;
  userId: string;
  type:
    | "job_alert"
    | "application_update"
    | "interview_reminder"
    | "company_update"
    | "system";
  title: string;
  message: string;
  data?: Record<string, any>;
  isRead: boolean;
  createdAt: string;
  expiresAt?: string;
}
