import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Clock, FileText, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NewPDFViewer as PDFViewer } from "@/components/ui/pdf-viewer";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "react-hot-toast";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";

import {
  getApplicationById,
  updateApplicationStatus,
} from "../api/applications";
import { ApplicationStatus } from "../types";
import { getStatusSelectOptions } from "../utils";

export default function ApplicationDetailPage() {
  const { id, jobId, applicationId } = useParams<{
    id?: string;
    jobId?: string;
    applicationId?: string;
  }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  // Support both old and new URL patterns
  const actualApplicationId = applicationId || id;
  const backUrl = jobId ? `/recruiter/jobs/${jobId}` : "/recruiter/candidates";

  const {
    data: application,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["application", actualApplicationId],
    queryFn: () => getApplicationById(Number(actualApplicationId)),
    enabled: !!actualApplicationId,
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({
      applicationId,
      status,
    }: {
      applicationId: number;
      status: ApplicationStatus;
    }) => updateApplicationStatus(applicationId, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["application", actualApplicationId],
      });
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      if (jobId) {
        queryClient.invalidateQueries({
          queryKey: ["job-applications", Number(jobId)],
        });
      }
      toast.success(t("recruiterApplications.statusUpdateSuccess"));
    },
    onError: () => {
      toast.error(t("recruiterApplications.statusUpdateError"));
    },
  });

  const handleStatusChange = (status: ApplicationStatus) => {
    if (!application) return;
    updateStatusMutation.mutate({
      applicationId: application.application_id,
      status,
    });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error || !application) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {t("recruiterApplications.detail.notFound")}
          </h1>
          <Button onClick={() => navigate("/recruiter/applications")}>
            {t("common.back")}
          </Button>
        </div>
      </div>
    );
  }

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

  // Get resume file URL from file_path - fix port if needed
  const resumeUrl = application.resume?.file_path
    ? application.resume.file_path.replace("localhost:3000", "localhost:3001")
    : null;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(backUrl)}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>{t("common.back")}</span>
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {application.resume?.user?.full_name ||
                    t("common.notSpecified")}
                </h1>
                <p className="text-gray-600 mt-1">
                  Ứng viên cho {application.job_post?.job_title}
                </p>
              </div>
            </div>

            {/* Status Change */}
            <div className="flex items-center space-x-4">
              <Badge
                className={`${getStatusColor(
                  application.status
                )} text-sm px-3 py-1`}
              >
                {t(`recruiterApplications.status.${application.status}`)}
              </Badge>
              <Select
                value={application.status}
                onValueChange={(value) =>
                  handleStatusChange(value as ApplicationStatus)
                }
                disabled={updateStatusMutation.isPending}
              >
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Thay đổi trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  {getStatusSelectOptions(application.status).map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      disabled={option.disabled}
                      className={
                        option.isCurrent ? "bg-blue-50 font-medium" : ""
                      }
                    >
                      <div className="flex items-center justify-between w-full">
                        <span>
                          {t(`recruiterApplications.status.${option.value}`)}
                        </span>
                        {option.isCurrent && (
                          <span className="text-xs text-blue-600 ml-2">
                            (Hiện tại)
                          </span>
                        )}
                        {option.isWithdrawn && !option.isCurrent && (
                          <span className="text-xs text-gray-400 ml-2">
                            (Chỉ ứng viên)
                          </span>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
        {/* Top Row - Candidate Info & Actions */}
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Profile Section */}
              <div className="lg:col-span-3 flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-bold text-white">
                    {application.resume?.user?.full_name?.charAt(0) || "?"}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-xl font-bold text-gray-900 truncate">
                    {application.resume?.user?.full_name ||
                      t("common.notSpecified")}
                  </h2>
                  <p className="text-sm text-gray-600">Ứng viên</p>
                </div>
              </div>

              {/* Contact Info */}
              <div className="lg:col-span-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Mail className="h-4 w-4 text-gray-500 mt-1 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-gray-500 mb-1">Email</p>
                      <p className="text-sm text-blue-600 font-medium break-all">
                        {application.resume?.user?.email ||
                          t("common.notSpecified")}
                      </p>
                    </div>
                  </div>

                  {application.resume?.user?.phone && (
                    <div className="flex items-start space-x-3">
                      <Phone className="h-4 w-4 text-gray-500 mt-1 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-gray-500 mb-1">Điện thoại</p>
                        <p className="text-sm text-gray-900 font-medium">
                          {application.resume.user.phone}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <FileText className="h-4 w-4 text-gray-500 mt-1 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-gray-500 mb-1">File CV</p>
                      <p className="text-sm text-gray-900 font-medium truncate">
                        {application.resume?.file_name ||
                          t("common.notSpecified")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Clock className="h-4 w-4 text-gray-500 mt-1 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-gray-500 mb-1">Ứng tuyển</p>
                      <p className="text-sm text-gray-900 font-medium">
                        {application.applied_at
                          ? formatDistanceToNow(
                              new Date(application.applied_at),
                              {
                                addSuffix: true,
                                locale: vi,
                              }
                            )
                          : t("common.notSpecified")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="lg:col-span-3 flex flex-col gap-2">
                {resumeUrl && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => window.open(resumeUrl, "_blank")}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Mở CV
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() =>
                    window.open(
                      `mailto:${application.resume?.user?.email}`,
                      "_blank"
                    )
                  }
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </Button>
                {application.resume?.user?.phone && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() =>
                      window.open(
                        `tel:${application.resume.user.phone}`,
                        "_self"
                      )
                    }
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Gọi
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Row - CV Viewer */}
        <div className="w-full">
          {resumeUrl ? (
            <PDFViewer
              fileUrl={resumeUrl}
              fileName={application.resume?.file_name}
              className="shadow-sm"
            />
          ) : (
            <Card className="shadow-sm">
              <CardContent className="flex items-center justify-center h-96">
                <div className="text-center">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">
                    Không có file CV để hiển thị
                  </p>
                  <p className="text-gray-400 text-sm mt-2">
                    Ứng viên chưa tải lên CV hoặc file không khả dụng
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
