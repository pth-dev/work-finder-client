// Public routes (no authentication required)
export const PUBLIC_ROUTES = {
  HOME: "/",
  JOBS: "/jobs",
  JOB_DETAILS: "/jobs/:id",
  JOBS_REMOTE: "/jobs/remote",
  JOBS_PART_TIME: "/jobs/part-time",
  JOBS_INTERNSHIPS: "/jobs/internships",
  JOBS_SEARCH: "/jobs/search",
  COMPANIES: "/companies",
  COMPANY_DETAILS: "/companies/:id",
  COMPANY_REVIEWS: "/companies/reviews",
  SALARY: "/salary",
  ABOUT: "/about",
  CONTACT: "/contact",
  PRIVACY: "/privacy",
  TERMS: "/terms",
} as const;

// Authentication routes
export const AUTH_ROUTES = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  FORGOT_PASSWORD: "/forgot-password",
  VERIFY_EMAIL: "/verify-email",
  RESET_PASSWORD: "/reset-password",
} as const;

// User dashboard routes (requires authentication)
export const DASHBOARD_ROUTES = {
  OVERVIEW: "/app",
  PROFILE: "/complete-profile",
  APPLICATIONS: "/app/applications",
  SAVED_JOBS: "/app/saved-jobs",
  RESUME: "/dashboard/resume",
  SETTINGS: "/dashboard/settings",
  NOTIFICATIONS: "/dashboard/notifications",
} as const;

// Employer routes (requires authentication + employer role)
export const EMPLOYER_ROUTES = {
  DASHBOARD: "/employer/dashboard",
  JOBS: "/employer/jobs",
  CREATE_JOB: "/employer/jobs/create",
  EDIT_JOB: "/employer/jobs/:id/edit",
  CANDIDATES: "/employer/candidates",
  COMPANY_PROFILE: "/employer/company",
  BILLING: "/employer/billing",
  ANALYTICS: "/employer/analytics",
} as const;

// Route groups for easy checking
export const ALL_PUBLIC_ROUTES = Object.values(PUBLIC_ROUTES);
export const ALL_AUTH_ROUTES = Object.values(AUTH_ROUTES);
export const ALL_DASHBOARD_ROUTES = Object.values(DASHBOARD_ROUTES);
export const ALL_EMPLOYER_ROUTES = Object.values(EMPLOYER_ROUTES);

// Helper functions
export const isPublicRoute = (path: string): boolean => {
  return ALL_PUBLIC_ROUTES.some((route) => {
    if (route.includes(":")) {
      const regex = new RegExp("^" + route.replace(/:[^/]+/g, "[^/]+") + "$");
      return regex.test(path);
    }
    return route === path;
  });
};

export const isAuthRoute = (path: string): boolean => {
  return ALL_AUTH_ROUTES.includes(path as any);
};

export const isDashboardRoute = (path: string): boolean => {
  return (
    path.startsWith("/dashboard") ||
    ALL_DASHBOARD_ROUTES.some((route) => path.startsWith(route))
  );
};

export const isEmployerRoute = (path: string): boolean => {
  return path.startsWith("/employer");
};
