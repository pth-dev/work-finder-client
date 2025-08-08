// import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Alert, AlertDescription } from "@/components/ui";
import { Shield, Users } from "lucide-react";
// import { useCompanyMembers, useCurrentUserRole } from "../hooks";
import {
  // ApiCompanyMember,
  // CompanyMemberFilters,
  CompanyRole,
  // MemberStatus,
} from "../types";

interface CompanyMembersManagementProps {
  companyId: number;
}

export function CompanyMembersManagement({}: CompanyMembersManagementProps) {
  const { t } = useTranslation();
  // const [filters] = useState<CompanyMemberFilters>({
  //   page: 1,
  //   limit: 20,
  //   sortBy: "joined_at",
  //   sortOrder: "desc",
  // });
  // const [selectedMember, setSelectedMember] = useState<ApiCompanyMember | null>(null);

  // Check current user's role - temporarily disabled to avoid API errors
  // const {
  //   data: currentUserRole,
  //   isLoading: roleLoading,
  //   error: roleError,
  // } = useCurrentUserRole(companyId);

  // Data fetching - temporarily disabled to avoid API errors
  // const {
  //   data: membersData,
  //   // isLoading: membersLoading,
  //   // error: membersError,
  // } = useCompanyMembers(companyId, filters);

  // Mock data for testing
  const currentUserRole = { role: CompanyRole.OWNER, status: "approved" };
  const roleLoading = false;
  const roleError = null;
  const membersData = { total: 0, members: [] };

  // Mutations - commented out unused mutations
  // const approveMutation = useApproveMember(companyId);
  // const updateMutation = useUpdateMember(companyId);
  // const removeMutation = useRemoveMember(companyId);
  // const bulkApproveMutation = useBulkApproveMembers(companyId);
  // const bulkRemoveMutation = useBulkRemoveMembers(companyId);

  // Check if current user is owner
  const isOwner = currentUserRole?.role === CompanyRole.OWNER;
  const canManageMembers =
    isOwner || currentUserRole?.role === CompanyRole.ADMIN;

  // Handlers - TODO: Implement when needed
  // const handleFiltersChange = useCallback((newFilters: CompanyMemberFilters) => {
  //   setFilters(newFilters);
  // }, []);

  // TODO: Implement handlers when needed
  // const handleViewDetail = useCallback((member: ApiCompanyMember) => {
  //   setSelectedMember(member);
  // }, []);

  // const handleCloseDetail = useCallback(() => {
  //   setSelectedMember(null);
  // }, []);

  // const handlePageChange = useCallback((page: number) => {
  //   setFilters((prev) => ({ ...prev, page }));
  // }, []);

  // const handleExport = useCallback(() => {
  //   toast.success(t("companyMembers.messages.exportStarted"));
  // }, [t]);

  // Loading state
  if (roleLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-sm text-gray-500">{t("common.loading")}...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (roleError) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          {t("companyMembers.errors.loadRoleFailed")}
        </AlertDescription>
      </Alert>
    );
  }

  // Access denied
  if (!canManageMembers) {
    return (
      <div className="text-center py-8">
        <Shield className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {t("companyMembers.accessDenied.title")}
        </h3>
        <p className="text-gray-500">
          {t("companyMembers.accessDenied.description")}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Users className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold text-gray-900">
            {t("companyMembers.title")}
          </h1>
        </div>
        <p className="text-gray-600">{t("companyMembers.subtitle")}</p>

        {/* Role indicator */}
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-500">{t("companyMembers.yourRole")}:</span>
          <span className="font-medium text-primary">
            {t(`companyMembers.role.${currentUserRole?.role}`)}
          </span>
        </div>
      </div>

      {/* Company Members List - TODO: Implement */}
      <div className="text-center py-8 text-gray-500">
        <p>Company Members Management - Coming Soon</p>
        <p className="text-sm mt-2">Total: {membersData?.total || 0} members</p>
        <p className="text-xs mt-1">
          Role: {currentUserRole?.role} | Can Manage:{" "}
          {canManageMembers ? "Yes" : "No"}
        </p>
      </div>

      {/* Member Detail Modal - TODO: Implement */}
      {/* {selectedMember && (
        <div>
          <p>Member Detail Modal for: {selectedMember.user.full_name}</p>
        </div>
      )} */}
    </div>
  );
}
