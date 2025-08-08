import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

import { updateJobStatus } from "../api/jobs";
import { jobKeys } from "./queryKeys";

interface UpdateJobStatusData {
  jobId: number;
  status: string;
}

export const useUpdateJobStatus = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ jobId, status }: UpdateJobStatusData) =>
      updateJobStatus(jobId, status),
    onSuccess: (data) => {
      // Update cache immediately for instant UI update
      queryClient.setQueryData(jobKeys.detail(data.job_id), data);

      // Update jobs list cache if it exists
      queryClient.setQueriesData({ queryKey: jobKeys.all }, (oldData: any) => {
        if (!oldData?.data) return oldData;

        return {
          ...oldData,
          data: oldData.data.map((job: any) =>
            job.job_id === data.job_id ? { ...job, status: data.status } : job
          ),
        };
      });

      // Also invalidate to ensure fresh data on next fetch
      queryClient.invalidateQueries({ queryKey: jobKeys.all });
      queryClient.invalidateQueries({
        queryKey: jobKeys.detail(data.job_id),
      });

      toast.success(t("recruiter.jobs.messages.updateSuccess"));
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        t("recruiter.jobs.messages.updateError");
      toast.error(message);
    },
  });
};
