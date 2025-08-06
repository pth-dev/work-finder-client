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
 * Get user's applications
 */
export const getMyApplications = (): Promise<Application[]> => {
  return api.get("/applications/my-applications");
};

/**
 * Get application by ID
 */
export const getApplication = (id: number): Promise<Application> => {
  return api.get(`/applications/${id}`);
};

/**
 * Withdraw an application
 */
export const withdrawApplication = (id: number): Promise<Application> => {
  return api.patch(`/applications/${id}`, {
    status: "withdrawn",
  });
};
