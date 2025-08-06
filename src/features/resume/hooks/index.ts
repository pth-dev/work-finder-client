import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getMyResumes,
  uploadResume,
  deleteResume,
  downloadResume,
  getResumeFileUrl,
} from "../api";
import { Resume, UploadResumeResponse } from "../types";
import { toast } from "react-hot-toast";

/**
 * Hook to fetch user's resumes
 */
export const useMyResumes = (options: { enabled?: boolean } = {}) => {
  return useQuery({
    queryKey: ["my-resumes"],
    queryFn: getMyResumes,
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: options.enabled ?? true,
  });
};

/**
 * Hook to upload a new resume
 */
export const useUploadResume = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadResume,
    onSuccess: () => {
      toast.success("Resume uploaded successfully!");
      queryClient.invalidateQueries({ queryKey: ["my-resumes"] });
    },
    onError: () => {
      toast.error("Failed to upload resume");
    },
  });
};

/**
 * Hook to delete a resume
 */
export const useDeleteResume = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteResume,
    onSuccess: () => {
      toast.success("Resume deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["my-resumes"] });
    },
    onError: () => {
      toast.error("Failed to delete resume");
    },
  });
};

/**
 * Hook to get view URL for resume
 */
export const useGetResumeFileUrl = () => {
  return (filePath: string) => getResumeFileUrl(filePath);
};

/**
 * Hook to download resume
 */
export const useDownloadResume = () => {
  return useMutation({
    mutationFn: downloadResume,
    onSuccess: (blob, resumeId) => {
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `resume-${resumeId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success("Resume downloaded!");
    },
    onError: () => {
      toast.error("Failed to download resume");
    },
  });
};
