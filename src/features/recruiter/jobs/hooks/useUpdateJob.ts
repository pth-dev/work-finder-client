import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { updateJob } from "../api/jobs";
import { UpdateJobRequest, ApiJobPost } from "@/features/jobs/types";
import { toast } from "sonner";
import { jobKeys } from "./queryKeys";

export const useUpdateJob = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      jobId,
      jobData,
    }: {
      jobId: number;
      jobData: UpdateJobRequest;
    }) => updateJob(jobId, jobData),
    onSuccess: (data: ApiJobPost, variables) => {
      toast.success(t("recruiter.jobs.messages.updateSuccess"));

      // Invalidate and refetch related queries
      queryClient.invalidateQueries({ queryKey: jobKeys.all });
      queryClient.invalidateQueries({ queryKey: jobKeys.companyJobs({}) });
      queryClient.invalidateQueries({
        queryKey: jobKeys.detail(variables.jobId),
      });
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message ||
        t("recruiter.jobs.messages.updateError");
      toast.error(errorMessage);
    },
  });
};
