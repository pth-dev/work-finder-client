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
    // Auth routes - NO AppLayout (có AuthLayout riêng)
    {
      path: paths.auth.register.path,
      lazy: () => import("./routes/auth/register").then(convert(queryClient)),
    },
    {
      path: paths.auth.login.path,
      lazy: () => import("./routes/auth/login").then(convert(queryClient)),
    },

    // Main app với AppLayout wrapper
    {
      path: "/",
      lazy: () =>
        import("@/components/layouts/app-layout").then(convert(queryClient)),
      children: [
        // Public routes - SỬ DỤNG AppLayout header/footer
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

        // Protected routes - DashboardLayout riêng
        {
          path: paths.app.root.path,
          element: (
            <ProtectedRoute>
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
          ],
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
