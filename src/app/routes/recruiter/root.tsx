import { Outlet } from "react-router-dom";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";

export default function RecruiterRoot() {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
}

export const ErrorBoundary = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-red-600">
          Something went wrong
        </h2>
        <p className="mt-2 text-gray-600">
          An error occurred in the recruiter section.
        </p>
      </div>
    </div>
  );
};
