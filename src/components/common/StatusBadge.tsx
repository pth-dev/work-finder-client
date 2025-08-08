import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  UserCheck,
  Calendar,
  Briefcase,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type StatusType =
  | "pending"
  | "approved"
  | "rejected"
  | "reviewed"
  | "interviewed"
  | "offered"
  | "hired"
  | "active"
  | "inactive"
  | "draft";

interface StatusBadgeProps {
  status: StatusType;
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
  className?: string;
}

const statusConfig = {
  pending: {
    icon: Clock,
    className: "bg-yellow-50 text-yellow-700 border-yellow-200",
    i18nKey: "admin.jobs.status.pending",
  },
  approved: {
    icon: CheckCircle,
    className: "bg-green-50 text-green-700 border-green-200",
    i18nKey: "admin.jobs.status.approved",
  },
  rejected: {
    icon: XCircle,
    className: "bg-red-50 text-red-700 border-red-200",
    i18nKey: "admin.jobs.status.rejected",
  },
  reviewed: {
    icon: Eye,
    className: "bg-blue-50 text-blue-700 border-blue-200",
    i18nKey: "status.reviewed",
  },
  interviewed: {
    icon: UserCheck,
    className: "bg-purple-50 text-purple-700 border-purple-200",
    i18nKey: "status.interviewed",
  },
  offered: {
    icon: Calendar,
    className: "bg-orange-50 text-orange-700 border-orange-200",
    i18nKey: "status.offered",
  },
  hired: {
    icon: Briefcase,
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
    i18nKey: "status.hired",
  },
  active: {
    icon: CheckCircle,
    className: "bg-green-50 text-green-700 border-green-200",
    i18nKey: "status.active",
  },
  inactive: {
    icon: XCircle,
    className: "bg-gray-50 text-gray-700 border-gray-200",
    i18nKey: "status.inactive",
  },
  draft: {
    icon: Clock,
    className: "bg-gray-50 text-gray-700 border-gray-200",
    i18nKey: "status.draft",
  },
};

const sizeConfig = {
  sm: {
    badge: "text-xs px-2 py-1",
    icon: "h-3 w-3",
  },
  md: {
    badge: "text-sm px-3 py-1",
    icon: "h-4 w-4",
  },
  lg: {
    badge: "text-base px-4 py-2",
    icon: "h-5 w-5",
  },
};

export function StatusBadge({
  status,
  size = "md",
  showIcon = true,
  className,
}: StatusBadgeProps) {
  const { t } = useTranslation();

  const config = statusConfig[status];
  const sizeStyles = sizeConfig[size];

  if (!config) {
    console.warn(`Unknown status: ${status}`);
    return null;
  }

  const Icon = config.icon;

  return (
    <Badge
      variant="outline"
      className={cn(config.className, sizeStyles.badge, className)}
    >
      {showIcon && <Icon className={cn(sizeStyles.icon, "mr-1")} />}
      {t(config.i18nKey, status)}
    </Badge>
  );
}

// Convenience components for specific use cases
export function JobStatusBadge({
  status,
  ...props
}: Omit<StatusBadgeProps, "status"> & {
  status: "pending" | "approved" | "rejected" | "active" | "inactive" | "draft";
}) {
  return <StatusBadge status={status} {...props} />;
}

export function ApplicationStatusBadge({
  status,
  ...props
}: Omit<StatusBadgeProps, "status"> & {
  status:
    | "pending"
    | "reviewed"
    | "interviewed"
    | "offered"
    | "hired"
    | "rejected";
}) {
  return <StatusBadge status={status} {...props} />;
}
