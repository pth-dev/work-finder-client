import { createBrowserRouter, Navigate } from "react-router-dom";
import { AppLayout } from "@/shared/components/organisms/AppLayout";
import { AuthGuard } from "@/app/router/guards";
import {
  HomePage,
  LoginPage,
  RegisterPage,
  JobsPage,
  JobDetailPage,
  CompaniesPage,
  CompanyDetailPage,
  ApplicationsPage,
  SavedJobsPage,
  ErrorBoundaryPage,
  NotFoundPage,
  PlaceholderPage,
} from "@/pages";
import {
  PUBLIC_ROUTES,
  AUTH_ROUTES,
  DASHBOARD_ROUTES,
} from "@/constants/routes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorBoundaryPage />,
    children: [
      // Public Routes
      {
        path: PUBLIC_ROUTES.HOME,
        element: <HomePage />,
      },
      {
        path: PUBLIC_ROUTES.JOBS,
        element: <JobsPage />,
      },
      {
        path: PUBLIC_ROUTES.JOB_DETAILS,
        element: <JobDetailPage />,
      },
      {
        path: PUBLIC_ROUTES.COMPANIES,
        element: <CompaniesPage />,
      },
      {
        path: PUBLIC_ROUTES.COMPANY_DETAILS,
        element: <CompanyDetailPage />,
      },
      {
        path: PUBLIC_ROUTES.ABOUT,
        element: <PlaceholderPage title="About Us" />,
      },
      {
        path: PUBLIC_ROUTES.CONTACT,
        element: <PlaceholderPage title="Contact Us" />,
      },
      {
        path: PUBLIC_ROUTES.PRIVACY,
        element: <PlaceholderPage title="Privacy Policy" />,
      },
      {
        path: PUBLIC_ROUTES.TERMS,
        element: <PlaceholderPage title="Terms of Service" />,
      },

      // Authentication Routes (redirect to home if already authenticated)
      {
        path: AUTH_ROUTES.LOGIN,
        element: <LoginPage />,
      },
      {
        path: AUTH_ROUTES.REGISTER,
        element: <RegisterPage />,
      },
      {
        path: AUTH_ROUTES.FORGOT_PASSWORD,
        element: (
          <AuthGuard requireAuth={false}>
            <PlaceholderPage title="Forgot Password" />
          </AuthGuard>
        ),
      },
      {
        path: AUTH_ROUTES.RESET_PASSWORD,
        element: (
          <AuthGuard requireAuth={false}>
            <PlaceholderPage title="Reset Password" />
          </AuthGuard>
        ),
      },

      // Dashboard Routes (require authentication)
      {
        path: DASHBOARD_ROUTES.APPLICATIONS,
        element: <ApplicationsPage />,
      },
      {
        path: DASHBOARD_ROUTES.SAVED_JOBS,
        element: <SavedJobsPage />,
      },
      {
        path: DASHBOARD_ROUTES.PROFILE,
        element: (
          <AuthGuard>
            <PlaceholderPage title="Complete Profile" />
          </AuthGuard>
        ),
      },

      // Legacy dashboard route redirect
      {
        path: "/dashboard",
        element: <Navigate to={DASHBOARD_ROUTES.APPLICATIONS} replace />,
      },

      // Catch all route - 404
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
