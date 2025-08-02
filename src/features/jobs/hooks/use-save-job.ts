import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { useToast } from '@/services/toast-service';

interface SaveJobRequest {
  jobId: string;
  action: 'save' | 'unsave';
}

interface SaveJobResponse {
  success: boolean;
  message: string;
  data: {
    jobId: string;
    isSaved: boolean;
    saveCount: number;
  };
}

/**
 * Hook for saving/unsaving jobs with optimistic updates and cache management
 * 
 * Features:
 * - Optimistic UI updates for instant feedback
 * - Automatic cache invalidation for consistency
 * - Error handling with rollback on failure
 * - Toast notifications for user feedback
 * 
 * @example
 * ```tsx
 * const { mutate: saveJob, isPending } = useSaveJob();
 * 
 * const handleSaveJob = (jobId: string, currentlySaved: boolean) => {
 *   saveJob({ 
 *     jobId, 
 *     action: currentlySaved ? 'unsave' : 'save' 
 *   });
 * };
 * ```
 */
export const useSaveJob = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation<SaveJobResponse, Error, SaveJobRequest>({
    mutationFn: async ({ jobId, action }: SaveJobRequest) => {
      const response = await api.post(`/jobs/${jobId}/${action}`);
      return response;
    },

    // Optimistic update - immediately update UI before API call
    onMutate: async ({ jobId, action }) => {
      // Cancel any outgoing refetches to avoid overwriting optimistic update
      await queryClient.cancelQueries({ queryKey: ['jobs'] });
      await queryClient.cancelQueries({ queryKey: ['saved-jobs'] });
      await queryClient.cancelQueries({ queryKey: ['job', jobId] });

      // Snapshot previous values for rollback
      const previousJobs = queryClient.getQueryData(['jobs']);
      const previousSavedJobs = queryClient.getQueryData(['saved-jobs']);
      const previousJob = queryClient.getQueryData(['job', jobId]);

      // Optimistically update job in jobs list
      queryClient.setQueryData(['jobs'], (old: any) => {
        if (!old?.data?.jobs) return old;
        
        return {
          ...old,
          data: {
            ...old.data,
            jobs: old.data.jobs.map((job: any) => 
              job.id === jobId 
                ? { 
                    ...job, 
                    isSaved: action === 'save',
                    saveCount: action === 'save' 
                      ? (job.saveCount || 0) + 1 
                      : Math.max((job.saveCount || 1) - 1, 0)
                  }
                : job
            )
          }
        };
      });

      // Optimistically update individual job
      queryClient.setQueryData(['job', jobId], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          isSaved: action === 'save',
          saveCount: action === 'save' 
            ? (old.saveCount || 0) + 1 
            : Math.max((old.saveCount || 1) - 1, 0)
        };
      });

      // Optimistically update saved jobs list
      if (action === 'unsave') {
        queryClient.setQueryData(['saved-jobs'], (old: any) => {
          if (!old?.data) return old;
          return {
            ...old,
            data: old.data.filter((savedJob: any) => savedJob.jobId !== jobId)
          };
        });
      }

      return { previousJobs, previousSavedJobs, previousJob };
    },

    // On success - show success message and invalidate related queries
    onSuccess: (data, { action }) => {
      const message = action === 'save' 
        ? 'Việc làm đã được lưu thành công!' 
        : 'Đã bỏ lưu việc làm!';
      
      toast({
        title: "Thành công",
        description: message,
        variant: "default",
      });

      // Invalidate and refetch related queries to ensure consistency
      queryClient.invalidateQueries({ queryKey: ['saved-jobs'] });
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      queryClient.invalidateQueries({ queryKey: ['featured-jobs'] });
    },

    // On error - rollback optimistic updates and show error message
    onError: (error, { action }, context) => {
      // Rollback optimistic updates
      if (context?.previousJobs) {
        queryClient.setQueryData(['jobs'], context.previousJobs);
      }
      if (context?.previousSavedJobs) {
        queryClient.setQueryData(['saved-jobs'], context.previousSavedJobs);
      }
      if (context?.previousJob) {
        queryClient.setQueryData(['job', context.previousJob.id], context.previousJob);
      }

      const message = action === 'save'
        ? 'Không thể lưu việc làm. Vui lòng thử lại!'
        : 'Không thể bỏ lưu việc làm. Vui lòng thử lại!';

      toast({
        title: "Lỗi",
        description: message,
        variant: "destructive",
      });

      console.error('Save job error:', error);
    },

    // Always run after mutation (success or error)
    onSettled: () => {
      // Ensure queries are refetched to sync with server state
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      queryClient.invalidateQueries({ queryKey: ['saved-jobs'] });
    },
  });
};

/**
 * Hook to get saved job status for a specific job
 * 
 * @param jobId - The job ID to check
 * @returns Object with isSaved status and loading state
 */
export const useSavedJobStatus = (jobId: string) => {
  const queryClient = useQueryClient();
  
  // Get saved status from cache or query
  const savedJobs = queryClient.getQueryData(['saved-jobs']) as any;
  const isSaved = savedJobs?.data?.some((savedJob: any) => savedJob.jobId === jobId) || false;
  
  return { isSaved };
};

/**
 * Utility function to toggle save status
 * 
 * @param jobId - The job ID
 * @param currentlySaved - Current save status
 * @param saveJobMutation - The save job mutation from useSaveJob
 */
export const toggleSaveJob = (
  jobId: string, 
  currentlySaved: boolean, 
  saveJobMutation: ReturnType<typeof useSaveJob>['mutate']
) => {
  saveJobMutation({
    jobId,
    action: currentlySaved ? 'unsave' : 'save'
  });
};
