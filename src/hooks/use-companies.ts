/**
 * Companies Hooks
 * Modern TanStack Query hooks following best practices
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  fetchCompanies,
  fetchCompany,
  searchCompanies,
  fetchCompanyJobs,
  followCompany,
  unfollowCompany,
  fetchFeaturedCompanies,
  fetchTopCompanies,
  fetchCompaniesByIndustry,
  type Company,
  type CompaniesResponse,
  type CompanySearchParams,
} from '@/lib/api/companies';
import { queryKeys, invalidateQueries } from '@/lib/query-client';

// Query Hooks

/**
 * Get all companies with optional filtering
 */
export function useCompanies(params?: CompanySearchParams) {
  return useQuery({
    queryKey: queryKeys.companies.list(params),
    queryFn: () => fetchCompanies(params),
    staleTime: 5 * 60 * 1000, // 5 minutes for company listings
  });
}

/**
 * Get company by ID
 */
export function useCompany(id: string) {
  return useQuery({
    queryKey: queryKeys.companies.detail(id),
    queryFn: () => fetchCompany(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes for company details
  });
}

/**
 * Search companies with query
 */
export function useCompanySearch(params: CompanySearchParams) {
  return useQuery({
    queryKey: ['companies', 'search', params.q || ''],
    queryFn: () => searchCompanies(params),
    enabled: !!params.q, // Only search when there's a query
    staleTime: 2 * 60 * 1000, // 2 minutes for search results
  });
}

/**
 * Get jobs from a specific company
 */
export function useCompanyJobs(companyId: string, params?: { page?: number; limit?: number }) {
  return useQuery({
    queryKey: queryKeys.companies.jobs(companyId),
    queryFn: () => fetchCompanyJobs(companyId, params),
    enabled: !!companyId,
    staleTime: 3 * 60 * 1000, // 3 minutes for company jobs
  });
}

/**
 * Get featured companies
 */
export function useFeaturedCompanies(limit = 6) {
  return useQuery({
    queryKey: ['companies', 'featured', limit],
    queryFn: () => fetchFeaturedCompanies(limit),
    staleTime: 15 * 60 * 1000, // 15 minutes for featured companies
  });
}

/**
 * Get top companies by followers
 */
export function useTopCompanies(limit = 10) {
  return useQuery({
    queryKey: ['companies', 'top', limit],
    queryFn: () => fetchTopCompanies(limit),
    staleTime: 10 * 60 * 1000, // 10 minutes for top companies
  });
}

/**
 * Get companies by industry
 */
export function useCompaniesByIndustry(industry: string, limit = 10) {
  return useQuery({
    queryKey: ['companies', 'industry', industry, limit],
    queryFn: () => fetchCompaniesByIndustry(industry, limit),
    enabled: !!industry,
    staleTime: 10 * 60 * 1000, // 10 minutes for industry companies
  });
}

// Mutation Hooks

/**
 * Follow a company
 */
export function useFollowCompany() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: followCompany,
    onSuccess: (_, companyId) => {
      toast.success('Đã theo dõi công ty!');
      
      // Invalidate company lists to show updated follow status
      invalidateQueries.companies();
      
      // Update the specific company
      queryClient.invalidateQueries({ 
        queryKey: queryKeys.companies.detail(companyId) 
      });
    },
    onError: (error) => {
      console.error('Follow company error:', error);
    },
  });
}

/**
 * Unfollow a company
 */
export function useUnfollowCompany() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: unfollowCompany,
    onSuccess: (_, companyId) => {
      toast.success('Đã bỏ theo dõi công ty!');
      
      // Invalidate company lists to show updated follow status
      invalidateQueries.companies();
      
      // Update the specific company
      queryClient.invalidateQueries({ 
        queryKey: queryKeys.companies.detail(companyId) 
      });
    },
    onError: (error) => {
      console.error('Unfollow company error:', error);
    },
  });
}

/**
 * Toggle company follow status with optimistic updates
 */
export function useToggleCompanyFollow() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ companyId, isFollowing }: { companyId: string; isFollowing: boolean }) => {
      if (isFollowing) {
        await unfollowCompany(companyId);
      } else {
        await followCompany(companyId);
      }
      return { companyId, newFollowStatus: !isFollowing };
    },
    
    // Optimistic update
    onMutate: async ({ companyId, isFollowing }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: queryKeys.companies.detail(companyId) });
      
      // Snapshot the previous value
      const previousCompany = queryClient.getQueryData<Company>(queryKeys.companies.detail(companyId));
      
      // Optimistically update to the new value
      if (previousCompany) {
        queryClient.setQueryData<Company>(queryKeys.companies.detail(companyId), {
          ...previousCompany,
          followersCount: isFollowing 
            ? previousCompany.followersCount - 1 
            : previousCompany.followersCount + 1,
        });
      }
      
      // Return a context object with the snapshotted value
      return { previousCompany };
    },
    
    onSuccess: ({ companyId, newFollowStatus }) => {
      toast.success(newFollowStatus ? 'Đã theo dõi công ty!' : 'Đã bỏ theo dõi công ty!');
      
      // Invalidate and refetch
      invalidateQueries.companies();
    },
    
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (err, { companyId }, context) => {
      if (context?.previousCompany) {
        queryClient.setQueryData(queryKeys.companies.detail(companyId), context.previousCompany);
      }
      console.error('Toggle company follow error:', err);
    },
    
    // Always refetch after error or success
    onSettled: (_, __, { companyId }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.companies.detail(companyId) });
    },
  });
}

// Prefetch utilities

/**
 * Prefetch company details
 */
export function usePrefetchCompany() {
  const queryClient = useQueryClient();
  
  return (companyId: string) => {
    queryClient.prefetchQuery({
      queryKey: queryKeys.companies.detail(companyId),
      queryFn: () => fetchCompany(companyId),
      staleTime: 10 * 60 * 1000,
    });
  };
}

/**
 * Prefetch company jobs
 */
export function usePrefetchCompanyJobs() {
  const queryClient = useQueryClient();
  
  return (companyId: string, params?: { page?: number; limit?: number }) => {
    queryClient.prefetchQuery({
      queryKey: queryKeys.companies.jobs(companyId),
      queryFn: () => fetchCompanyJobs(companyId, params),
      staleTime: 3 * 60 * 1000,
    });
  };
}

/**
 * Prefetch companies list
 */
export function usePrefetchCompanies() {
  const queryClient = useQueryClient();
  
  return (params?: CompanySearchParams) => {
    queryClient.prefetchQuery({
      queryKey: queryKeys.companies.list(params),
      queryFn: () => fetchCompanies(params),
      staleTime: 5 * 60 * 1000,
    });
  };
}
