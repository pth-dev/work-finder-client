import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService } from '../services/api';
import { useAppStore } from '../stores/app-store';
import type { Job, User, PaginationParams } from '../types';

// Query keys
export const queryKeys = {
  users: ['users'] as const,
  user: (id: string) => ['users', id] as const,
  profile: ['users', 'profile'] as const,
  jobs: ['jobs'] as const,
  job: (id: string) => ['jobs', id] as const,
  jobsWithFilters: (filters: any) => ['jobs', 'filtered', filters] as const,
};

// User hooks
export const useProfile = () => {
  return useQuery({
    queryKey: queryKeys.profile,
    queryFn: async () => {
      const response = await apiService.users.getProfile();
      return response.data.data as User;
    },
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const addNotification = useAppStore((state) => state.addNotification);

  return useMutation({
    mutationFn: (data: Partial<User>) => apiService.users.updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.profile });
      addNotification({
        type: 'success',
        title: 'Success',
        message: 'Profile updated successfully',
      });
    },
    onError: (error: any) => {
      addNotification({
        type: 'error',
        title: 'Error',
        message: error.message || 'Failed to update profile',
      });
    },
  });
};

// Job hooks
export const useJobs = (params?: PaginationParams & { filters?: any }) => {
  return useQuery({
    queryKey: params?.filters 
      ? queryKeys.jobsWithFilters(params)
      : queryKeys.jobs,
    queryFn: async () => {
      const response = await apiService.jobs.getJobs(params);
      return response.data.data as Job[];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useJob = (id: string) => {
  return useQuery({
    queryKey: queryKeys.job(id),
    queryFn: async () => {
      const response = await apiService.jobs.getJob(id);
      return response.data.data as Job;
    },
    enabled: !!id,
  });
};

export const useCreateJob = () => {
  const queryClient = useQueryClient();
  const addNotification = useAppStore((state) => state.addNotification);

  return useMutation({
    mutationFn: (data: Partial<Job>) => apiService.jobs.createJob(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.jobs });
      addNotification({
        type: 'success',
        title: 'Success',
        message: 'Job created successfully',
      });
    },
    onError: (error: any) => {
      addNotification({
        type: 'error',
        title: 'Error',
        message: error.message || 'Failed to create job',
      });
    },
  });
};

export const useUpdateJob = () => {
  const queryClient = useQueryClient();
  const addNotification = useAppStore((state) => state.addNotification);

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Job> }) =>
      apiService.jobs.updateJob(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.jobs });
      queryClient.invalidateQueries({ queryKey: queryKeys.job(id) });
      addNotification({
        type: 'success',
        title: 'Success',
        message: 'Job updated successfully',
      });
    },
    onError: (error: any) => {
      addNotification({
        type: 'error',
        title: 'Error',
        message: error.message || 'Failed to update job',
      });
    },
  });
};

export const useDeleteJob = () => {
  const queryClient = useQueryClient();
  const addNotification = useAppStore((state) => state.addNotification);

  return useMutation({
    mutationFn: (id: string) => apiService.jobs.deleteJob(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.jobs });
      addNotification({
        type: 'success',
        title: 'Success',
        message: 'Job deleted successfully',
      });
    },
    onError: (error: any) => {
      addNotification({
        type: 'error',
        title: 'Error',
        message: error.message || 'Failed to delete job',
      });
    },
  });
};

export const useApplyToJob = () => {
  const addNotification = useAppStore((state) => state.addNotification);

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      apiService.jobs.applyToJob(id, data),
    onSuccess: () => {
      addNotification({
        type: 'success',
        title: 'Success',
        message: 'Application submitted successfully',
      });
    },
    onError: (error: any) => {
      addNotification({
        type: 'error',
        title: 'Error',
        message: error.message || 'Failed to submit application',
      });
    },
  });
};
