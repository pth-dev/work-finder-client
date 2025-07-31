// API Base Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_EMAIL: '/auth/verify-email',
  },
  
  // Jobs
  JOBS: {
    LIST: '/jobs',
    DETAILS: '/jobs/:id',
    CREATE: '/jobs',
    UPDATE: '/jobs/:id',
    DELETE: '/jobs/:id',
    SEARCH: '/jobs/search',
    CATEGORIES: '/jobs/categories',
    SAVED: '/jobs/saved',
    SAVE: '/jobs/:id/save',
    UNSAVE: '/jobs/:id/unsave',
  },
  
  // Companies
  COMPANIES: {
    LIST: '/companies',
    DETAILS: '/companies/:id',
    FOLLOW: '/companies/:id/follow',
    UNFOLLOW: '/companies/:id/unfollow',
    JOBS: '/companies/:id/jobs',
  },
  
  // Applications
  APPLICATIONS: {
    LIST: '/applications',
    CREATE: '/applications',
    UPDATE: '/applications/:id',
    DELETE: '/applications/:id',
    DETAILS: '/applications/:id',
  },
  
  // User Profile
  USER: {
    PROFILE: '/user/profile',
    UPDATE: '/user/profile',
    UPLOAD_AVATAR: '/user/avatar',
    UPLOAD_RESUME: '/user/resume',
  },
  
  // Categories
  CATEGORIES: {
    LIST: '/categories',
  },
} as const;

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
} as const;

// Request Headers
export const REQUEST_HEADERS = {
  CONTENT_TYPE: 'Content-Type',
  AUTHORIZATION: 'Authorization',
  ACCEPT: 'Accept',
  ACCEPT_LANGUAGE: 'Accept-Language',
} as const;

// Content Types
export const CONTENT_TYPES = {
  JSON: 'application/json',
  FORM_DATA: 'multipart/form-data',
  URL_ENCODED: 'application/x-www-form-urlencoded',
} as const;