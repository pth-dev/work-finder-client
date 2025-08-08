import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";

import { extendJob } from "../api/jobs";
import { jobKeys } from "./queryKeys";

interface ExtendJobData {
  jobId: number;
  expiresAt: string;
}

export const useExtendJob = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ jobId, expiresAt }: ExtendJobData) =>
      extendJob(jobId, expiresAt),
    onSuccess: (data) => {
      // Invalidate and refetch job queries
      queryClient.invalidateQueries({ queryKey: jobKeys.all });
      queryClient.invalidateQueries({ 
        queryKey: jobKeys.detail(data.job_id) 
      });
      
      toast.success(t("jobs.extend.success"));
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || t("jobs.extend.error");
      toast.error(message);
    },
  });
};
