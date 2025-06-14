import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./stores/auth-store";
import ErrorBoundary from "./components/ui/error-boundary";
import { PageLoading } from "./components/ui/loading";
import AppLayout from "./components/layout/app-layout";

// Lazy load pages for better performance
const Dashboard = lazy(() => import("./pages/dashboard"));
const LoginPage = lazy(() => import("./pages/login"));
const RegisterPage = lazy(() => import("./pages/register"));
const JobsPage = lazy(() => import("./pages/jobs"));
const JobDetailPage = lazy(() => import("./pages/job-detail"));
const ProfilePage = lazy(() => import("./pages/profile"));
const SettingsPage = lazy(() => import("./pages/settings"));
const CreateJobPage = lazy(() => import("./pages/create-job"));

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// Public Route Component (redirect to dashboard if authenticated)
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<PageLoading />}>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            }
          />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            {/* Dashboard */}
            <Route index element={<Dashboard />} />

            {/* Jobs */}
            <Route path="jobs" element={<JobsPage />} />
            <Route path="jobs/create" element={<CreateJobPage />} />
            <Route path="jobs/:id" element={<JobDetailPage />} />
            <Route
              path="jobs/:id/edit"
              element={
                <div style={{ padding: 24 }}>
                  <h2>Edit Job (Coming Soon)</h2>
                  <p>
                    This page will contain a form to edit existing job postings.
                  </p>
                </div>
              }
            />

            {/* Users */}
            <Route
              path="users"
              element={
                <div style={{ padding: 24 }}>
                  <h2>Users Management (Coming Soon)</h2>
                  <p>This page will contain user management functionality.</p>
                </div>
              }
            />
            <Route
              path="users/create"
              element={
                <div style={{ padding: 24 }}>
                  <h2>Create User (Coming Soon)</h2>
                  <p>This page will contain a form to create new users.</p>
                </div>
              }
            />

            {/* Profile */}
            <Route path="profile" element={<ProfilePage />} />

            {/* Reports */}
            <Route
              path="reports"
              element={
                <div style={{ padding: 24 }}>
                  <h2>Reports (Coming Soon)</h2>
                  <p>This page will contain various reports and analytics.</p>
                </div>
              }
            />

            {/* Settings */}
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          {/* Catch all route - 404 */}
          <Route
            path="*"
            element={
              <div
                style={{
                  height: "100vh",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  textAlign: "center",
                }}
              >
                <h1>404 - Page Not Found</h1>
                <p>The page you are looking for does not exist.</p>
                <a href="/" style={{ marginTop: 16 }}>
                  Go back to Dashboard
                </a>
              </div>
            }
          />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
};

export default App;
