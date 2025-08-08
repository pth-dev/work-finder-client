import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { ApplicationStatus } from "../types";
import {
  Clock,
  Eye,
  MessageSquare,
  Calendar,
  CheckCircle,
  XCircle,
  ArrowLeft,
} from "lucide-react";

interface ApplicationStatusBadgeProps {
  status: ApplicationStatus;
  className?: string;
  showIcon?: boolean;
  size?: "sm" | "md" | "lg";
}

const statusConfig = {
  [ApplicationStatus.PENDING]: {
    variant: "secondary" as const,
    className: "bg-yellow-100 text-yellow-800 border-yellow-200",
    icon: Clock,
  },
  [ApplicationStatus.REVIEWING]: {
    variant: "secondary" as const,
    className: "bg-blue-100 text-blue-800 border-blue-200",
    icon: Eye,
  },

  [ApplicationStatus.INTERVIEWED]: {
    variant: "secondary" as const,
    className: "bg-purple-100 text-purple-800 border-purple-200",
    icon: MessageSquare,
  },
  [ApplicationStatus.ACCEPTED]: {
    variant: "secondary" as const,
    className: "bg-green-100 text-green-800 border-green-200",
    icon: CheckCircle,
  },
  [ApplicationStatus.REJECTED]: {
    variant: "secondary" as const,
    className: "bg-red-100 text-red-800 border-red-200",
    icon: XCircle,
  },
  [ApplicationStatus.WITHDRAWN]: {
    variant: "secondary" as const,
    className: "bg-gray-100 text-gray-800 border-gray-200",
    icon: ArrowLeft,
  },
};

const sizeClasses = {
  sm: "text-xs px-2 py-1",
  md: "text-sm px-2.5 py-1.5",
  lg: "text-base px-3 py-2",
};

export function ApplicationStatusBadge({
  status,
  className,
  showIcon = true,
  size = "md",
}: ApplicationStatusBadgeProps) {
  const { t } = useTranslation();

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Badge
      variant={config.variant}
      className={cn(
        config.className,
        sizeClasses[size],
        "font-medium border",
        className
      )}
    >
      {showIcon && (
        <Icon
          className={cn(
            "mr-1.5",
            size === "sm" && "h-3 w-3",
            size === "md" && "h-4 w-4",
            size === "lg" && "h-5 w-5"
          )}
        />
      )}
      {t(`recruiterApplications.status.${status}`)}
    </Badge>
  );
}
