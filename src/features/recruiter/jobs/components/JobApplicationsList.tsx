import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { Eye, User, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "react-hot-toast";

import {
  getJobApplications,
  updateApplicationStatus,
} from "../../applications/api/applications";
import { ApplicationStatus } from "../../applications/types";
import { paths } from "@/config/paths";

interface JobApplicationsListProps {
  jobId: number;
}

export function JobApplicationsList({ jobId }: JobApplicationsListProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    status: undefined as ApplicationStatus | undefined,
  });

  // Fetch applications for this job
  const {
    data: applicationsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["job-applications", jobId, filters],
    queryFn: () => getJobApplications(jobId, filters),
    enabled: !!jobId,
  });

  // Update application status mutation
  const updateStatusMutation = useMutation({
    mutationFn: ({
      applicationId,
      status,
    }: {
      applicationId: number;
      status: ApplicationStatus;
    }) => updateApplicationStatus(applicationId, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["job-applications", jobId] });
      toast.success(t("recruiterApplications.statusUpdateSuccess"));
    },
    onError: () => {
      toast.error(t("recruiterApplications.statusUpdateError"));
    },
  });

  const handleStatusChange = useCallback(
    (applicationId: number, status: ApplicationStatus) => {
      console.log("Status change:", { applicationId, status }); // Debug log
      updateStatusMutation.mutate({ applicationId, status });
    },
    [updateStatusMutation]
  );

  const handleViewApplication = useCallback(
    (applicationId: number) => {
      navigate(
        paths.recruiter.jobApplicationDetail.getHref(jobId, applicationId)
      );
    },
    [navigate, jobId]
  );

  const getStatusColor = (status: ApplicationStatus) => {
    switch (status) {
      case ApplicationStatus.PENDING:
        return "bg-yellow-100 text-yellow-800";
      case ApplicationStatus.REVIEWING:
        return "bg-blue-100 text-blue-800";

      case ApplicationStatus.INTERVIEWED:
        return "bg-purple-100 text-purple-800";
      case ApplicationStatus.ACCEPTED:
        return "bg-green-100 text-green-800";
      case ApplicationStatus.REJECTED:
        return "bg-red-100 text-red-800";
      case ApplicationStatus.WITHDRAWN:
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading) {
    return (
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>{t("recruiter.jobs.detail.applications")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>{t("recruiter.jobs.detail.applications")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-600">{t("common.error.loadFailed")}</p>
        </CardContent>
      </Card>
    );
  }

  const applications = applicationsData?.applications || [];
  const totalCount = applicationsData?.total || 0;

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>
              {t("recruiter.jobs.detail.applications")} ({totalCount})
            </span>
          </CardTitle>

          {/* Filters */}
          <div className="flex items-center space-x-4">
            <Select
              value={filters.status || "all"}
              onValueChange={(value) =>
                setFilters((prev) => ({
                  ...prev,
                  status:
                    value === "all" ? undefined : (value as ApplicationStatus),
                }))
              }
            >
              <SelectTrigger className="w-48">
                <SelectValue
                  placeholder={t("recruiterApplications.filters.status")}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("common.all")}</SelectItem>
                {Object.values(ApplicationStatus).map((status) => (
                  <SelectItem key={status} value={status}>
                    {t(`recruiterApplications.status.${status}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {applications.length === 0 ? (
          <div className="text-center py-12">
            <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {t("recruiter.jobs.detail.noApplications")}
            </h3>
            <p className="text-gray-600">
              {t("recruiter.jobs.detail.noApplicationsSubtitle")}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    {t("recruiterApplications.table.candidate")}
                  </TableHead>
                  <TableHead>
                    {t("recruiterApplications.table.email")}
                  </TableHead>
                  <TableHead>
                    {t("recruiterApplications.table.status")}
                  </TableHead>
                  <TableHead>
                    {t("recruiterApplications.table.appliedAt")}
                  </TableHead>
                  <TableHead className="text-right">
                    {t("common.actions")}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.map((application) => (
                  <TableRow key={application.application_id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-blue-600">
                            {application.resume?.user?.full_name?.charAt(0) ||
                              "?"}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {application.resume?.user?.full_name ||
                              t("common.notSpecified")}
                          </p>
                          <p className="text-sm text-gray-500">
                            {application.resume?.file_name}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span className="text-blue-600">
                          {application.resume?.user?.email ||
                            t("common.notSpecified")}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell>
                      <Badge className={getStatusColor(application.status)}>
                        {t(
                          `recruiterApplications.status.${application.status}`
                        )}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <span className="text-gray-600">
                        {application.applied_at
                          ? formatDistanceToNow(
                              new Date(application.applied_at),
                              {
                                addSuffix: true,
                                locale: vi,
                              }
                            )
                          : t("common.notSpecified")}
                      </span>
                    </TableCell>

                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          handleViewApplication(application.application_id)
                        }
                        className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        {t("recruiterApplications.actions.viewDetail")}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
