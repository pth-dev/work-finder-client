import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Building2, MapPin, Calendar, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { paths } from "@/config/paths";
import { CompanyLogo } from "@/components";
import { formatSalary } from "@/utils/common";
import { UserApplication } from "../types";

interface RecentApplicationsProps {
  applications: UserApplication[];
  isLoading: boolean;
}

// Helper function to get status color
const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "under_review":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "interview_scheduled":
      return "bg-green-100 text-green-800 border-green-200";
    case "rejected":
      return "bg-red-100 text-red-800 border-red-200";
    case "accepted":
      return "bg-emerald-100 text-emerald-800 border-emerald-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

// Helper function to format date - just show the date
const formatAppliedDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("vi-VN");
};

// Application Card Component
const ApplicationCard = ({
  application,
  t,
}: {
  application: UserApplication;
  t: any;
}) => {
  const jobPost = application.job_post;
  const company = jobPost?.company;

  return (
    <Link to={`/jobs/${jobPost?.job_id}`} className="block">
      <div className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 border border-gray-200 rounded-lg hover:shadow-sm hover:border-blue-300 transition-all cursor-pointer">
        {/* Company Logo */}
        <div className="flex-shrink-0">
          <CompanyLogo
            src={company?.company_image}
            companyName={company?.company_name || ""}
            size="md"
            variant="rounded"
          />
        </div>

        {/* Job Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 truncate">
                {jobPost?.job_title ||
                  t("dashboard.recentlyApplied.unknownJob")}
              </h3>
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-1 text-xs sm:text-sm text-gray-600 space-y-1 sm:space-y-0">
                <div className="flex items-center space-x-1">
                  <Building2 className="h-4 w-4" />
                  <span>
                    {company?.company_name ||
                      t("dashboard.recentlyApplied.unknownCompany")}
                  </span>
                </div>
                {jobPost?.location && (
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{jobPost.location}</span>
                  </div>
                )}
              </div>
              {/* Salary Info */}
              {(jobPost?.salary_min || jobPost?.salary_max) && (
                <div className="mt-1 text-sm text-green-600 font-medium">
                  {formatSalary({
                    salary_min: jobPost.salary_min,
                    salary_max: jobPost.salary_max,
                  })}
                </div>
              )}
              <div className="flex items-center space-x-1 mt-2 text-xs text-gray-500">
                <Calendar className="h-3 w-3" />
                <span>{formatAppliedDate(application.applied_at)}</span>
              </div>
            </div>

            {/* Status Badge */}
            <Badge
              variant="outline"
              className={`ml-4 ${getStatusColor(application.status)}`}
            >
              {t(`applicationStatus.${application.status}`, application.status)}
            </Badge>
          </div>
        </div>
      </div>
    </Link>
  );
};

export function RecentApplications({
  applications,
  isLoading,
}: RecentApplicationsProps) {
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center space-x-2">
          <Briefcase className="h-5 w-5" />
          <span>{t("dashboard.recentlyApplied.title")}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div>
          {isLoading ? (
            <div className="flex items-center justify-center py-6">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            </div>
          ) : applications.length > 0 ? (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                {applications.map((application) => (
                  <ApplicationCard
                    key={application.application_id}
                    application={application}
                    t={t}
                  />
                ))}
              </div>

              {/* View All Link */}
              <div className="pt-3 border-t mt-4">
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link to={paths.app.applications.getHref()}>
                    {t("dashboard.recentlyApplied.viewAll")}
                  </Link>
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center py-6 text-gray-500">
              <Briefcase className="h-10 w-10 mx-auto mb-3 text-gray-300" />
              <p className="text-sm">{t("dashboard.recentlyApplied.empty")}</p>
              <p className="text-xs mt-1 text-gray-400">
                {t("dashboard.recentlyApplied.emptySubtitle")}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
