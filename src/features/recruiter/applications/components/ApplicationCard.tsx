import React from "react";
import { useTranslation } from "react-i18next";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MapPin,
  Clock,
  Mail,
  Phone,
  MoreVertical,
  Eye,
  Download,
  MessageSquare,
  User,
  Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatSalary } from "@/utils/common";
import { ApiApplication, ApplicationStatus } from "../types";
import { getAvailableTransitions } from "../utils";
import { ApplicationStatusBadge } from "./ApplicationStatusBadge";

interface ApplicationCardProps {
  application: ApiApplication;
  onStatusChange: (applicationId: number, status: ApplicationStatus) => void;
  onViewDetail: (application: ApiApplication) => void;
  onCreateInterview?: (application: ApiApplication) => void;
  isSelected?: boolean;
  onSelect?: (applicationId: number) => void;
  showJobInfo?: boolean;
  className?: string;
}

export function ApplicationCard({
  application,
  onStatusChange,
  onViewDetail,
  onCreateInterview,
  isSelected = false,
  onSelect,
  showJobInfo = true,
  className,
}: ApplicationCardProps) {
  const { t, i18n } = useTranslation();
  const locale = i18n.language === "vi" ? vi : undefined;

  const candidate = application.resume.user;
  const job = application.job_post;
  const company = job.company;

  const handleStatusChange = (newStatus: ApplicationStatus) => {
    onStatusChange(application.application_id, newStatus);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatJobSalary = (min?: number, max?: number) => {
    return formatSalary({ min, max }, t);
  };

  const statusActions = getAvailableTransitions(application.status).map(
    (transition) => ({
      status: transition.value,
      label: t(`recruiterApplications.status.${transition.value}`),
      disabled: false,
    })
  );

  return (
    <Card
      className={cn(
        "transition-all duration-200 hover:shadow-md",
        isSelected && "ring-2 ring-primary ring-offset-2",
        className
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            {/* Selection Checkbox */}
            {onSelect && (
              <Checkbox
                checked={isSelected}
                onCheckedChange={() => onSelect(application.application_id)}
                className="mt-1"
              />
            )}

            {/* Candidate Avatar */}
            <Avatar className="h-12 w-12">
              <AvatarImage src={candidate.avatar} alt={candidate.full_name} />
              <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                {getInitials(candidate.full_name)}
              </AvatarFallback>
            </Avatar>

            {/* Candidate Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-lg text-gray-900 truncate">
                  {candidate.full_name}
                </h3>
                <ApplicationStatusBadge status={application.status} size="sm" />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  <span className="truncate">{candidate.email}</span>
                </div>
                {candidate.phone && (
                  <div className="flex items-center gap-1">
                    <Phone className="h-4 w-4" />
                    <span>{candidate.phone}</span>
                  </div>
                )}
              </div>

              {/* Job Info */}
              {showJobInfo && (
                <div className="mt-2 p-2 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 truncate">
                        {job.job_title}
                      </h4>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                        <span className="font-medium">
                          {company.company_name}
                        </span>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>{job.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right text-sm">
                      <div className="font-medium text-gray-900">
                        {formatJobSalary(job.salary_min, job.salary_max)}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {t(`jobs.type.${job.job_type}`)}
                      </Badge>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Actions Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => onViewDetail(application)}>
                <Eye className="h-4 w-4 mr-2" />
                {t("applications.actions.viewDetail")}
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Download className="h-4 w-4 mr-2" />
                {t("applications.actions.downloadCV")}
              </DropdownMenuItem>

              <DropdownMenuItem>
                <MessageSquare className="h-4 w-4 mr-2" />
                {t("applications.actions.sendMessage")}
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              {statusActions.map((action) => (
                <DropdownMenuItem
                  key={action.status}
                  onClick={() => handleStatusChange(action.status)}
                  disabled={action.disabled}
                >
                  <User className="h-4 w-4 mr-2" />
                  {action.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Application Timeline */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>
              {t("applications.appliedAt")}:{" "}
              {formatDistanceToNow(new Date(application.applied_at), {
                addSuffix: true,
                locale,
              })}
            </span>
          </div>

          {application.updated_at !== application.applied_at && (
            <div className="text-xs">
              {t("applications.lastUpdated")}:{" "}
              {formatDistanceToNow(new Date(application.updated_at), {
                addSuffix: true,
                locale,
              })}
            </div>
          )}
        </div>

        {/* Cover Letter Preview */}
        {application.cover_letter && (
          <div className="mt-3 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-700 line-clamp-2">
              <span className="font-medium">
                {t("applications.coverLetter")}:
              </span>{" "}
              {application.cover_letter}
            </p>
          </div>
        )}

        {/* Quick Actions */}
        <div className="flex gap-2 mt-4 ">
          <Button
            size="sm"
            onClick={() => onViewDetail(application)}
            className="flex-1"
          >
            <Eye className="h-4 w-4 mr-2" />
            {t("applications.actions.viewDetail")}
          </Button>

          {application.status === ApplicationStatus.PENDING && (
            <>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleStatusChange(ApplicationStatus.REJECTED)}
                className="flex-1"
              >
                {t("recruiterApplications.actions.reject")}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleStatusChange(ApplicationStatus.REVIEWING)}
                className="flex-1"
              >
                {t("applications.actions.review")}
              </Button>
            </>
          )}

          {application.status === ApplicationStatus.REVIEWING &&
            onCreateInterview && (
              <Button
                size="sm"
                variant="default"
                onClick={() => onCreateInterview(application)}
                className="flex-1"
              >
                <Calendar className="h-4 w-4 mr-2" />
                {t("recruiterInterviews.actions.createInterview")}
              </Button>
            )}
        </div>
      </CardContent>
    </Card>
  );
}
