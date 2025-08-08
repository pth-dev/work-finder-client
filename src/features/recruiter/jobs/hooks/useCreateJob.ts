import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { createJob } from '../api/createJob';
import { CreateJobRequest, ApiJobPost } from '@/features/jobs/types';
import { toast } from 'sonner';

export const useCreateJob = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createJob,
    onSuccess: (data: ApiJobPost) => {
      toast.success(t('recruiter.jobs.messages.createSuccess'));
      
      // Invalidate and refetch jobs data
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || t('recruiter.jobs.messages.createError');
      toast.error(errorMessage);
    },
  });
};