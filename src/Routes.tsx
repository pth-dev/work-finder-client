import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { ROUTER } from "./constants/Routers";

// Layouts
import AppLayout from "./components/layout/app-layout";

// Guards
import AuthGuard from "./utils/route-guard/AuthGuard";
import GuestGuard from "./utils/route-guard/GuestGuard";
import NotFound from "./utils/route-guard/NotFound";

// Loading component
import Loadable from "./components/ui/Loadable";

// Public Routes
import AuthLogin from "./pages/login";
import AuthRegister from "./pages/register";

/** Private Routes */
// Dashboard
const Dashboard = Loadable(lazy(() => import("./pages/dashboard")));

// Profile
const ProfilePage = Loadable(lazy(() => import("./pages/profile")));
const SettingsPage = Loadable(lazy(() => import("./pages/settings")));

// Jobs
const JobsPage = Loadable(
  lazy(() =>
    Promise.resolve({
      default: () => (
        <div style={{ padding: 24, textAlign: "center" }}>
          <h2>Jobs Page - Under Development</h2>
          <p>This section is ready for your implementation.</p>
        </div>
      ),
    })
  )
);

// Companies
const CompaniesPage = Loadable(
  lazy(() =>
    Promise.resolve({
      default: () => (
        <div style={{ padding: 24, textAlign: "center" }}>
          <h2>Companies Page - Under Development</h2>
          <p>This section is ready for your implementation.</p>
        </div>
      ),
    })
  )
);

// Applications
const ApplicationsPage = Loadable(
  lazy(() =>
    Promise.resolve({
      default: () => (
        <div style={{ padding: 24, textAlign: "center" }}>
          <h2>Applications Page - Under Development</h2>
          <p>This section is ready for your implementation.</p>
        </div>
      ),
    })
  )
);

// Administration
const UserManagement = Loadable(
  lazy(() =>
    Promise.resolve({
      default: () => (
        <div style={{ padding: 24, textAlign: "center" }}>
          <h2>User Management - Under Development</h2>
          <p>This section is ready for your implementation.</p>
        </div>
      ),
    })
  )
);

const MainRoutes = () => (
  <Routes>
    {/* Private Routes */}
    <Route path={ROUTER.home.index} element={<AuthGuard />}>
      <Route element={<AppLayout />}>
        <Route index element={<Dashboard />} />
        <Route path={ROUTER.profile.index} element={<ProfilePage />} />
        <Route path={ROUTER.profile.settings} element={<SettingsPage />} />

        {/* Job routes */}
        <Route path={ROUTER.jobs.index} element={<JobsPage />} />
        <Route path={ROUTER.jobs.detail} element={<div>Job Detail Page</div>} />
        <Route path={ROUTER.jobs.create} element={<div>Create Job Page</div>} />
        <Route path={ROUTER.jobs.edit} element={<div>Edit Job Page</div>} />

        {/* Company routes */}
        <Route path={ROUTER.companies.index} element={<CompaniesPage />} />
        <Route
          path={ROUTER.companies.detail}
          element={<div>Company Detail Page</div>}
        />

        {/* Application routes */}
        <Route
          path={ROUTER.applications.index}
          element={<ApplicationsPage />}
        />
        <Route
          path={ROUTER.applications.detail}
          element={<div>Application Detail Page</div>}
        />
      </Route>
    </Route>

    {/* Admin Routes */}
    <Route
      path={ROUTER.admin.index}
      element={<AuthGuard permissionRequired={["admin"]} />}
    >
      <Route element={<AppLayout />}>
        <Route index element={<div>Admin Dashboard</div>} />
        <Route path={ROUTER.admin.users} element={<UserManagement />} />
        <Route
          path={ROUTER.admin.jobs}
          element={<div>Admin Jobs Management</div>}
        />
        <Route
          path={ROUTER.admin.companies}
          element={<div>Admin Companies Management</div>}
        />
      </Route>
    </Route>

    {/* Public Routes */}
    <Route element={<GuestGuard />}>
      <Route path={ROUTER.authentication.login} element={<AuthLogin />} />
      <Route path={ROUTER.authentication.register} element={<AuthRegister />} />
      <Route
        path={ROUTER.authentication.forgot}
        element={<div>Forgot Password Page</div>}
      />
    </Route>

    {/* 404 Route */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default MainRoutes;
