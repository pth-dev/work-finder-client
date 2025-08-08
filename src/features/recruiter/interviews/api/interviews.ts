import { api } from "@/lib/api-client";
import {
  ApiInterviewsResponse,
  ApiInterview,
  InterviewFilters,
  CreateInterviewRequest,
  UpdateInterviewRequest,
  InterviewStats,
} from "../types";

// Get interviews with filters
export const getInterviews = async (
  filters: InterviewFilters = {}
): Promise<ApiInterviewsResponse> => {
  const params = new URLSearchParams();

  if (filters.search) params.append("search", filters.search);
  if (filters.status) params.append("status", filters.status);
  if (filters.type) params.append("type", filters.type);
  if (filters.jobId) params.append("jobId", filters.jobId.toString());
  if (filters.dateFrom) params.append("dateFrom", filters.dateFrom);
  if (filters.dateTo) params.append("dateTo", filters.dateTo);
  if (filters.page) params.append("page", filters.page.toString());
  if (filters.limit) params.append("limit", filters.limit.toString());
  if (filters.sortBy) params.append("sortBy", filters.sortBy);
  if (filters.sortOrder) params.append("sortOrder", filters.sortOrder);

  const response = await api.get(`/interviews?${params.toString()}`);
  return response.data;
};

// Get interviews for a specific job
export const getJobInterviews = async (
  jobId: number,
  filters: Omit<InterviewFilters, "jobId"> = {}
): Promise<ApiInterviewsResponse> => {
  const params = new URLSearchParams();

  if (filters.search) params.append("search", filters.search);
  if (filters.status) params.append("status", filters.status);
  if (filters.type) params.append("type", filters.type);
  if (filters.dateFrom) params.append("dateFrom", filters.dateFrom);
  if (filters.dateTo) params.append("dateTo", filters.dateTo);
  if (filters.page) params.append("page", filters.page.toString());
  if (filters.limit) params.append("limit", filters.limit.toString());
  if (filters.sortBy) params.append("sortBy", filters.sortBy);
  if (filters.sortOrder) params.append("sortOrder", filters.sortOrder);

  const response = await api.get(
    `/interviews/jobs/${jobId}?${params.toString()}`
  );
  return response.data;
};

// Get single interview
export const getInterview = async (
  interviewId: number
): Promise<ApiInterview> => {
  const response = await api.get(`/interviews/${interviewId}`);
  return response.data;
};

// Create new interview
export const createInterview = async (
  data: CreateInterviewRequest
): Promise<ApiInterview> => {
  const response = await api.post("/interviews", data);
  return response.data;
};

// Update interview
export const updateInterview = async (
  interviewId: number,
  data: UpdateInterviewRequest
): Promise<ApiInterview> => {
  const response = await api.patch(`/interviews/${interviewId}`, data);
  return response.data;
};

// Update interview status
export const updateInterviewStatus = async (
  interviewId: number,
  status: string
): Promise<ApiInterview> => {
  const response = await api.patch(`/interviews/${interviewId}/status`, {
    status,
  });
  return response.data;
};

// Bulk update interview status
export const bulkUpdateInterviewStatus = async (
  interviewIds: number[],
  status: string
): Promise<{ updated: number }> => {
  const response = await api.patch("/interviews/bulk-status", {
    interview_ids: interviewIds,
    status,
  });
  return response.data;
};

// Delete interview
export const deleteInterview = async (interviewId: number): Promise<void> => {
  await api.delete(`/interviews/${interviewId}`);
};

// Get interview statistics
export const getInterviewStats = async (): Promise<InterviewStats> => {
  const response = await api.get("/interviews/stats");
  return response.data;
};

// Export interviews
export const exportInterviews = async (
  filters: InterviewFilters = {}
): Promise<Blob> => {
  const params = new URLSearchParams();

  if (filters.search) params.append("search", filters.search);
  if (filters.status) params.append("status", filters.status);
  if (filters.type) params.append("type", filters.type);
  if (filters.jobId) params.append("jobId", filters.jobId.toString());
  if (filters.dateFrom) params.append("dateFrom", filters.dateFrom);
  if (filters.dateTo) params.append("dateTo", filters.dateTo);

  const response = await api.get(`/interviews/export?${params.toString()}`, {
    responseType: "blob",
  });
  return response.data;
};

// Reschedule interview
export const rescheduleInterview = async (
  interviewId: number,
  scheduledAt: string,
  notes?: string
): Promise<ApiInterview> => {
  const response = await api.patch(`/interviews/${interviewId}/reschedule`, {
    scheduled_at: scheduledAt,
    notes,
  });
  return response.data;
};

// Send interview reminder
export const sendInterviewReminder = async (
  interviewId: number
): Promise<{ sent: boolean }> => {
  const response = await api.post(`/interviews/${interviewId}/reminder`);
  return response.data;
};
