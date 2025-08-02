import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "./card";
import { Badge } from "./badge";
import { MapPin, Building2, Users, Heart, Briefcase } from "lucide-react";
import { cn } from "@/utils";

// Pure UI Props - không biết gì về business logic
export interface CompanyCardProps {
  className?: string;
  logo?: React.ReactNode;
  name: string;
  industry?: string;
  location?: string;
  jobCount?: number;
  followerCount?: number;
  employeeCount?: number;
  isVerified?: boolean;
  tags?: Array<{
    text: string;
    variant?: "default" | "secondary" | "destructive" | "outline";
    color?: "blue" | "green" | "yellow" | "red";
  }>;
  onFollow?: () => void;
  onClick?: () => void;
  href?: string;
  isFollowed?: boolean;
  children?: React.ReactNode;
}

export const CompanyCard = React.forwardRef<HTMLDivElement, CompanyCardProps>(
  (
    {
      className,
      logo,
      name,
      industry,
      location,
      jobCount,
      followerCount,
      employeeCount,
      isVerified = false,
      tags = [],
      onFollow,
      onClick,
      href,
      isFollowed = false,
      children,
      ...props
    },
    ref
  ) => {
    const { t } = useTranslation();

    const cardElement = (
      <Card
        ref={ref}
        className={cn(
          "cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1",
          "border border-[#ECEDF2] rounded-lg bg-white",
          "w-full min-h-[180px]",
          className
        )}
        onClick={!href ? onClick : undefined}
        {...props}
      >
        <CardContent className="p-4 relative">
          {/* Follow Button */}
          {onFollow && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onFollow();
              }}
              className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Heart
                className={cn(
                  "h-4 w-4 text-gray-500",
                  isFollowed && "fill-current text-red-500"
                )}
              />
            </button>
          )}

          <div className="flex gap-4">
            {/* Company Logo */}
            <div className="flex-shrink-0">
              {logo || (
                <div className="w-12 h-12 bg-[#ECEDF2] rounded-lg flex items-center justify-center">
                  <div className="w-6 h-6 bg-gray-400 rounded opacity-50" />
                </div>
              )}
            </div>

            {/* Company Info */}
            <div className="flex-1 min-w-0 pr-6">
              {/* Company Name */}
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-[18px] font-medium text-[#202124] line-clamp-1 font-['Jost']">
                  {name}
                </h3>
                {isVerified && (
                  <Badge className="bg-[#1967D2]/15 text-[#1967D2] border-[#1967D2]/20 text-xs px-2 py-0.5">
                    {t("common:companies.verified")}
                  </Badge>
                )}
              </div>

              {/* Company Meta */}
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-3">
                {industry && (
                  <div className="flex items-center gap-1.5">
                    <Building2 className="h-3.5 w-3.5 text-gray-400" />
                    <span className="truncate max-w-[120px]">{industry}</span>
                  </div>
                )}

                {location && (
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-gray-400" />
                    <span className="truncate max-w-[100px]">{location}</span>
                  </div>
                )}

                {employeeCount && (
                  <div className="flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5 text-gray-400" />
                    <span className="whitespace-nowrap">
                      {employeeCount.toLocaleString()} employees
                    </span>
                  </div>
                )}
              </div>

              {/* Stats and Tags */}
              <div className="flex items-center gap-2 flex-wrap">
                {/* Job Count Tag - Priority Display */}
                {jobCount !== undefined && jobCount > 0 && (
                  <CompanyTag
                    text={`${jobCount} ${
                      jobCount === 1
                        ? t("common:companies.job")
                        : t("common:companies.jobs")
                    }`}
                    variant="outline"
                    color="green"
                    icon={<Briefcase className="h-3 w-3" />}
                  />
                )}

                {/* Follower Count */}
                {followerCount !== undefined && followerCount > 0 && (
                  <CompanyTag
                    text={`${followerCount.toLocaleString()} ${t(
                      "common:companies.followers"
                    )}`}
                    variant="secondary"
                    color="blue"
                    icon={<Heart className="h-3 w-3" />}
                  />
                )}

                {/* Other Tags */}
                {tags.map((tag, index) => (
                  <CompanyTag key={index} {...tag} />
                ))}
              </div>

              {/* Additional Content */}
              {children}
            </div>
          </div>
        </CardContent>
      </Card>
    );

    return href ? (
      <Link to={href} className="block">
        {cardElement}
      </Link>
    ) : (
      cardElement
    );
  }
);

CompanyCard.displayName = "CompanyCard";

// Company Tag Component - Pure UI
export interface CompanyTagProps {
  text: string;
  variant?: "default" | "secondary" | "destructive" | "outline";
  color?: "blue" | "green" | "yellow" | "red";
  className?: string;
  icon?: React.ReactNode;
}

export const CompanyTag = React.forwardRef<HTMLDivElement, CompanyTagProps>(
  ({ text, variant = "secondary", color, className, icon, ...props }, ref) => {
    const getColorClasses = () => {
      switch (color) {
        case "blue":
          return "bg-[#1967D2]/15 text-[#1967D2] border-[#1967D2]/20";
        case "green":
          return "bg-[#34A853]/15 text-[#34A853] border-[#34A853]/20";
        case "yellow":
          return "bg-[#F9AB00]/15 text-[#F9AB00] border-[#F9AB00]/20";
        case "red":
          return "bg-[#EA4335]/15 text-[#EA4335] border-[#EA4335]/20";
        default:
          return "";
      }
    };

    return (
      <Badge
        ref={ref}
        variant={variant}
        className={cn(
          "text-[13px] font-normal font-['Jost'] border rounded-full px-3 py-1 flex items-center gap-1.5",
          color && getColorClasses(),
          className
        )}
        {...props}
      >
        {icon}
        {text}
      </Badge>
    );
  }
);

CompanyTag.displayName = "CompanyTag";

// Company Card Skeleton - Loading State
export const CompanyCardSkeleton = React.forwardRef<
  HTMLDivElement,
  { className?: string }
>(({ className }, ref) => {
  return (
    <Card
      ref={ref}
      className={cn(
        "border border-[#ECEDF2] rounded-lg bg-white",
        "w-full min-h-[180px]",
        className
      )}
    >
      <CardContent className="p-4">
        <div className="flex gap-4">
          {/* Company Logo Skeleton */}
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse" />
          </div>

          {/* Company Info Skeleton */}
          <div className="flex-1 min-w-0 pr-6">
            {/* Company Name Skeleton */}
            <div className="flex items-center gap-2 mb-2">
              <div className="h-5 bg-gray-200 rounded animate-pulse w-32" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-16" />
            </div>

            {/* Company Meta Skeleton */}
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-24" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-20" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-28" />
            </div>

            {/* Tags Skeleton */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="h-6 bg-gray-200 rounded-full animate-pulse w-16" />
              <div className="h-6 bg-gray-200 rounded-full animate-pulse w-20" />
              <div className="h-6 bg-gray-200 rounded-full animate-pulse w-14" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

CompanyCardSkeleton.displayName = "CompanyCardSkeleton";
