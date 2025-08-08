import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import { paths } from "@/config/paths";
import { ProtectedRoute } from "@/lib/auth";

import {
  default as AppRoot,
  ErrorBoundary as AppRootErrorBoundary,
} from "./routes/app/root";
import {
  default as RecruiterRoot,
  ErrorBoundary as RecruiterRootErrorBoundary,
} from "./routes/recruiter/root";
import {
  default as AdminRoot,
  ErrorBoundary as AdminRootErrorBoundary,
} from "./routes/admin/root";

const convert = (queryClient: QueryClient) => (m: any) => {
  const { clientLoader, clientAction, default: Component, ...rest } = m;
  return {
    ...rest,
    loader: clientLoader?.(queryClient),
    action: clientAction?.(queryClient),
    Component,
  };
};

export const createAppRouter = (queryClient: QueryClient) =>
  createBrowserRouter([
    // Auth routes
    {
      path: paths.auth.register.path,
      lazy: () => import("./routes/auth/register").then(convert(queryClient)),
    },
    {
      path: paths.auth.login.path,
      lazy: () => import("./routes/auth/login").then(convert(queryClient)),
    },
    {
      path: paths.auth.forgotPassword.path,
      lazy: () =>
        import("./routes/auth/forgot-password").then(convert(queryClient)),
    },
    {
      path: paths.auth.verifyOTP.path,
      lazy: () => import("./routes/auth/verify-otp").then(convert(queryClient)),
    },
    {
      path: paths.auth.verifyResetOtp.path,
      lazy: () =>
        import("./routes/auth/verify-reset-otp").then(convert(queryClient)),
    },
    {
      path: paths.auth.setNewPassword.path,
      lazy: () =>
        import("./routes/auth/set-new-password").then(convert(queryClient)),
    },

    // Public routes với AppLayout (header/footer) - chặn recruiter
    {
      path: "/",
      lazy: () =>
        import("@/components/layouts/public-layout-wrapper").then(
          convert(queryClient)
        ),
      children: [
        {
          path: paths.home.path,
          lazy: () => import("./routes/landing").then(convert(queryClient)),
        },
        {
          path: paths.jobs.root.path,
          lazy: () => import("./routes/jobs").then(convert(queryClient)),
        },
        {
          path: paths.jobs.detail.path,
          lazy: () => import("./routes/job-detail").then(convert(queryClient)),
        },
        {
          path: paths.companies.root.path,
          lazy: () => import("./routes/companies").then(convert(queryClient)),
        },
        {
          path: paths.companies.detail.path,
          lazy: () =>
            import("./routes/company-detail").then(convert(queryClient)),
        },
        {
          path: paths.about.path,
          lazy: () => import("./routes/about").then(convert(queryClient)),
        },
        {
          path: paths.contact.path,
          lazy: () => import("./routes/contact").then(convert(queryClient)),
        },
        {
          path: paths.privacy.path,
          lazy: () => import("./routes/privacy").then(convert(queryClient)),
        },
        {
          path: paths.terms.path,
          lazy: () => import("./routes/terms").then(convert(queryClient)),
        },
      ],
    },

    // Dashboard routes
    {
      path: paths.app.root.path,
      element: (
        <ProtectedRoute permission={["job_seeker"]}>
          <AppRoot />
        </ProtectedRoute>
      ),
      ErrorBoundary: AppRootErrorBoundary,
      children: [
        {
          path: paths.app.dashboard.path,
          lazy: () =>
            import("./routes/app/dashboard").then(convert(queryClient)),
        },
        {
          path: paths.app.applications.path,
          lazy: () =>
            import("./routes/app/applications").then(convert(queryClient)),
        },
        {
          path: paths.app.savedJobs.path,
          lazy: () =>
            import("./routes/app/saved-jobs").then(convert(queryClient)),
        },
        {
          path: paths.app.resume.path,
          lazy: () => import("./routes/app/resume").then(convert(queryClient)),
        },
        {
          path: paths.app.settings.path,
          lazy: () =>
            import("./routes/app/settings").then(convert(queryClient)),
        },
        {
          path: paths.app.jobs.path,
          lazy: () => import("./routes/app/jobs").then(convert(queryClient)),
        },
        {
          path: paths.app.companies.path,
          lazy: () =>
            import("./routes/app/companies").then(convert(queryClient)),
        },
      ],
    },

    // Recruiter Dashboard routes
    {
      path: paths.recruiter.root.path,
      element: (
        <ProtectedRoute permission={["recruiter"]}>
          <RecruiterRoot />
        </ProtectedRoute>
      ),
      ErrorBoundary: RecruiterRootErrorBoundary,
      children: [
        {
          path: paths.recruiter.dashboard.path,
          lazy: () =>
            import("./routes/recruiter/dashboard").then(convert(queryClient)),
        },
        {
          path: paths.recruiter.jobs.path,
          lazy: () =>
            import("./routes/recruiter/jobs").then(convert(queryClient)),
        },
        {
          path: paths.recruiter.createJob.path,
          lazy: () =>
            import("./routes/recruiter/create-job").then(convert(queryClient)),
        },
        {
          path: paths.recruiter.jobApplicationDetail.path,
          lazy: () =>
            import(
              "./routes/recruiter/jobs/[jobId]/applications/[applicationId]"
            ).then(convert(queryClient)),
        },
        {
          path: paths.recruiter.applications.path,
          lazy: () =>
            import("./routes/recruiter/applications").then(
              convert(queryClient)
            ),
        },
        {
          path: paths.recruiter.interviews.path,
          lazy: () =>
            import("./routes/recruiter/interviews").then(convert(queryClient)),
        },

        {
          path: paths.recruiter.staff.path,
          lazy: () =>
            import("./routes/recruiter/staff").then(convert(queryClient)),
        },
        {
          path: paths.recruiter.jobDetail.path,
          lazy: () =>
            import("./routes/recruiter/jobs/[id]").then(convert(queryClient)),
        },
      ],
    },

    // Admin Dashboard routes
    {
      path: paths.admin.root.path,
      element: (
        <ProtectedRoute permission={["admin"]}>
          <AdminRoot />
        </ProtectedRoute>
      ),
      ErrorBoundary: AdminRootErrorBoundary,
      children: [
        {
          path: paths.admin.dashboard.path,
          lazy: () =>
            import("./routes/admin/dashboard").then(convert(queryClient)),
        },
        {
          path: paths.admin.users.path,
          lazy: () => import("./routes/admin/users").then(convert(queryClient)),
        },
        {
          path: paths.admin.jobs.path,
          lazy: () => import("./routes/admin/jobs").then(convert(queryClient)),
        },
      ],
    },

    {
      path: "*",
      lazy: () => import("./routes/not-found").then(convert(queryClient)),
    },
  ]);

export const AppRouter = () => {
  const queryClient = useQueryClient();

  const router = useMemo(() => createAppRouter(queryClient), [queryClient]);

  return <RouterProvider router={router} />;
};
