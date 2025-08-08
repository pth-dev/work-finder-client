import { useAuthStore } from "@/stores/auth-store";
import { useUserWithStats, useRecentApplications } from "../hooks";
import {
  DashboardHeader,
  StatsGrid,
  ProfileCompletionAlert,
  RecentApplications,
} from "./";

export function DashboardOverview() {
  const { user, isInitializing, isAuthenticated } = useAuthStore();
  const { data: userWithStats, isLoading: statsLoading } = useUserWithStats();
  const { data: applicationsData, isLoading: applicationsLoading } =
    useRecentApplications(5);
  const isProfileComplete = Boolean(user && user.full_name && user.phone);

  // ✅ FIX: Only show loading if we're actually initializing AND not authenticated yet
  // If user is authenticated (just logged in), don't show auth loading
  if ((isInitializing && !isAuthenticated) || statsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Extract stats from single API response
  const stats = {
    totalApplications: userWithStats?.data?.stats?.totalApplications || 0,
    savedJobs: userWithStats?.data?.stats?.savedJobs || 0,
    interviews: userWithStats?.data?.stats?.interviews || 0,
  };

  // ✅ FIX: Clean REST API format { applications: [...], pagination: {...} }
  const recentApplications = applicationsData?.data?.applications || [];

  return (
    <div className="space-y-6">
      <DashboardHeader user={user} />

      <StatsGrid
        totalApplications={stats.totalApplications}
        savedJobs={stats.savedJobs}
        interviews={stats.interviews}
      />

      <ProfileCompletionAlert isProfileComplete={isProfileComplete} />

      <RecentApplications
        applications={recentApplications}
        isLoading={applicationsLoading}
      />
    </div>
  );
}
