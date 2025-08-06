import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  MapPin,
  Users,
  Calendar,
  Heart,
  Share2,
  ChevronLeft,
  Building2,
  Globe,
  Briefcase,
} from "lucide-react";
import { Button, Card, Badge, CompanyLogo } from "@/components";
import { type ApiCompany } from "../types";
import { useAuthStore } from "@/stores/auth-store";
import { paths } from "@/config/paths";

interface CompanyHeaderProps {
  company: ApiCompany;
  onFollowCompany: () => void;
  isFollowing: boolean;
  isFollowed: boolean;
}

export function CompanyHeader({
  company,
  onFollowCompany,
  isFollowing,
  isFollowed,
}: CompanyHeaderProps) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  // Auth check function
  const handleFollowWithAuth = () => {
    if (!isAuthenticated) {
      navigate(paths.auth.login.getHref(window.location.pathname));
      return;
    }
    onFollowCompany();
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      // Use toast notification here
    } catch (error) {
      console.error("Failed to copy to clipboard:", error);
    }
  };

  const { t } = useTranslation();

  const formatEmployeeCount = (count?: number) => {
    if (!count) return t("common:companies.na");
    if (count >= 1000) {
      return t("common:companies.employeeCountK", {
        count: (count / 1000).toFixed(1),
      } as any);
    }
    return t("common:companies.employeeCount", {
      count: count.toLocaleString(),
    } as any);
  };

  const formatFoundedYear = (year?: number) => {
    if (!year) return t("common:companies.na");
    return t("common:companies.foundedIn", { year });
  };

  return (
    <Card className="border-0 shadow-lg bg-white">
      <div className="px-3 py-2 md:px-4 md:py-3">
        {/* Top Navigation */}
        <div className="flex items-center justify-between mb-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="text-[#202124] hover:bg-gray-100 h-9"
            aria-label="Go back to companies list"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            {t("common:companies.backToCompanies")}
          </Button>
        </div>

        {/* Main Header Content */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          {/* Left: Company Info */}
          <div className="flex flex-col sm:flex-row items-start gap-3 flex-1">
            {/* Company Logo */}
            <CompanyLogo
              src={company.company_image || undefined}
              alt={`${company.company_name} logo`}
              companyName={company.company_name}
              size="xl"
              className="h-16 w-16 sm:h-20 sm:w-20"
            />

            <div className="flex-1 min-w-0">
              {/* Company Name and Verification */}
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl md:text-3xl font-bold text-[#202124]">
                  {company.company_name}
                </h1>
                {company.is_verified && (
                  <Badge className="bg-[#1967D2]/15 text-[#1967D2] border-[#1967D2]/20">
                    Verified
                  </Badge>
                )}
              </div>

              {/* Company Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                {/* Industry */}
                {company.industry && (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#1967D2] rounded-full flex items-center justify-center">
                      <Building2 className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#202124]">
                        Industry
                      </p>
                      <p className="text-sm text-[#696969]">
                        {company.industry}
                      </p>
                    </div>
                  </div>
                )}

                {/* Location */}
                {company.location && (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#1967D2] rounded-full flex items-center justify-center">
                      <MapPin className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#202124]">
                        Location
                      </p>
                      <p className="text-sm text-[#696969]">
                        {company.location}
                      </p>
                    </div>
                  </div>
                )}

                {/* Employee Count */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#1967D2] rounded-full flex items-center justify-center">
                    <Users className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#202124]">
                      Company Size
                    </p>
                    <p className="text-sm text-[#696969]">
                      {formatEmployeeCount(company.employee_count || undefined)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Additional Info Row */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-[#696969]">
                {/* Founded Year */}
                {company.founded_year && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{formatFoundedYear(company.founded_year)}</span>
                  </div>
                )}

                {/* Job Count */}
                {company.job_count !== undefined && company.job_count > 0 && (
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    <span>
                      {company.job_count}{" "}
                      {company.job_count === 1 ? "job" : "jobs"} available
                    </span>
                  </div>
                )}

                {/* Website */}
                {company.website && (
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#1967D2] hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Visit Website
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right: Action Buttons */}
          <div className="flex flex-row gap-3 items-start lg:items-center lg:flex-shrink-0">
            <Button
              variant="outline"
              size="lg"
              onClick={handleShare}
              className="min-w-[120px] border-[#1967D2] text-[#1967D2] hover:bg-[#1967D2] hover:text-white"
              aria-label="Share this company"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={handleFollowWithAuth}
              disabled={isFollowing}
              className={`min-w-[120px] border-[#1967D2] text-[#1967D2] hover:bg-[#1967D2] hover:text-white ${
                isFollowed ? "bg-[#1967D2] text-white" : ""
              }`}
              aria-label={
                isFollowed ? "Unfollow this company" : "Follow this company"
              }
            >
              <Heart
                className={`h-4 w-4 mr-2 ${isFollowed ? "fill-current" : ""}`}
              />
              {isFollowing
                ? "Following..."
                : isFollowed
                ? "Following"
                : "Follow"}
            </Button>

            {/* View Jobs Button */}
            {company.job_count && company.job_count > 0 && (
              <Button
                size="lg"
                onClick={() => navigate(`/jobs?company=${company.company_id}`)}
                className="min-w-[120px] bg-[#1967D2] hover:bg-[#1557B8] text-white font-medium"
                aria-label="View jobs at this company"
              >
                <Briefcase className="h-4 w-4 mr-2" />
                View Jobs
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
