// Company Members Management types

export interface ApiUser {
  user_id: number;
  full_name: string;
  email: string;
  phone?: string;
  avatar_url?: string;
  location?: string;
  created_at: string;
}

export interface ApiCompanyMember {
  user_company_id: number;
  user: ApiUser;
  company_id: number;
  role: CompanyRole;
  status: MemberStatus;
  joined_at: string;
  approved_at?: string;
  approved_by?: number;
  created_at: string;
  updated_at: string;
}

export interface ApiCompanyMembersResponse {
  members: ApiCompanyMember[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export enum CompanyRole {
  OWNER = 'owner',
  ADMIN = 'admin',
  HR = 'hr',
  RECRUITER = 'recruiter',
  EMPLOYEE = 'employee'
}

export enum MemberStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  SUSPENDED = 'suspended'
}

export interface CompanyMemberFilters {
  search?: string;
  role?: CompanyRole;
  status?: MemberStatus;
  page?: number;
  limit?: number;
  sortBy?: 'joined_at' | 'approved_at' | 'full_name' | 'role';
  sortOrder?: 'asc' | 'desc';
}

export interface UpdateMemberRequest {
  role?: CompanyRole;
  status?: MemberStatus;
}

export interface ApproveMemberRequest {
  status: MemberStatus.APPROVED | MemberStatus.REJECTED;
  role?: CompanyRole;
}

export interface CompanyMemberStats {
  total: number;
  pending: number;
  approved: number;
  byRole: {
    [key in CompanyRole]: number;
  };
}

// UI-specific types
export interface CompanyMemberCardProps {
  member: ApiCompanyMember;
  onApprove: (memberId: number, role: CompanyRole) => void;
  onReject: (memberId: number) => void;
  onUpdateRole: (memberId: number, role: CompanyRole) => void;
  onRemove: (memberId: number) => void;
  currentUserRole: CompanyRole;
  isLoading?: boolean;
}

export interface CompanyMemberFiltersProps {
  filters: CompanyMemberFilters;
  onFiltersChange: (filters: CompanyMemberFilters) => void;
  isLoading?: boolean;
}

export interface CompanyMemberTableProps {
  members: ApiCompanyMember[];
  selectedMembers: number[];
  onSelectMember: (memberId: number) => void;
  onSelectAll: (checked: boolean) => void;
  onApprove: (memberId: number, role: CompanyRole) => void;
  onReject: (memberId: number) => void;
  onUpdateRole: (memberId: number, role: CompanyRole) => void;
  onRemove: (memberId: number) => void;
  currentUserRole: CompanyRole;
  isLoading?: boolean;
}
