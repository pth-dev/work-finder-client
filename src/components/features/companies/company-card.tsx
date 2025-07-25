import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, MapPin, Users, Star, ExternalLink } from "lucide-react";
import {
  BaseCard,
  BaseCardHeader,
  BaseCardContent,
  BaseCardActions,
  BaseCardBadge,
} from "@/components/ui/base-card";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface Company {
  id: string;
  name: string;
  logo?: string;
  description: string;
  website?: string;
  size: string;
  industry: string;
  location: string;
  rating: number;
  jobCount?: number;
  featured?: boolean;
}

interface CompanyCardProps {
  company: Company;
  variant?: "grid" | "list";
  onViewJobs?: (companyId: string) => void;
  onViewProfile?: (companyId: string) => void;
  className?: string;
}

export function CompanyCard({
  company,
  variant = "grid",
  onViewJobs,
  onViewProfile,
  className,
}: CompanyCardProps) {
  const isGrid = variant === "grid";

  return (
    <BaseCard
      className={cn(isGrid ? "h-full" : "flex-row", className)}
      featured={company.featured}
      interactive
      onClick={() => onViewProfile?.(company.id)}
    >
      <div className="pb-2 px-0 pt-0">
        <div className={cn(!isGrid && "flex items-center space-x-6")}>
          {/* Company Logo */}
          <div className={cn("flex-shrink-0", isGrid ? "mb-4" : "")}>
            <div className="relative">
              {company.logo ? (
                <Image
                  src={company.logo}
                  alt={`${company.name} logo`}
                  width={isGrid ? 64 : 48}
                  height={isGrid ? 64 : 48}
                  className="rounded-lg object-contain bg-white border"
                />
              ) : (
                <div
                  className={cn(
                    "bg-gray-100 rounded-lg flex items-center justify-center",
                    isGrid ? "w-16 h-16" : "w-12 h-12"
                  )}
                >
                  <Building2
                    className={cn(
                      isGrid ? "w-8 h-8" : "w-6 h-6",
                      "text-gray-400"
                    )}
                  />
                </div>
              )}
              {company.featured && (
                <Badge
                  variant="default"
                  className="absolute -top-2 -right-2 text-xs px-1.5 py-0.5"
                >
                  Featured
                </Badge>
              )}
            </div>
          </div>

          {/* Company Info */}
          <div className={cn("flex-1", isGrid ? "space-y-3" : "space-y-2")}>
            <div>
              <h3
                className={cn(
                  "font-semibold text-gray-900 group-hover:text-blue-600 transition-colors",
                  isGrid ? "text-lg" : "text-base"
                )}
              >
                {company.name}
              </h3>
              <p
                className={cn(
                  "text-gray-600 line-clamp-2",
                  isGrid ? "text-sm mt-1" : "text-sm"
                )}
              >
                {company.description}
              </p>
            </div>

            {/* Company Details */}
            <div
              className={cn(
                "space-y-2",
                isGrid ? "" : "flex items-center space-x-4 space-y-0"
              )}
            >
              <div className="flex items-center text-sm text-gray-500">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{company.location}</span>
              </div>

              <div className="flex items-center text-sm text-gray-500">
                <Users className="w-4 h-4 mr-1" />
                <span>{company.size} employees</span>
              </div>

              <div className="flex items-center text-sm text-gray-500">
                <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                <span>{company.rating}</span>
              </div>
            </div>

            {/* Industry & Job Count */}
            <div
              className={cn(
                "flex items-center justify-between",
                isGrid ? "flex-col items-start space-y-2" : ""
              )}
            >
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                {company.industry}
              </span>

              {company.jobCount && (
                <span className="text-sm text-blue-600 font-medium">
                  {company.jobCount} open positions
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        className={cn("flex gap-2 pt-3 justify-between", isGrid ? "pt-2" : "")}
      >
        <Button
          size="sm"
          variant="outline"
          onClick={(e) => {
            e.stopPropagation();
            onViewJobs?.(company.id);
          }}
          className="flex-1"
        >
          View Jobs
        </Button>

        {company.website && (
          <Button
            size="sm"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              window.open(company.website, "_blank");
            }}
            className="px-3"
          >
            <ExternalLink className="w-4 h-4" />
          </Button>
        )}
      </div>
    </BaseCard>
  );
}
