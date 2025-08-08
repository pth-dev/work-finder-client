import { useState } from "react";
import { useParams } from "react-router-dom";
import { Globe, ExternalLink, Briefcase } from "lucide-react";
import {
  FullScreenErrorState,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
  JobCard,
  JobCardSkeleton,
} from "@/components";
import { CompanyHeader } from "./CompanyHeader";
import {
  useCompany,
  useCompanyJobs,
  useFollowCompany,
  useUnfollowCompany,
} from "../hooks";
import { CompanyJobsFilters } from "../types";
import { formatTimeAgo, formatSalary } from "@/utils/common";
import { formatJobType } from "@/i18n/business-helpers";
import { useTranslation } from "react-i18next";
import { CompanyLogo } from "@/components";
import { extractIdFromSlug } from "@/utils/slug-utils";

export function CompanyDetailPage() {
  const { identifier } = useParams();
  const { t } = useTranslation();
  const [jobsFilters] = useState<CompanyJobsFilters>({
    page: 1,
    limit: 12,
  });

  // Extract company ID from identifier (could be ID or slug)
  const companyId = identifier ? extractIdFromSlug(identifier) : null;

  // Fetch company data
  const {
    data: companyResponse,
    isLoading: isLoadingCompany,
    error: companyError,
  } = useCompany(companyId!, { enabled: !!companyId });

  const company = companyResponse?.data;

  // Fetch company jobs
  const {
    data: jobsResponse,
    isLoading: isLoadingJobs,
    error: jobsError,
  } = useCompanyJobs(companyId!, jobsFilters, { enabled: !!companyId });

  const jobs = jobsResponse?.data?.jobs || [];

  // Transform job data for JobCard component
  const transformJobForCard = (job: any) => ({
    title: job.job_title,
    company: company?.company_name || "Unknown Company",
    location: job.location || "Location not specified",
    timeAgo: formatTimeAgo(job.posted_date, t),
    salary: formatSalary({
      salary: job.salary,
      salary_min: job.salary_min,
      salary_max: job.salary_max,
    }),
    tags: [
      ...(job.job_type
        ? [
            {
              text: formatJobType(t, job.job_type),
              variant: "outline" as const,
              color: "blue" as const,
            },
          ]
        : []),
      ...(job.category
        ? [{ text: job.category, variant: "secondary" as const }]
        : []),
    ],
    logo: (
      <CompanyLogo
        src={company?.company_image || undefined}
        companyName={company?.company_name}
        size="md"
        variant="rounded"
      />
    ),
  });
  const totalJobs = jobsResponse?.data?.total || 0;

  // Follow/unfollow mutations
  const followMutation = useFollowCompany();
  const unfollowMutation = useUnfollowCompany();

  // Follow/unfollow handler
  const handleFollowCompany = () => {
    if (!company) return;

    if (company.is_followed) {
      unfollowMutation.mutate(company.company_id);
    } else {
      followMutation.mutate(company.company_id);
    }
  };

  // Loading state
  const isLoading = isLoadingCompany || isLoadingJobs;

  // Error handling
  if (companyError || jobsError) {
    return (
      <FullScreenErrorState
        type="server"
        title={t("common:companies.errorLoadingCompany")}
        message={t("common:companies.couldNotLoadCompany")}
        onRetry={() => window.location.reload()}
      />
    );
  }

  // Company not found
  if (!isLoading && !company) {
    return (
      <FullScreenErrorState
        type="not-found"
        title={t("common:companies.companyNotFound")}
        message={t("common:companies.companyNotFoundMessage")}
        actions={[
          {
            label: t("common:navigation.goBack"),
            onClick: () => window.history.back(),
            variant: "default",
          },
        ]}
        showRetry={false}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Company Header */}
        {company && (
          <div className="mb-8">
            <CompanyHeader
              company={company}
              onFollowCompany={handleFollowCompany}
              isFollowing={
                followMutation.isPending || unfollowMutation.isPending
              }
              isFollowed={company.is_followed || false}
            />
          </div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Company Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Company Description */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {t("common:companies.about", {
                    companyName: company?.company_name,
                  })}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  {company?.description ||
                    t("common:companies.noDescriptionAvailable")}
                </p>
              </CardContent>
            </Card>

            {/* Company Jobs */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{t("common:companies.openPositions")}</span>
                  <Badge variant="secondary">
                    {t("common:companies.jobsCount", { count: totalJobs })}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoadingJobs ? (
                  <div className="grid grid-cols-1 gap-4">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <JobCardSkeleton key={index} />
                    ))}
                  </div>
                ) : jobs.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4">
                    {jobs.map((job) => {
                      const cardProps = transformJobForCard(job);
                      return (
                        <JobCard
                          key={job.job_id}
                          {...cardProps}
                          onBookmark={() => {}}
                          isBookmarked={false}
                          onClick={() =>
                            window.open(`/jobs/${job.job_id}`, "_blank")
                          }
                        />
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {t("common:companies.noOpenPositions")}
                    </h3>
                    <p className="text-gray-600">
                      {t("common:companies.noOpenPositionsMessage")}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Company Details */}
          <div className="space-y-6">
            {/* Company Details */}
            <Card>
              <CardHeader>
                <CardTitle>{t("common:companies.companyDetails")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {company?.industry && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      {t("common:companies.industry")}
                    </span>
                    <span className="font-medium">{company.industry}</span>
                  </div>
                )}

                {company?.employee_count && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      {t("common:companies.companySize")}
                    </span>
                    <span className="font-medium">
                      {t("common:companies.employeeCount", {
                        count: company.employee_count,
                      })}
                    </span>
                  </div>
                )}

                {company?.founded_year && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      {t("common:companies.founded")}
                    </span>
                    <span className="font-medium">{company.founded_year}</span>
                  </div>
                )}

                {company?.location && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      {t("common:companies.location")}
                    </span>
                    <span className="font-medium">{company.location}</span>
                  </div>
                )}

                {company?.follower_count !== undefined && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      {t("common:companies.followers")}
                    </span>
                    <span className="font-medium">
                      {company.follower_count.toLocaleString()}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Website Link */}
            {company?.website && (
              <Card>
                <CardHeader>
                  <CardTitle>{t("common:companies.connect")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() =>
                      company.website && window.open(company.website, "_blank")
                    }
                  >
                    <Globe className="h-4 w-4 mr-2" />
                    {t("common:companies.visitWebsite")}
                    <ExternalLink className="h-4 w-4 ml-auto" />
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
