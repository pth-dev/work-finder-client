export const ROUTER = {
  home: {
    index: "/",
  },
  authentication: {
    login: "login",
    register: "register",
    forgot: "forgot",
  },
  profile: {
    index: "profile",
    settings: "profile/settings",
  },
  jobs: {
    index: "jobs",
    detail: "jobs/:id",
    create: "jobs/create",
    edit: "jobs/:id/edit",
  },
  companies: {
    index: "companies",
    detail: "companies/:id",
  },
  applications: {
    index: "applications",
    detail: "applications/:id",
  },
  admin: {
    index: "admin",
    users: "admin/users",
    jobs: "admin/jobs",
    companies: "admin/companies",
  },
};

export default ROUTER;
