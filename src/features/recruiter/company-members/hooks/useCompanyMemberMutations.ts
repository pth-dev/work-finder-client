import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import {
  approveMember,
  updateMember,
  removeMember,
  bulkApproveMembers,
  bulkRemoveMembers,
} from "../api";
import { companyMemberKeys } from "./useCompanyMembers";
import { 
  ApproveMemberRequest, 
  UpdateMemberRequest, 
  CompanyRole,
  MemberStatus 
} from "../types";

// Approve member
export const useApproveMember = (companyId: number) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: ({ 
      memberId, 
      data 
    }: { 
      memberId: number; 
      data: ApproveMemberRequest; 
    }) => approveMember(companyId, memberId, data),
    onSuccess: (data, variables) => {
      // Invalidate and refetch members
      queryClient.invalidateQueries({ 
        queryKey: companyMemberKeys.lists() 
      });
      queryClient.invalidateQueries({ 
        queryKey: companyMemberKeys.pending(companyId) 
      });
      
      const statusKey = variables.data.status === MemberStatus.APPROVED 
        ? 'approved' 
        : 'rejected';
      
      toast.success(
        t(`companyMembers.messages.memberStatusUpdated`, {
          status: t(`companyMembers.status.${statusKey}`),
          name: data.user.full_name,
        })
      );
    },
    onError: (error) => {
      console.error("Failed to approve member:", error);
      toast.error(t("companyMembers.errors.approveFailed"));
    },
  });
};

// Update member role/status
export const useUpdateMember = (companyId: number) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: ({ 
      memberId, 
      data 
    }: { 
      memberId: number; 
      data: UpdateMemberRequest; 
    }) => updateMember(companyId, memberId, data),
    onSuccess: (data) => {
      // Invalidate and refetch members
      queryClient.invalidateQueries({ 
        queryKey: companyMemberKeys.lists() 
      });
      queryClient.invalidateQueries({ 
        queryKey: companyMemberKeys.detail(companyId, data.user_company_id) 
      });
      
      toast.success(
        t("companyMembers.messages.memberUpdated", {
          name: data.user.full_name,
        })
      );
    },
    onError: (error) => {
      console.error("Failed to update member:", error);
      toast.error(t("companyMembers.errors.updateFailed"));
    },
  });
};

// Remove member
export const useRemoveMember = (companyId: number) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: (memberId: number) => removeMember(companyId, memberId),
    onSuccess: () => {
      // Invalidate and refetch members
      queryClient.invalidateQueries({ 
        queryKey: companyMemberKeys.lists() 
      });
      
      toast.success(t("companyMembers.messages.memberRemoved"));
    },
    onError: (error) => {
      console.error("Failed to remove member:", error);
      toast.error(t("companyMembers.errors.removeFailed"));
    },
  });
};

// Bulk approve members
export const useBulkApproveMembers = (companyId: number) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: ({ 
      memberIds, 
      role 
    }: { 
      memberIds: number[]; 
      role: CompanyRole; 
    }) => bulkApproveMembers(companyId, memberIds, role),
    onSuccess: (data, variables) => {
      // Invalidate and refetch members
      queryClient.invalidateQueries({ 
        queryKey: companyMemberKeys.lists() 
      });
      queryClient.invalidateQueries({ 
        queryKey: companyMemberKeys.pending(companyId) 
      });
      
      toast.success(
        t("companyMembers.messages.bulkApproveSuccess", {
          count: variables.memberIds.length,
          role: t(`companyMembers.role.${variables.role}`),
        })
      );
    },
    onError: (error) => {
      console.error("Failed to bulk approve members:", error);
      toast.error(t("companyMembers.errors.bulkApproveFailed"));
    },
  });
};

// Bulk remove members
export const useBulkRemoveMembers = (companyId: number) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: (memberIds: number[]) => bulkRemoveMembers(companyId, memberIds),
    onSuccess: (data, variables) => {
      // Invalidate and refetch members
      queryClient.invalidateQueries({ 
        queryKey: companyMemberKeys.lists() 
      });
      
      toast.success(
        t("companyMembers.messages.bulkRemoveSuccess", {
          count: variables.length,
        })
      );
    },
    onError: (error) => {
      console.error("Failed to bulk remove members:", error);
      toast.error(t("companyMembers.errors.bulkRemoveFailed"));
    },
  });
};
