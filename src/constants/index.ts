// Application constants

export const APP_NAME = "Work Finder";
export const APP_VERSION = "1.0.0";
export const APP_DESCRIPTION =
  "Modern application built with React and TypeScript";

// API Configuration
export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3001/api";
export const API_TIMEOUT = 10000;

// Authentication
export const TOKEN_KEY = "auth_token";
export const USER_KEY = "user_data";

// Pagination
export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_SIZE_OPTIONS = ["10", "20", "50", "100"];

// Notification Types
export const NOTIFICATION_TYPES = [
  "success",
  "error",
  "warning",
  "info",
] as const;

// Date Formats
export const DATE_FORMAT = "YYYY-MM-DD";
export const DISPLAY_DATE_FORMAT = "MMM DD, YYYY";

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH: "auth-storage",
  THEME: "theme-preference",
  SIDEBAR: "sidebar-collapsed",
  USER_PREFERENCES: "user-preferences",
};

// Routes - moved to separate file
// See constants/Routers.ts for route definitions
export * from "./Routers";
