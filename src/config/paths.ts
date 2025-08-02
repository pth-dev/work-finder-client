export const paths = {
  home: {
    path: "/",
    getHref: () => "/",
  },

  auth: {
    register: {
      path: "/auth/register",
      getHref: (redirectTo?: string | null | undefined) =>
        `/auth/register${
          redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
        }`,
    },
    login: {
      path: "/auth/login",
      getHref: (redirectTo?: string | null | undefined) =>
        `/auth/login${
          redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
        }`,
    },
    forgotPassword: {
      path: "/auth/forgot-password",
      getHref: () => "/auth/forgot-password",
    },
    resetPassword: {
      path: "/auth/reset-password",
      getHref: (token?: string) =>
        `/auth/reset-password${token ? `?token=${token}` : ""}`,
    },
    verifyOTP: {
      path: "/auth/verify-otp",
      getHref: (email?: string) =>
        `/auth/verify-otp${email ? `?email=${encodeURIComponent(email)}` : ""}`,
    },
  },

  app: {
    root: {
      path: "/app",
      getHref: () => "/app",
    },
    dashboard: {
      path: "",
      getHref: () => "/app",
    },
    applications: {
      path: "applications",
      getHref: () => "/app/applications",
    },
    savedJobs: {
      path: "saved-jobs",
      getHref: () => "/app/saved-jobs",
    },
    jobs: {
      path: "jobs",
      getHref: () => "/app/jobs",
    },
    companies: {
      path: "companies",
      getHref: () => "/app/companies",
    },
    profile: {
      path: "profile",
      getHref: () => "/app/profile",
    },
    settings: {
      path: "settings",
      getHref: () => "/app/settings",
    },
  },

  jobs: {
    root: {
      path: "/jobs",
      getHref: () => "/jobs",
    },
    detail: {
      path: "/jobs/:id",
      getHref: (id: string) => `/jobs/${id}`,
    },
  },

  companies: {
    root: {
      path: "/companies",
      getHref: () => "/companies",
    },
    detail: {
      path: "/companies/:id",
      getHref: (id: string) => `/companies/${id}`,
    },
  },

  about: {
    path: "/about",
    getHref: () => "/about",
  },

  contact: {
    path: "/contact",
    getHref: () => "/contact",
  },

  privacy: {
    path: "/privacy",
    getHref: () => "/privacy",
  },

  terms: {
    path: "/terms",
    getHref: () => "/terms",
  },
} as const;
