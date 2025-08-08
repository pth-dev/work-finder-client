import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Building2, MapPin, ExternalLink, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CompanyLogo } from "@/components";
import { useApplication } from "../hooks";
import { Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ApplicationDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  applicationId?: number;
}

// Helper function to get status color
const getStatusColor = (status: string | number | undefined | null) => {
  if (!status) {
    return "bg-gray-100 text-gray-800 border-gray-200";
  }

  // Convert status to string and normalize
  const statusString = String(status).toLowerCase();

  switch (statusString) {
    case "pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "reviewing":
    case "under_review":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "interview_scheduled":
    case "interviewed":
      return "bg-green-100 text-green-800 border-green-200";
    case "rejected":
      return "bg-red-100 text-red-800 border-red-200";
    case "accepted":
      return "bg-emerald-100 text-emerald-800 border-emerald-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

// Helper function to format date
const formatDate = (dateString: string | undefined | null) => {
  if (!dateString) {
    return "N/A";
  }

  const date = new Date(dateString);

  // Check if date is valid
  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  return date.toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export function ApplicationDetailModal({
  isOpen,
  onClose,
  applicationId,
}: ApplicationDetailModalProps) {
  const { t } = useTranslation();

  // Fetch application detail by ID
  const {
    data: application,
    isLoading,
    error,
  } = useApplication({
    applicationId,
    enabled: isOpen && Boolean(applicationId),
  });

  if (!applicationId) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-w-md max-h-[90vh] overflow-y-auto bg-white"
        overlayVariant="default"
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900">
            {t("applications.detail.title", "Application Details")}
          </DialogTitle>
        </DialogHeader>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center space-x-3">
              <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
              <span className="text-gray-600">
                {t("common.loading", "Loading...")}
              </span>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <Alert className="border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-700">
              {t(
                "applications.detail.error",
                "Failed to load application details. Please try again."
              )}
            </AlertDescription>
          </Alert>
        )}

        {/* Content */}
        {application && (
          <div className="space-y-4">
            {/* Job & Company Info Header */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-100">
              <div className="flex items-start space-x-4">
                <CompanyLogo
                  src={application.job_post?.company?.company_image}
                  companyName={
                    application.job_post?.company?.company_name ||
                    "Unknown Company"
                  }
                  size="lg"
                  variant="rounded"
                />

                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-2">
                        {application.job_post?.job_title ||
                          `Job ID: ${application.job_id}` ||
                          t("jobs.unknownJob", "Unknown Job")}
                      </h2>

                      <div className="flex items-center space-x-6 text-sm text-gray-700 mb-3">
                        <div className="flex items-center space-x-2">
                          <Building2 className="h-4 w-4 text-blue-600" />
                          <span className="font-medium">
                            {application.job_post?.company?.company_name ||
                              t("jobs.unknownCompany", "Unknown Company")}
                          </span>
                        </div>

                        {application.job_post?.location && (
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4 text-green-600" />
                            <span>{application.job_post.location}</span>
                          </div>
                        )}
                      </div>

                      {/* Status Badge - Handle HTTP status codes */}
                      <div className="flex items-center space-x-3">
                        <Badge
                          variant="outline"
                          className={`${getStatusColor(
                            application.status
                          )} font-medium px-3 py-1`}
                        >
                          {(() => {
                            // If status is HTTP code (200, 404, etc.), show as "Success" or raw value
                            if (
                              typeof application.status === "number" ||
                              !isNaN(Number(application.status))
                            ) {
                              const statusNum = Number(application.status);
                              if (statusNum === 200) return "API Success";
                              return `HTTP ${application.status}`;
                            }

                            // Regular status handling
                            return application.status
                              ? t(
                                  `common.applicationStatus.${String(
                                    application.status
                                  ).toLowerCase()}`,
                                  String(application.status)
                                )
                              : t(
                                  "common.applicationStatus.unknown",
                                  "Unknown Status"
                                );
                          })()}
                        </Badge>

                        {/* Show raw status for debugging */}
                        <span className="text-xs text-gray-500">
                          (Raw: {JSON.stringify(application.status)})
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Application Info */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Applied:</span>
                <span className="text-sm font-medium">
                  {formatDate(application.applied_at)}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Status:</span>
                <Badge
                  variant="outline"
                  className={getStatusColor(application.status)}
                >
                  {application.status || "Unknown"}
                </Badge>
              </div>

              {application.resume && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Resume:</span>
                  <Button
                    variant="link"
                    size="sm"
                    className="p-0 h-auto text-blue-600"
                  >
                    <Download className="h-3 w-3 mr-1" />
                    {application.resume.file_name}
                  </Button>
                </div>
              )}
            </div>

            <Separator />

            {/* Actions */}
            <div className="space-y-2">
              <Button
                asChild
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Link to={`/jobs/${application.job_id}`}>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  {t("applications.detail.viewJob", "View Job Posting")}
                </Link>
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
