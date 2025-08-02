import { Outlet } from "react-router-dom";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { FullScreenErrorState } from "@/components";

export default function AppRoot() {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
}

export function ErrorBoundary() {
  return (
    <FullScreenErrorState
      type="generic"
      title="Something went wrong"
      message="We're sorry, but something went wrong. Please try again later."
      onRetry={() => window.location.reload()}
    />
  );
}
