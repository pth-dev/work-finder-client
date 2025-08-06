import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  MapPin, 
  Calendar, 
  Clock,
  ExternalLink,
  Eye,
  FileText
} from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CompanyLogo } from "@/components";
import { formatSalary } from "@/utils/common";

interface ApplicationCardProps {
  application: {
    application_id: number;
    job_id: number;
    status: string;
    applied_at: string;
    updated_at: string;
    job_post?: {
      job_id: number;
      job_title: string;
      location?: string;
      salary_min?: number;
      salary_max?: number;
      job_type?: string;
      company: {
        company_id: number;
        company_name: string;
        company_image?: string;
      };
    };
  };
  onViewDetails?: (applicationId: number) => void;
}

// Helper function to get status color
const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'under_review':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'interview_scheduled':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'rejected':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'accepted':
      return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

// Helper function to format date
const formatApplicationDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("vi-VN");
};

export function ApplicationCard({ application, onViewDetails }: ApplicationCardProps) {
  const { t } = useTranslation();
  
  const jobPost = application.job_post;
  const company = jobPost?.company;

  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          {/* Application Info */}
          <div className="flex items-start space-x-3 flex-1">
            {/* Company Logo */}
            <div className="flex-shrink-0">
              <CompanyLogo
                src={company?.company_image}
                companyName={company?.company_name || ""}
                size="md"
                variant="rounded"
              />
            </div>

            {/* Job Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-gray-900 truncate mb-1">
                    {jobPost?.job_title || t("applications.unknownJob", "Unknown Job")}
                  </h3>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                    <div className="flex items-center space-x-1">
                      <Building2 className="h-4 w-4" />
                      <span>{company?.company_name || t("jobs.unknownCompany")}</span>
                    </div>
                    
                    {jobPost?.location && (
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{jobPost.location}</span>
                      </div>
                    )}
                  </div>

                  {/* Salary */}
                  {(jobPost?.salary_min || jobPost?.salary_max) && (
                    <div className="text-sm text-green-600 font-medium mb-2">
                      {formatSalary({
                        salary_min: jobPost.salary_min,
                        salary_max: jobPost.salary_max,
                      })}
                    </div>
                  )}

                  {/* Application Timeline */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>Applied {formatApplicationDate(application.applied_at)}</span>
                      </div>
                      
                      {application.updated_at !== application.applied_at && (
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>Updated {formatApplicationDate(application.updated_at)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Status & Actions */}
          <div className="flex flex-col items-end space-y-2 ml-4">
            {/* Status Badge */}
            <Badge 
              variant="outline" 
              className={getStatusColor(application.status)}
            >
              {t(`applicationStatus.${application.status}`, application.status)}
            </Badge>

            {/* Action Buttons */}
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onViewDetails?.(application.application_id)}
              >
                <Eye className="h-4 w-4 mr-1" />
                Details
              </Button>
              
              <Button
                asChild
                size="sm"
                variant="ghost"
              >
                <Link to={`/jobs/${jobPost?.job_id}`}>
                  <ExternalLink className="h-4 w-4 mr-1" />
                  View Job
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
