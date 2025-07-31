import React from "react";
import {
  MapPin,
  Users,
  Star,
  ArrowRight,
  Building2,
  TrendingUp,
} from "lucide-react";
import { Button, Card, CardContent, Badge } from "@/components";
import { type Company } from "@/types";
import { useNavigate } from "react-router-dom";

interface FeaturedCompaniesProps {
  companies: Company[];
  isLoading?: boolean;
}

const CompanyCard: React.FC<{
  company: Company;
  onViewCompany: (companyId: string) => void;
}> = ({ company, onViewCompany }) => {
  const getEmployeeCountDisplay = (size: string, count: number) => {
    const sizeLabels = {
      startup: "1-50",
      small: "51-200",
      medium: "201-500",
      large: "501-1000",
      enterprise: "1000+",
    };
    return sizeLabels[size as keyof typeof sizeLabels] || `${count}+`;
  };

  const getHQLocation = (company: Company) => {
    const hq = company.locations.find((loc) => loc.isHeadquarters);
    return hq ? `${hq.city}, ${hq.state}` : "Multiple Locations";
  };

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md hover:-translate-y-1 bg-white overflow-hidden">
      {/* Cover Image */}
      {company.coverImage && (
        <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-600 relative overflow-hidden">
          <img
            src={company.coverImage}
            alt={company.name}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
      )}

      <CardContent className="p-6 -mt-6 relative z-10">
        {/* Company Logo and Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            {company.logo && (
              <div className="relative">
                <img
                  src={company.logo}
                  alt={company.name}
                  className="w-16 h-16 rounded-xl object-cover border-4 border-white shadow-md bg-white"
                />
                {company.isVerified && (
                  <div className="absolute -top-1 -right-1 bg-blue-600 text-white rounded-full p-1">
                    <div className="w-3 h-3 flex items-center justify-center">
                      <span className="text-xs">✓</span>
                    </div>
                  </div>
                )}
              </div>
            )}
            <div className="flex-1">
              <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                {company.name}
              </h3>
              <p className="text-gray-600 text-sm mb-2">{company.industry}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 mr-1" />
                  <span>{company.stats.averageRating.toFixed(1)}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  <span>
                    {getEmployeeCountDisplay(
                      company.size,
                      company.stats.totalEmployees
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Company Description */}
        <p className="text-gray-700 text-sm mb-4 line-clamp-2">
          {company.description}
        </p>

        {/* Company Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600 text-sm">
            <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>{getHQLocation(company)}</span>
          </div>

          <div className="flex items-center text-gray-600 text-sm">
            <Building2 className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>{company.stats.totalJobs} open positions</span>
          </div>

          {company.stats.hiringGrowth > 0 && (
            <div className="flex items-center text-green-600 text-sm">
              <TrendingUp className="h-4 w-4 mr-2 flex-shrink-0" />
              <span>{company.stats.hiringGrowth}% hiring growth</span>
            </div>
          )}
        </div>

        {/* Specialties */}
        {company.specialties && company.specialties.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {company.specialties.slice(0, 3).map((specialty, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {specialty}
                </Badge>
              ))}
              {company.specialties.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{company.specialties.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Company Tags */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-2 flex-wrap">
            <Badge variant="secondary" className="text-xs capitalize">
              {company.size}
            </Badge>
            <Badge variant="secondary" className="text-xs capitalize">
              {company.type}
            </Badge>
            {company.isSponsored && (
              <Badge className="text-xs bg-purple-100 text-purple-800 border-purple-200">
                Sponsored
              </Badge>
            )}
          </div>
        </div>

        {/* Action Button */}
        <Button
          onClick={() => onViewCompany(company.id)}
          className="w-full group-hover:bg-blue-600 transition-colors"
          variant="outline"
        >
          View Company
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};

const CompanyCardSkeleton: React.FC = () => (
  <Card className="border-0 shadow-md bg-white overflow-hidden">
    <div className="h-32 bg-gray-200 animate-pulse"></div>
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
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center">
            <div className="w-4 h-4 bg-gray-200 rounded animate-pulse mr-2"></div>
            <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mb-4">
        {Array.from({ length: 3 }).map((_, i) => (
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

  const handleViewCompany = (companyId: string) => {
    navigate(`/companies/${companyId}`);
  };

  const handleViewAllCompanies = () => {
    navigate("/companies");
  };

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Top <span className="text-blue-600">Companies</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore amazing companies that are actively hiring and building the
            future
          </p>
        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <CompanyCardSkeleton key={index} />
              ))
            : companies.map((company) => (
                <CompanyCard
                  key={company.id}
                  company={company}
                  onViewCompany={handleViewCompany}
                />
              ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button
            onClick={handleViewAllCompanies}
            size="lg"
            className="px-8 py-3 text-base font-semibold"
          >
            View All Companies
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCompanies;
