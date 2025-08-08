import { api } from "@/lib/api-client";
import { CreateJobRequest, ApiJobPost } from "@/features/jobs/types";

export const createJob = async (
  jobData: CreateJobRequest
): Promise<ApiJobPost> => {
  const response = await api.post("/jobs", jobData);
  return response.data;
};
