/**
 * Applications Hooks
 * Modern TanStack Query hooks following best practices
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  fetchApplications,
  fetchApplication,
  fetchApplicationStats,
  createApplication,
  updateApplication,
  withdrawApplication,
  fetchApplicationsByStatus,
  fetchRecentApplications,
  checkJobApplication,
  type Application,
  type ApplicationsResponse,
  type ApplicationStats,
  type ApplicationSearchParams,
} from '@/lib/api/applications';
import { queryKeys, invalidateQueries } from '@/lib/query-client';

// Query Hooks

/**
 * Get all applications with optional filtering
 */
export function useApplications(params?: ApplicationSearchParams) {
  return useQuery({
    queryKey: queryKeys.applications.list(params),
    queryFn: () => fetchApplications(params),
    staleTime: 2 * 60 * 1000, // 2 minutes for application listings
  });
}

/**
 * Get application by ID
 */
export function useApplication(id: string) {
  return useQuery({
    queryKey: queryKeys.applications.detail(id),
    queryFn: () => fetchApplication(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes for application details
  });
}

/**
 * Get application statistics
 */
export function useApplicationStats() {
  return useQuery({
    queryKey: queryKeys.applications.stats,
    queryFn: fetchApplicationStats,
    staleTime: 5 * 60 * 1000, // 5 minutes for stats
  });
}

/**
 * Get applications by status
 */
export function useApplicationsByStatus(status: string, params?: { page?: number; limit?: number }) {
  return useQuery({
    queryKey: ['applications', 'status', status, params],
    queryFn: () => fetchApplicationsByStatus(status, params),
    enabled: !!status,
    staleTime: 2 * 60 * 1000, // 2 minutes for status-filtered applications
  });
}

/**
 * Get recent applications
 */
export function useRecentApplications(limit = 10) {
  return useQuery({
    queryKey: ['applications', 'recent', limit],
    queryFn: () => fetchRecentApplications(limit),
    staleTime: 3 * 60 * 1000, // 3 minutes for recent applications
  });
}

/**
 * Check if user has applied to a job
 */
export function useJobApplicationStatus(jobId: string) {
  return useQuery({
    queryKey: ['applications', 'job-status', jobId],
    queryFn: () => checkJobApplication(jobId),
    enabled: !!jobId,
    staleTime: 1 * 60 * 1000, // 1 minute for application status
  });
}

// Mutation Hooks

/**
 * Create a new application
 */
export function useCreateApplication() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createApplication,
    onSuccess: (newApplication) => {
      toast.success('Ứng tuyển thành công!');
      
      // Invalidate applications list
      invalidateQueries.applications();
      
      // Invalidate job application status
      queryClient.invalidateQueries({ 
        queryKey: ['applications', 'job-status', newApplication.job.id] 
      });
      
      // Invalidate job details to update application count
      queryClient.invalidateQueries({ 
        queryKey: queryKeys.jobs.detail(newApplication.job.id) 
      });
    },
    onError: (error) => {
      console.error('Create application error:', error);
    },
  });
}

/**
 * Update an application
 */
export function useUpdateApplication() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ applicationId, data }: { applicationId: string; data: Partial<Application> }) =>
      updateApplication(applicationId, data),
    onSuccess: (updatedApplication) => {
      toast.success('Cập nhật đơn ứng tuyển thành công!');
      
      // Update the specific application
      queryClient.setQueryData(
        queryKeys.applications.detail(updatedApplication.id),
        updatedApplication
      );
      
      // Invalidate applications list
      invalidateQueries.applications();
    },
    onError: (error) => {
      console.error('Update application error:', error);
    },
  });
}

/**
 * Withdraw an application
 */
export function useWithdrawApplication() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: withdrawApplication,
    onSuccess: (_, applicationId) => {
      toast.success('Đã rút đơn ứng tuyển!');
      
      // Invalidate applications list
      invalidateQueries.applications();
      
      // Remove the specific application from cache
      queryClient.removeQueries({ 
        queryKey: queryKeys.applications.detail(applicationId) 
      });
    },
    onError: (error) => {
      console.error('Withdraw application error:', error);
    },
  });
}

/**
 * Withdraw application with optimistic updates
 */
export function useWithdrawApplicationOptimistic() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: withdrawApplication,
    
    // Optimistic update
    onMutate: async (applicationId) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: queryKeys.applications.detail(applicationId) });
      
      // Snapshot the previous value
      const previousApplication = queryClient.getQueryData<Application>(
        queryKeys.applications.detail(applicationId)
      );
      
      // Optimistically update to withdrawn status
      if (previousApplication) {
        queryClient.setQueryData<Application>(
          queryKeys.applications.detail(applicationId),
          {
            ...previousApplication,
            status: 'withdrawn',
            updatedAt: new Date().toISOString(),
          }
        );
      }
      
      // Return a context object with the snapshotted value
      return { previousApplication };
    },
    
    onSuccess: (_, applicationId) => {
      toast.success('Đã rút đơn ứng tuyển!');
      
      // Invalidate and refetch
      invalidateQueries.applications();
    },
    
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (err, applicationId, context) => {
      if (context?.previousApplication) {
        queryClient.setQueryData(
          queryKeys.applications.detail(applicationId),
          context.previousApplication
        );
      }
      console.error('Withdraw application error:', err);
    },
    
    // Always refetch after error or success
    onSettled: (_, __, applicationId) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.applications.detail(applicationId) });
    },
  });
}

// Prefetch utilities

/**
 * Prefetch application details
 */
export function usePrefetchApplication() {
  const queryClient = useQueryClient();
  
  return (applicationId: string) => {
    queryClient.prefetchQuery({
      queryKey: queryKeys.applications.detail(applicationId),
      queryFn: () => fetchApplication(applicationId),
      staleTime: 5 * 60 * 1000,
    });
  };
}

/**
 * Prefetch applications list
 */
export function usePrefetchApplications() {
  const queryClient = useQueryClient();
  
  return (params?: ApplicationSearchParams) => {
    queryClient.prefetchQuery({
      queryKey: queryKeys.applications.list(params),
      queryFn: () => fetchApplications(params),
      staleTime: 2 * 60 * 1000,
    });
  };
}

// Utility hooks

/**
 * Get applications count by status
 */
export function useApplicationsCountByStatus() {
  const { data: stats } = useApplicationStats();
  
  return {
    total: stats?.total || 0,
    pending: stats?.pending || 0,
    reviewing: stats?.reviewing || 0,
    interviewed: stats?.interviewed || 0,
    offered: stats?.offered || 0,
    rejected: stats?.rejected || 0,
    withdrawn: stats?.withdrawn || 0,
  };
}
