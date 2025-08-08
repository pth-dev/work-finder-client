import React from "react";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import { InterviewStatus } from "../types";
import { cn } from "@/lib/utils";

interface InterviewStatusBadgeProps {
  status: InterviewStatus;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const getStatusConfig = (status: InterviewStatus) => {
  switch (status) {
    case InterviewStatus.SCHEDULED:
      return {
        variant: "secondary" as const,
        className: "bg-blue-100 text-blue-800 border-blue-200",
      };
    case InterviewStatus.COMPLETED:
      return {
        variant: "secondary" as const,
        className: "bg-emerald-100 text-emerald-800 border-emerald-200",
      };
    case InterviewStatus.CANCELLED:
      return {
        variant: "secondary" as const,
        className: "bg-red-100 text-red-800 border-red-200",
      };
    case InterviewStatus.NO_SHOW:
      return {
        variant: "secondary" as const,
        className: "bg-gray-100 text-gray-800 border-gray-200",
      };
    case InterviewStatus.RESCHEDULED:
      return {
        variant: "secondary" as const,
        className: "bg-yellow-100 text-yellow-800 border-yellow-200",
      };
    default:
      return {
        variant: "secondary" as const,
        className: "bg-gray-100 text-gray-800 border-gray-200",
      };
  }
};

const getSizeClass = (size: "sm" | "md" | "lg") => {
  switch (size) {
    case "sm":
      return "text-xs px-2 py-1";
    case "md":
      return "text-sm px-2.5 py-1";
    case "lg":
      return "text-base px-3 py-1.5";
    default:
      return "text-sm px-2.5 py-1";
  }
};

export function InterviewStatusBadge({
  status,
  size = "md",
  className,
}: InterviewStatusBadgeProps) {
  const { t } = useTranslation();
  const config = getStatusConfig(status);
  const sizeClass = getSizeClass(size);

  return (
    <Badge
      variant={config.variant}
      className={cn(
        config.className,
        sizeClass,
        "font-medium border",
        className
      )}
    >
      {t(`recruiterInterviews.status.${status}`)}
    </Badge>
  );
}
