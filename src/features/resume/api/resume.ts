import { api } from "@/lib/api-client";
import { Resume, UploadResumeResponse, ApiResumesResponse } from "../types";

/**
 * Get current user's resumes
 */
export const getMyResumes = async (): Promise<Resume[]> => {
  const response: ApiResumesResponse = await api.get("/resumes/my-resumes");
  return response.data;
};

/**
 * Upload a new resume file
 */
export const uploadResume = (file: File): Promise<UploadResumeResponse> => {
  const formData = new FormData();
  formData.append("file", file);

  return api.post("/upload/resume", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

/**
 * Get a specific resume by ID
 */
export const getResume = (id: number): Promise<Resume> => {
  return api.get(`/resumes/${id}`);
};

/**
 * Delete a resume
 */
export const deleteResume = (id: number): Promise<void> => {
  return api.delete(`/resumes/${id}`);
};

/**
 * Get resume file URL for viewing
 */
export const getResumeFileUrl = (filePath: string): string => {
  // filePath format: "http://localhost:3001/uploads/resumes/resume_1234567890_abc123.pdf"
  // Extract filename and create proper URL
  const filename = filePath.split("/").pop();
  return `/uploads/resumes/${filename}`;
};

/**
 * Download resume
 */
export const downloadResume = (id: number): Promise<Blob> => {
  return api.get(`/resumes/${id}/download`, {
    responseType: "blob",
  });
};
