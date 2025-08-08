import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { Eye, Calendar } from "lucide-react";
import { paths } from "@/config/paths";
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

import { ApplicationStatusBadge } from "./ApplicationStatusBadge";
import { ApiApplication, ApplicationStatus } from "../types";

interface ApplicationsTableProps {
  applications: ApiApplication[];

  onCreateInterview?: (application: ApiApplication) => void;
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

export function ApplicationsTable({
  applications,
  onCreateInterview,
  isLoading = false,
}: ApplicationsTableProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="rounded-md border overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[200px]">
                {t("recruiterApplications.table.candidate")}
              </TableHead>
              <TableHead className="min-w-[250px]">
                {t("recruiterApplications.table.job")}
              </TableHead>
              <TableHead className="min-w-[120px]">
                {t("recruiterApplications.table.status")}
              </TableHead>
              <TableHead className="min-w-[120px]">
                {t("recruiterApplications.table.appliedAt")}
              </TableHead>
              <TableHead className="text-center min-w-[100px]">
                {t("common.actions")}
              </TableHead>
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
                    <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                  </TableCell>
                  <TableCell>
                    <div className="h-8 w-8 bg-gray-200 rounded animate-pulse ml-auto" />
                  </TableCell>
                </TableRow>
              ))
            ) : applications.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  <div className="text-gray-500">
                    {t("recruiterApplications.empty.noApplications")}
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              applications.map((application) => {
                const candidate = application.resume?.user;
                const job = application.job_post;

                return (
                  <TableRow
                    key={application.application_id}
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() =>
                      navigate(
                        paths.recruiter.jobApplicationDetail.getHref(
                          application.job_post?.job_id || 0,
                          application.application_id
                        )
                      )
                    }
                  >
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10 flex-shrink-0">
                          <AvatarImage src={candidate?.avatar} />
                          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                            {getInitials(candidate?.full_name || "")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <div className="font-medium text-gray-900 truncate">
                            {candidate?.full_name}
                          </div>
                          <div className="text-sm text-gray-500 truncate">
                            {candidate?.email}
                          </div>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="min-w-0">
                        <div className="font-medium text-gray-900 truncate">
                          {job?.job_title}
                        </div>
                        <div className="text-sm text-gray-500 truncate">
                          {job?.company?.company_name}
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <ApplicationStatusBadge status={application.status} />
                    </TableCell>

                    <TableCell>
                      <div className="text-sm text-gray-500">
                        {formatDistanceToNow(new Date(application.applied_at), {
                          addSuffix: true,
                          locale: vi,
                        })}
                      </div>
                    </TableCell>

                    <TableCell className="text-center">
                      <div
                        className="flex items-center gap-2 justify-center"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {application.status === ApplicationStatus.REVIEWING &&
                          onCreateInterview && (
                            <Button
                              variant="default"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                onCreateInterview(application);
                              }}
                              className="w-8 h-8 p-0"
                              title={t(
                                "recruiterInterviews.actions.createInterview"
                              )}
                            >
                              <Calendar className="h-4 w-4" />
                            </Button>
                          )}

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(
                              paths.recruiter.jobApplicationDetail.getHref(
                                application.job_post?.job_id || 0,
                                application.application_id
                              )
                            );
                          }}
                          className="w-8 h-8 p-0"
                          title={t("recruiterApplications.actions.viewDetail")}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
