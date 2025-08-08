import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "react-hot-toast";
import { deleteJob } from "../api/jobs";

/**
 * Hook to delete a job
 */
export const useDeleteJob = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: (jobId: number) => deleteJob(jobId),
    onSuccess: () => {
      toast.success(t("recruiter.jobs.management.deleteSuccess"));
      // Invalidate and refetch job lists
      queryClient.invalidateQueries({ queryKey: ["company-jobs"] });
    },
    onError: (error) => {
      console.error("Failed to delete job:", error);
      toast.error(t("recruiter.jobs.management.errors.deleteFailed"));
    },
  });
};