import { apiClient } from "@/lib/api-client";
import {
  ApiCompanyMembersResponse,
  ApiCompanyMember,
  CompanyMemberFilters,
  UpdateMemberRequest,
  ApproveMemberRequest,
  CompanyMemberStats,
} from "../types";

// Get company members with filters
export const getCompanyMembers = async (
  companyId: number,
  filters: CompanyMemberFilters = {}
): Promise<ApiCompanyMembersResponse> => {
  const params = new URLSearchParams();

  if (filters.search) params.append("search", filters.search);
  if (filters.role) params.append("role", filters.role);
  if (filters.status) params.append("status", filters.status);
  if (filters.page) params.append("page", filters.page.toString());
  if (filters.limit) params.append("limit", filters.limit.toString());
  if (filters.sortBy) params.append("sortBy", filters.sortBy);
  if (filters.sortOrder) params.append("sortOrder", filters.sortOrder);

  const response = await apiClient.get(
    `/companies/${companyId}/members?${params.toString()}`
  );
  return response.data;
};

// Get pending members (for approval)
export const getPendingMembers = async (
  companyId: number
): Promise<ApiCompanyMember[]> => {
  const response = await apiClient.get(
    `/companies/${companyId}/members/pending`
  );
  return response.data;
};

// Get single member
export const getCompanyMember = async (
  companyId: number,
  memberId: number
): Promise<ApiCompanyMember> => {
  const response = await apiClient.get(
    `/companies/${companyId}/members/${memberId}`
  );
  return response.data;
};

// Approve member
export const approveMember = async (
  companyId: number,
  memberId: number,
  data: ApproveMemberRequest
): Promise<ApiCompanyMember> => {
  const response = await apiClient.patch(
    `/companies/${companyId}/members/${memberId}/approve`,
    data
  );
  return response.data;
};

// Update member role/status
export const updateMember = async (
  companyId: number,
  memberId: number,
  data: UpdateMemberRequest
): Promise<ApiCompanyMember> => {
  const response = await apiClient.patch(
    `/companies/${companyId}/members/${memberId}`,
    data
  );
  return response.data;
};

// Remove member from company
export const removeMember = async (
  companyId: number,
  memberId: number
): Promise<void> => {
  await apiClient.delete(`/companies/${companyId}/members/${memberId}`);
};

// Bulk approve members
export const bulkApproveMembers = async (
  companyId: number,
  memberIds: number[],
  role: string
): Promise<{ updated: number }> => {
  const response = await apiClient.patch(
    `/companies/${companyId}/members/bulk-approve`,
    {
      member_ids: memberIds,
      role,
    }
  );
  return response.data;
};

// Bulk remove members
export const bulkRemoveMembers = async (
  companyId: number,
  memberIds: number[]
): Promise<{ removed: number }> => {
  const response = await apiClient.delete(
    `/companies/${companyId}/members/bulk-remove`,
    {
      data: { member_ids: memberIds }
    }
  );
  return response.data;
};

// Get company member statistics
export const getCompanyMemberStats = async (
  companyId: number
): Promise<CompanyMemberStats> => {
  const response = await apiClient.get(`/companies/${companyId}/members/stats`);
  return response.data;
};

// Check current user's role in company
export const getCurrentUserRole = async (
  companyId: number
): Promise<{ role: string; status: string }> => {
  const response = await apiClient.get(
    `/companies/${companyId}/members/current-user`
  );
  return response.data;
};

// Export members
export const exportCompanyMembers = async (
  companyId: number,
  filters: CompanyMemberFilters = {}
): Promise<Blob> => {
  const params = new URLSearchParams();

  if (filters.search) params.append("search", filters.search);
  if (filters.role) params.append("role", filters.role);
  if (filters.status) params.append("status", filters.status);

  const response = await apiClient.get(
    `/companies/${companyId}/members/export?${params.toString()}`,
    {
      responseType: "blob",
    }
  );
  return response.data;
};
