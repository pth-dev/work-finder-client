import React from "react";
import { Card, CardContent } from "./card";
import { Badge } from "./badge";
import { MapPin, Building2, Clock, Bookmark } from "lucide-react";
import { cn } from "@/utils";

// Pure UI Props - không biết gì về business logic
export interface JobCardProps {
  className?: string;
  logo?: React.ReactNode;
  title: string;
  company: string;
  location: string;
  timeAgo: string;
  salary?: string;
  tags: Array<{
    text: string;
    variant?: "default" | "secondary" | "destructive" | "outline";
    color?: "blue" | "green" | "yellow" | "red";
  }>;
  onBookmark?: () => void;
  onClick?: () => void;
  isBookmarked?: boolean;
  children?: React.ReactNode;
}

export const JobCard = React.forwardRef<HTMLDivElement, JobCardProps>(
  (
    {
      className,
      logo,
      title,
      company,
      location,
      timeAgo,
      salary,
      tags,
      onBookmark,
      onClick,
      isBookmarked = false,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Card
        ref={ref}
        className={cn(
          "cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1",
          "border border-[#ECEDF2] rounded-lg bg-white",
          "w-full min-h-[156px]",
          className
        )}
        onClick={onClick}
        {...props}
      >
        <CardContent className="p-4 relative">
          {/* Bookmark Button */}
          {onBookmark && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onBookmark();
              }}
              className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Bookmark
                className={cn(
                  "h-4 w-4 text-gray-500",
                  isBookmarked && "fill-current text-blue-600"
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

            {/* Job Info */}
            <div className="flex-1 min-w-0 pr-6">
              {/* Job Title */}
              <h3 className="text-[18px] font-medium text-[#202124] mb-2 line-clamp-1 font-['Jost']">
                {title}
              </h3>

              {/* Company Meta - Improved Layout */}
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-3">
                <div className="flex items-center gap-1.5">
                  <Building2 className="h-3.5 w-3.5 text-gray-400" />
                  <span className="truncate max-w-[120px]">{company}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-gray-400" />
                  <span className="truncate max-w-[100px]">{location}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-gray-400" />
                  <span className="whitespace-nowrap">{timeAgo}</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex items-center gap-2 flex-wrap">
                {/* Salary Tag - Priority Display */}
                {salary && (
                  <JobTag text={salary} variant="outline" color="green" />
                )}

                {/* Other Tags */}
                {tags.map((tag, index) => (
                  <JobTag key={index} {...tag} />
                ))}
              </div>

              {/* Additional Content */}
              {children}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
);

JobCard.displayName = "JobCard";

// Job Tag Component - Pure UI
export interface JobTagProps {
  text: string;
  variant?: "default" | "secondary" | "destructive" | "outline";
  color?: "blue" | "green" | "yellow" | "red";
  className?: string;
}

export const JobTag = React.forwardRef<HTMLDivElement, JobTagProps>(
  ({ text, variant = "secondary", color, className, ...props }, ref) => {
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
          "text-[13px] font-normal font-['Jost'] border rounded-full px-3 py-1",
          color && getColorClasses(),
          className
        )}
        {...props}
      >
        {text}
      </Badge>
    );
  }
);

JobTag.displayName = "JobTag";

// Section Header Component - Pure UI
export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  className?: string;
}

export const SectionHeader = React.forwardRef<
  HTMLDivElement,
  SectionHeaderProps
>(({ title, subtitle, children, className, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("text-center mb-12", className)} {...props}>
      <h2 className="text-[30px] font-medium text-[#202124] mb-4 font-['Jost']">
        {title}
      </h2>
      {subtitle && (
        <p className="text-[15px] text-[#696969] font-['Jost'] max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      {children}
    </div>
  );
});

SectionHeader.displayName = "SectionHeader";
