import { api } from "@/lib/api-client";
import { CreateApplicationRequest, Application } from "../types";

/**
 * Create a new job application
 */
export const createApplication = (
  data: CreateApplicationRequest
): Promise<Application> => {
  return api.post("/applications", data);
};

/**
 * Get user's applications with pagination
 */
export const getMyApplications = (params?: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}): Promise<{
  data: {
    applications: any[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}> => {
  const searchParams = new URLSearchParams();
  if (params?.page) searchParams.append("page", params.page.toString());
  if (params?.limit) searchParams.append("limit", params.limit.toString());
  if (params?.search) searchParams.append("search", params.search);
  if (params?.status) searchParams.append("status", params.status);

  const queryString = searchParams.toString();
  const url = queryString
    ? `/users/me/applications?${queryString}`
    : "/users/me/applications";

  return api.get(url);
};

/**
 * Get application by ID
 */
export const getApplication = async (id: number): Promise<Application> => {
  const response = await api.get(`/applications/${id}`);
  // Extract the actual application data from the API response
  return response.data;
};

/**
 * Withdraw an application
 */
export const withdrawApplication = (id: number): Promise<Application> => {
  return api.patch(`/applications/${id}`, {
    status: "withdrawn",
  });
};
