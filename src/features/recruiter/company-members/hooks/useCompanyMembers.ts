import { useQuery } from "@tanstack/react-query";
import { getCompanyMembers, getPendingMembers, getCurrentUserRole } from "../api";
import { CompanyMemberFilters } from "../types";

// Query keys
export const companyMemberKeys = {
  all: ["company-members"] as const,
  lists: () => [...companyMemberKeys.all, "list"] as const,
  list: (companyId: number, filters: CompanyMemberFilters) => 
    [...companyMemberKeys.lists(), companyId, filters] as const,
  pending: (companyId: number) => 
    [...companyMemberKeys.all, "pending", companyId] as const,
  details: () => [...companyMemberKeys.all, "detail"] as const,
  detail: (companyId: number, memberId: number) => 
    [...companyMemberKeys.details(), companyId, memberId] as const,
  currentUserRole: (companyId: number) => 
    [...companyMemberKeys.all, "current-user-role", companyId] as const,
  stats: (companyId: number) => 
    [...companyMemberKeys.all, "stats", companyId] as const,
} as const;

// Get company members with filters
export const useCompanyMembers = (
  companyId: number,
  filters: CompanyMemberFilters = {}
) => {
  return useQuery({
    queryKey: companyMemberKeys.list(companyId, filters),
    queryFn: () => getCompanyMembers(companyId, filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    enabled: !!companyId,
  });
};

// Get pending members for approval
export const usePendingMembers = (companyId: number) => {
  return useQuery({
    queryKey: companyMemberKeys.pending(companyId),
    queryFn: () => getPendingMembers(companyId),
    staleTime: 2 * 60 * 1000, // 2 minutes - more frequent updates for pending
    retry: 2,
    enabled: !!companyId,
  });
};

// Get current user's role in company
export const useCurrentUserRole = (companyId: number) => {
  return useQuery({
    queryKey: companyMemberKeys.currentUserRole(companyId),
    queryFn: () => getCurrentUserRole(companyId),
    staleTime: 10 * 60 * 1000, // 10 minutes - role doesn't change often
    retry: 2,
    enabled: !!companyId,
  });
};
