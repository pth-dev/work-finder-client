import {
  useQuery,
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from "@tanstack/react-query";
import { MutationConfig } from "@/lib/react-query";
import { ApiJobsResponse } from "@/features/jobs/types";
import {
  ApiCompaniesResponse,
  ApiCompanyResponse,
  CompanySearchFilters,
  CreateCompanyRequest,
  UpdateCompanyRequest,
  JoinCompanyRequest,
  FollowCompanyResponse,
  CompanyJobsFilters,
} from "../types";
import {
  getCompanies,
  getCompany,
  createCompany,
  updateCompany,
  deleteCompany,
  requestJoinCompany,
  getUserCompany,
  getFeaturedCompanies,
  followCompany,
  unfollowCompany,
  getCompanyJobs,
} from "../api/companies";

// ===== QUERY HOOKS =====

/**
 * Hook to fetch companies with filters and pagination
 */
export const useCompanies = (
  filters: CompanySearchFilters = {},
  options: {
    enabled?: boolean;
  } = {}
) => {
  return useQuery({
    queryKey: ["companies", filters],
    queryFn: () => getCompanies(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    enabled: options.enabled ?? true,
    refetchOnWindowFocus: false,
    retry: 2,
  });
};

/**
 * Hook to fetch featured companies (for homepage)
 */
export const useFeaturedCompanies = (
  limit: number = 6,
  options: {
    enabled?: boolean;
  } = {}
) => {
  return useQuery({
    queryKey: ["featured-companies", limit],
    queryFn: () => getFeaturedCompanies(limit),
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    enabled: options.enabled ?? true,
    refetchOnWindowFocus: false,
    retry: 2,
  });
};

/**
 * Hook to fetch single company by ID
 */
export const useCompany = (
  id: number,
  options: {
    enabled?: boolean;
  } = {}
) => {
  return useQuery({
    queryKey: ["company", id],
    queryFn: () => getCompany(id),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
    enabled: options.enabled ?? !!id,
    refetchOnWindowFocus: false,
    retry: 2,
  });
};

/**
 * Hook to fetch user's company membership
 */
export const useUserCompany = (
  options: {
    enabled?: boolean;
  } = {}
) => {
  return useQuery({
    queryKey: ["user-company"],
    queryFn: getUserCompany,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    enabled: options.enabled ?? true,
    refetchOnWindowFocus: true,
    retry: 2,
  });
};

/**
 * Hook to fetch jobs from a specific company
 */
export const useCompanyJobs = (
  companyId: number,
  filters: CompanyJobsFilters = {},
  options: {
    enabled?: boolean;
  } = {}
) => {
  return useQuery({
    queryKey: ["company-jobs", companyId, filters],
    queryFn: () => getCompanyJobs(companyId, filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    enabled: options.enabled ?? !!companyId,
    refetchOnWindowFocus: false,
    retry: 2,
  });
};

// ===== MUTATION HOOKS =====

type UseCreateCompanyOptions = {
  mutationConfig?: MutationConfig<typeof createCompany>;
};

export const useCreateCompany = ({
  mutationConfig,
}: UseCreateCompanyOptions = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCompany,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      queryClient.invalidateQueries({ queryKey: ["featured-companies"] });
      queryClient.invalidateQueries({ queryKey: ["user-company"] });
    },
    ...mutationConfig,
  });
};

type UseUpdateCompanyOptions = {
  mutationConfig?: Omit<
    UseMutationOptions<
      ApiCompanyResponse,
      Error,
      { id: number; data: UpdateCompanyRequest }
    >,
    "mutationFn"
  >;
};

export const useUpdateCompany = ({
  mutationConfig,
}: UseUpdateCompanyOptions = {}) => {
  const queryClient = useQueryClient();

  return useMutation<
    ApiCompanyResponse,
    Error,
    { id: number; data: UpdateCompanyRequest }
  >({
    mutationFn: ({ id, data }) => updateCompany(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["company", id] });
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      queryClient.invalidateQueries({ queryKey: ["user-company"] });
    },
    ...mutationConfig,
  });
};

type UseDeleteCompanyOptions = {
  mutationConfig?: MutationConfig<typeof deleteCompany>;
};

export const useDeleteCompany = ({
  mutationConfig,
}: UseDeleteCompanyOptions = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCompany,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      queryClient.invalidateQueries({ queryKey: ["featured-companies"] });
      queryClient.invalidateQueries({ queryKey: ["user-company"] });
    },
    ...mutationConfig,
  });
};

type UseJoinCompanyOptions = {
  mutationConfig?: MutationConfig<typeof requestJoinCompany>;
};

export const useJoinCompany = ({
  mutationConfig,
}: UseJoinCompanyOptions = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: requestJoinCompany,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-company"] });
    },
    ...mutationConfig,
  });
};

// ===== FOLLOW/UNFOLLOW HOOKS =====

type UseFollowCompanyOptions = {
  mutationConfig?: MutationConfig<typeof followCompany>;
};

export const useFollowCompany = ({
  mutationConfig,
}: UseFollowCompanyOptions = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: followCompany,
    onSuccess: (_, companyId) => {
      queryClient.invalidateQueries({ queryKey: ["company", companyId] });
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      queryClient.invalidateQueries({ queryKey: ["featured-companies"] });
    },
    ...mutationConfig,
  });
};

type UseUnfollowCompanyOptions = {
  mutationConfig?: MutationConfig<typeof unfollowCompany>;
};

export const useUnfollowCompany = ({
  mutationConfig,
}: UseUnfollowCompanyOptions = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: unfollowCompany,
    onSuccess: (_, companyId) => {
      queryClient.invalidateQueries({ queryKey: ["company", companyId] });
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      queryClient.invalidateQueries({ queryKey: ["featured-companies"] });
    },
    ...mutationConfig,
  });
};
