// ✅ NEW: FeaturedCompanies component using backend format directly
import React from "react";
import { useTranslation } from "react-i18next";
import {
  MapPin,
  Users,
  Star,
  ArrowRight,
  Building2,
  CheckCircle,
} from "lucide-react";
import { Button, Card, CardContent, Badge, SectionHeader } from "@/components";
import { useNavigate } from "react-router-dom";
import { ApiCompany } from "../types";

interface FeaturedCompaniesProps {
  companies: ApiCompany[];
  isLoading?: boolean;
}

const CompanyCard: React.FC<{
  company: ApiCompany;
  onViewCompany: (companyId: number) => void;
}> = ({ company, onViewCompany }) => {
  const { t } = useTranslation();
  const formatCompanySize = (size?: string | null) => {
    if (!size) return t("common:companies.unknown");
    // Backend returns simple strings like "100-500", "large", etc.
    return size;
  };

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md hover:-translate-y-1 bg-white overflow-hidden">
      {/* Header with gradient background */}
      <div className="h-20 bg-gradient-to-r from-blue-500 to-indigo-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>

      <CardContent className="p-6 -mt-6 relative z-10">
        {/* Company Logo and Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            {/* Company Logo */}
            <div className="relative">
              {company.company_image ? (
                <img
                  src={company.company_image}
                  alt={company.company_name}
                  className="w-16 h-16 rounded-xl object-cover border-4 border-white shadow-md bg-white"
                />
              ) : (
                <div className="w-16 h-16 rounded-xl border-4 border-white shadow-md bg-gray-100 flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-gray-400" />
                </div>
              )}

              {/* Verified Badge */}
              {company.is_verified && (
                <div className="absolute -top-1 -right-1 bg-blue-600 text-white rounded-full p-1">
                  <CheckCircle className="w-3 h-3" />
                </div>
              )}
            </div>

            {/* Company Info */}
            <div className="flex-1">
              <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                {company.company_name}
              </h3>
              <p className="text-gray-600 text-sm mb-2">
                {company.industry || t("common:companies.unknown")}
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 mr-1" />
                  <span>4.5</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{formatCompanySize(company.company_size)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Company Description */}
        <p className="text-gray-700 text-sm mb-4 line-clamp-2">
          {company.description || t("common:companies.defaultDescription")}
        </p>

        {/* Company Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600 text-sm">
            <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>
              {company.location || t("common:companies.multipleLocations")}
            </span>
          </div>

          <div className="flex items-center text-gray-600 text-sm">
            <Building2 className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>
              {company.job_count || 0} {t("companies.openPositions")}
            </span>
          </div>
        </div>

        {/* Company Tags */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-2 flex-wrap">
            {company.company_size && (
              <Badge variant="secondary" className="text-xs">
                {company.company_size}
              </Badge>
            )}
            {company.is_verified && (
              <Badge className="text-xs bg-green-100 text-green-800 border-green-200">
                {t("common:companies.verified")}
              </Badge>
            )}
          </div>
        </div>

        {/* Action Button */}
        <Button
          onClick={() => onViewCompany(company.company_id)}
          className="w-full group-hover:bg-blue-600 group-hover:text-white transition-colors"
          variant="outline"
        >
          {t("companies.viewJobs")}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};

const CompanyCardSkeleton: React.FC = () => (
  <Card className="border-0 shadow-md bg-white overflow-hidden">
    <div className="h-20 bg-gray-200 animate-pulse"></div>
    <CardContent className="p-6 -mt-6 relative z-10">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gray-200 rounded-xl animate-pulse"></div>
          <div className="flex-1">
            <div className="w-32 h-5 bg-gray-200 rounded animate-pulse mb-2"></div>
            <div className="w-24 h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
            <div className="flex gap-4">
              <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-10 bg-gray-200 rounded animate-pulse mb-4"></div>
      <div className="space-y-2 mb-4">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="flex items-center">
            <div className="w-4 h-4 bg-gray-200 rounded animate-pulse mr-2"></div>
            <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
          </div>
        ))}
      </div>
      <div className="flex gap-2 mb-4">
        {Array.from({ length: 2 }).map((_, i) => (
          <div
            key={i}
            className="w-16 h-6 bg-gray-200 rounded animate-pulse"
          ></div>
        ))}
      </div>
      <div className="w-full h-10 bg-gray-200 rounded animate-pulse"></div>
    </CardContent>
  </Card>
);

export const FeaturedCompanies: React.FC<FeaturedCompaniesProps> = ({
  companies,
  isLoading = false,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleViewCompany = (companyId: number) => {
    navigate(`/companies/${companyId}`);
  };

  const handleViewAllCompanies = () => {
    navigate("/companies");
  };

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <SectionHeader
          title={t("companies.topCompanies")}
          subtitle={t("companies.exploreCompanies")}
        >
          <div className="mt-6">
            <Button
              variant="outline"
              onClick={handleViewAllCompanies}
              className="group"
            >
              {t("companies.viewAllCompanies")}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </SectionHeader>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <CompanyCardSkeleton key={index} />
              ))
            : companies.map((company) => (
                <CompanyCard
                  key={company.company_id}
                  company={company}
                  onViewCompany={handleViewCompany}
                />
              ))}
        </div>

        {/* Empty State */}
        {!isLoading && companies.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-600">
              No companies available at the moment
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedCompanies;
