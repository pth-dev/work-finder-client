import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Building2, 
  MapPin, 
  Calendar, 
  FileText,
  ExternalLink,
  Download,
  User
} from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CompanyLogo } from "@/components";
import { formatSalary } from "@/utils/common";
import { ApplicationTimeline } from "./ApplicationTimeline";

interface ApplicationDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  applicationId?: number;
}

// Mock application detail data
const mockApplicationDetail = {
  application_id: 1,
  job_id: 101,
  status: 'under_review',
  applied_at: '2024-01-15T10:30:00Z',
  updated_at: '2024-01-16T14:20:00Z',
  resume_used: {
    resume_id: 1,
    file_name: 'John_Doe_Resume.pdf',
    upload_time: '2024-01-10T09:00:00Z',
  },
  cover_letter: 'I am very interested in this position and believe my skills align well with your requirements...',
  job_post: {
    job_id: 101,
    job_title: 'Senior Frontend Developer',
    location: 'Ho Chi Minh City',
    salary_min: 25000000,
    salary_max: 35000000,
    job_type: 'full_time',
    description: 'We are looking for a Senior Frontend Developer to join our team...',
    requirements: 'React, TypeScript, 3+ years experience...',
    company: {
      company_id: 1,
      company_name: 'TechCorp Vietnam',
      company_image: 'https://via.placeholder.com/48x48?text=TC',
    },
  },
};

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
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export function ApplicationDetailModal({ 
  isOpen, 
  onClose, 
  applicationId 
}: ApplicationDetailModalProps) {
  const { t } = useTranslation();
  
  // In real implementation, fetch application detail by ID
  const application = mockApplicationDetail;
  const jobPost = application.job_post;
  const company = jobPost.company;

  if (!applicationId) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {t("applications.detail.title", "Application Details")}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Job & Company Info */}
          <div className="flex items-start space-x-4">
            <CompanyLogo
              src={company.company_image}
              companyName={company.company_name}
              size="lg"
              variant="rounded"
            />
            
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {jobPost.job_title}
                  </h2>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                    <div className="flex items-center space-x-1">
                      <Building2 className="h-4 w-4" />
                      <span>{company.company_name}</span>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{jobPost.location}</span>
                    </div>
                  </div>

                  {/* Salary */}
                  <div className="text-sm text-green-600 font-medium mt-2">
                    {formatSalary({
                      salary_min: jobPost.salary_min,
                      salary_max: jobPost.salary_max,
                    })}
                  </div>
                </div>

                <Badge 
                  variant="outline" 
                  className={getStatusColor(application.status)}
                >
                  {t(`applicationStatus.${application.status}`, application.status)}
                </Badge>
              </div>
            </div>
          </div>

          <Separator />

          {/* Application Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">
                {t("applications.detail.applicationInfo", "Application Information")}
              </h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">Applied:</span>
                  <span>{formatDate(application.applied_at)}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">Last Updated:</span>
                  <span>{formatDate(application.updated_at)}</span>
                </div>
                
                {application.resume_used && (
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">Resume:</span>
                    <Button variant="link" size="sm" className="p-0 h-auto">
                      <Download className="h-3 w-3 mr-1" />
                      {application.resume_used.file_name}
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">
                {t("applications.detail.actions", "Actions")}
              </h3>
              
              <div className="space-y-2">
                <Button asChild className="w-full">
                  <Link to={`/jobs/${jobPost.job_id}`}>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    {t("applications.detail.viewJob", "View Job Posting")}
                  </Link>
                </Button>
                
                <Button variant="outline" className="w-full">
                  <User className="h-4 w-4 mr-2" />
                  {t("applications.detail.contactRecruiter", "Contact Recruiter")}
                </Button>
              </div>
            </div>
          </div>

          {/* Cover Letter */}
          {application.cover_letter && (
            <>
              <Separator />
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">
                  {t("applications.detail.coverLetter", "Cover Letter")}
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">
                    {application.cover_letter}
                  </p>
                </div>
              </div>
            </>
          )}

          <Separator />

          {/* Timeline */}
          <ApplicationTimeline applicationId={application.application_id} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
