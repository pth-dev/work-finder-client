// Public routes (no authentication required)
export const PUBLIC_ROUTES = {
  HOME: "/",
  JOBS: "/jobs",
  JOB_DETAILS: "/jobs/[id]",
  JOBS_REMOTE: "/jobs/remote",
  JOBS_PART_TIME: "/jobs/part-time",
  JOBS_INTERNSHIPS: "/jobs/internships",
  JOBS_SEARCH: "/jobs/search",
  COMPANIES: "/companies",
  COMPANY_DETAILS: "/companies/[id]",
  COMPANY_REVIEWS: "/companies/reviews",
  SALARY: "/salary",
  ABOUT: "/about",
  CONTACT: "/contact",
  PRIVACY: "/privacy",
  TERMS: "/terms",
} as const;

// Authentication routes
export const AUTH_ROUTES = {
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  VERIFY_EMAIL: "/verify-email",
  RESET_PASSWORD: "/reset-password",
} as const;

// User dashboard routes (requires authentication)
export const DASHBOARD_ROUTES = {
  OVERVIEW: "/dashboard",
  PROFILE: "/dashboard/profile",
  APPLICATIONS: "/dashboard/applications",
  SAVED_JOBS: "/dashboard/saved-jobs",
  RESUME: "/dashboard/resume",
  SETTINGS: "/dashboard/settings",
  NOTIFICATIONS: "/dashboard/notifications",
} as const;

// Employer routes (requires authentication + employer role)
export const EMPLOYER_ROUTES = {
  DASHBOARD: "/employer/dashboard",
  JOBS: "/employer/jobs",
  CREATE_JOB: "/employer/jobs/create",
  EDIT_JOB: "/employer/jobs/[id]/edit",
  CANDIDATES: "/employer/candidates",
  COMPANY_PROFILE: "/employer/company",
  BILLING: "/employer/billing",
  ANALYTICS: "/employer/analytics",
} as const;
