import { api } from "@/lib/api-client";
import { DashboardStats, UserApplication, SavedJobsResponse } from "../types";

// ✅ NEW: Single API call for user with stats
export const getUserWithStats = (): Promise<{ data: any }> => {
  return api.get("/users/me/stats");
};

// ❌ OLD: Keep for backward compatibility (will be removed)
export const getApplicationStats = (): Promise<{ data: DashboardStats }> => {
  return api.get("/applications/stats");
};

export const getUserApplications = (
  limit = 6
): Promise<{
  data: {
    applications: UserApplication[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}> => {
  return api.get("/applications", { params: { limit, page: 1 } });
};

export const getSavedJobsCount = (): Promise<{ data: SavedJobsResponse }> => {
  return api.get("/jobs/saved", { params: { limit: 1, page: 1 } });
};
