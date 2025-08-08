import React from "react";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import {
  Eye,
  Edit,
  Calendar,
  Video,
  Phone,
  MapPin,
  MoreHorizontal,
  Clock,
  Mail,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { InterviewStatusBadge } from "./InterviewStatusBadge";
import { ApiInterview, InterviewStatus, InterviewType } from "../types";

interface InterviewsTableProps {
  interviews: ApiInterview[];
  selectedInterviews: number[];
  onSelectInterview: (interviewId: number) => void;
  onSelectAll: (checked: boolean) => void;
  onViewDetail: (interview: ApiInterview) => void;
  onStatusChange: (interviewId: number, status: InterviewStatus) => void;
  onEdit: (interview: ApiInterview) => void;
  onReschedule?: (interview: ApiInterview) => void;
  onSendReminder?: (interview: ApiInterview) => void;
  isLoading?: boolean;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function getInterviewTypeIcon(type: InterviewType) {
  switch (type) {
    case InterviewType.VIDEO:
      return <Video className="h-4 w-4" />;
    case InterviewType.PHONE:
      return <Phone className="h-4 w-4" />;
    case InterviewType.IN_PERSON:
      return <MapPin className="h-4 w-4" />;
    default:
      return <Calendar className="h-4 w-4" />;
  }
}

function getInterviewTypeColor(type: InterviewType) {
  switch (type) {
    case InterviewType.VIDEO:
      return "bg-blue-100 text-blue-800";
    case InterviewType.PHONE:
      return "bg-green-100 text-green-800";
    case InterviewType.IN_PERSON:
      return "bg-purple-100 text-purple-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

export function InterviewsTable({
  interviews,
  selectedInterviews,
  onSelectInterview,
  onSelectAll,
  onViewDetail,
  onStatusChange,
  onEdit,
  onReschedule,
  onSendReminder,
  isLoading = false,
}: InterviewsTableProps) {
  const { t } = useTranslation();

  const allSelected =
    interviews.length > 0 &&
    interviews.every((interview) =>
      selectedInterviews.includes(interview.interview_id)
    );
  const someSelected = selectedInterviews.length > 0 && !allSelected;

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={allSelected}
                indeterminate={someSelected}
                onCheckedChange={onSelectAll}
                aria-label={t("common.selectAll")}
              />
            </TableHead>
            <TableHead>{t("recruiterInterviews.table.candidate")}</TableHead>
            <TableHead>{t("recruiterInterviews.table.job")}</TableHead>
            <TableHead>{t("recruiterInterviews.table.type")}</TableHead>
            <TableHead>{t("recruiterInterviews.table.scheduledAt")}</TableHead>
            <TableHead>{t("recruiterInterviews.table.status")}</TableHead>
            <TableHead className="text-right">{t("common.actions")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            // Loading skeleton rows
            Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse" />
                    <div className="space-y-2">
                      <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                      <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
                </TableCell>
                <TableCell>
                  <div className="h-6 w-20 bg-gray-200 rounded animate-pulse" />
                </TableCell>
                <TableCell>
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                </TableCell>
                <TableCell>
                  <div className="h-6 w-20 bg-gray-200 rounded animate-pulse" />
                </TableCell>
                <TableCell>
                  <div className="h-8 w-8 bg-gray-200 rounded animate-pulse ml-auto" />
                </TableCell>
              </TableRow>
            ))
          ) : interviews.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8">
                <div className="text-gray-500">
                  {t("recruiterInterviews.empty.noInterviews")}
                </div>
              </TableCell>
            </TableRow>
          ) : (
            interviews.map((interview) => {
              const candidate = interview.candidate;
              const job = interview.job_post;
              const isSelected = selectedInterviews.includes(
                interview.interview_id
              );

              // Skip interviews without required data
              if (!candidate || !job) {
                return null;
              }

              return (
                <TableRow
                  key={interview.interview_id}
                  className={isSelected ? "bg-blue-50" : ""}
                >
                  <TableCell>
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() =>
                        onSelectInterview(interview.interview_id)
                      }
                      aria-label={t("common.select")}
                    />
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={candidate.avatar_url || undefined} />
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                          {getInitials(candidate.full_name || "Unknown")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-gray-900">
                          {candidate.full_name || "Unknown"}
                        </div>
                        <div className="text-sm text-gray-500">
                          {candidate.email || "No email"}
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div>
                      <div className="font-medium text-gray-900">
                        {job?.job_title}
                      </div>
                      <div className="text-sm text-gray-500">
                        {job?.company?.company_name}
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={`${getInterviewTypeColor(
                        interview.interview_type
                      )} border-0`}
                    >
                      <div className="flex items-center gap-1">
                        {getInterviewTypeIcon(interview.interview_type)}
                        {t(
                          `recruiterInterviews.type.${interview.interview_type}`
                        )}
                      </div>
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm font-medium">
                        {format(
                          new Date(interview.scheduled_at),
                          "dd/MM/yyyy",
                          { locale: vi }
                        )}
                      </div>
                      <div className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {format(new Date(interview.scheduled_at), "HH:mm", {
                          locale: vi,
                        })}
                        <span className="ml-1">
                          ({interview.duration_minutes}p)
                        </span>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <InterviewStatusBadge status={interview.status} />
                  </TableCell>

                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => onViewDetail(interview)}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          {t("recruiterInterviews.actions.viewDetail")}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onEdit(interview)}>
                          <Edit className="mr-2 h-4 w-4" />
                          {t("recruiterInterviews.actions.edit")}
                        </DropdownMenuItem>
                        {onReschedule && (
                          <DropdownMenuItem
                            onClick={() => onReschedule(interview)}
                          >
                            <Calendar className="mr-2 h-4 w-4" />
                            {t("recruiterInterviews.actions.reschedule")}
                          </DropdownMenuItem>
                        )}
                        {onSendReminder && (
                          <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => onSendReminder(interview)}
                            >
                              <Mail className="mr-2 h-4 w-4" />
                              {t("recruiterInterviews.actions.sendReminder")}
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}
