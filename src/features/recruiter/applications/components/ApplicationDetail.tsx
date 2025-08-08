import React from "react";
import { useTranslation } from "react-i18next";
import { formatDistanceToNow, format } from "date-fns";
import { vi } from "date-fns/locale";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  FileText,
  Download,
  ExternalLink,
  Building,
  DollarSign,
  Clock,
  User,
} from "lucide-react";
import { ApiApplication, ApplicationStatus } from "../types";
import { ApplicationStatusBadge } from "./ApplicationStatusBadge";
import { getStatusSelectOptions } from "../utils";

interface ApplicationDetailProps {
  application: ApiApplication;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (applicationId: number, status: ApplicationStatus) => void;
}

export function ApplicationDetail({
  application,
  isOpen,
  onClose,
  onStatusChange,
}: ApplicationDetailProps) {
  const { t, i18n } = useTranslation();
  const locale = i18n.language === "vi" ? vi : undefined;

  const candidate = application.resume.user;
  const job = application.job_post;
  const company = job.company;

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatSalary = (min?: number, max?: number) => {
    if (!min && !max) return t("common.salary.negotiable");
    if (min && max) return `${min}-${max} ${t("common.currency.million")} VND`;
    if (min)
      return `${t("common.salary.from")} ${min} ${t(
        "common.currency.million"
      )} VND`;
    if (max)
      return `${t("common.salary.upTo")} ${max} ${t(
        "common.currency.million"
      )} VND`;
    return t("common.salary.negotiable");
  };

  const handleStatusChange = (newStatus: string) => {
    onStatusChange(application.application_id, newStatus as ApplicationStatus);
  };

  const statusOptions = getStatusSelectOptions(application.status);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={candidate.avatar} alt={candidate.full_name} />
                <AvatarFallback className="bg-primary/10 text-primary font-semibold text-lg">
                  {getInitials(candidate.full_name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <DialogTitle className="text-2xl">
                  {candidate.full_name}
                </DialogTitle>
                <DialogDescription className="text-base">
                  {t("recruiterApplications.detail.applicationFor")}{" "}
                  {job.job_title}
                </DialogDescription>
              </div>
            </div>
            <ApplicationStatusBadge status={application.status} size="lg" />
          </div>

          {/* Status Change */}
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium">
              {t("recruiterApplications.detail.changeStatus")}:
            </label>
            <Select
              value={application.status}
              onValueChange={handleStatusChange}
            >
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                    className={option.isCurrent ? "bg-blue-50 font-medium" : ""}
                  >
                    <div className="flex items-center justify-between w-full">
                      <ApplicationStatusBadge
                        status={option.value}
                        size="sm"
                        showIcon={false}
                      />
                      {option.isCurrent && (
                        <span className="text-xs text-blue-600 ml-2">
                          (Hiện tại)
                        </span>
                      )}
                      {option.isWithdrawn && !option.isCurrent && (
                        <span className="text-xs text-gray-400 ml-2">
                          (Chỉ ứng viên)
                        </span>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Candidate Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <User className="h-5 w-5" />
              {t("applications.detail.candidateInfo")}
            </h3>

            <div className="grid gap-3">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{t("common.email")}:</span>
                <a
                  href={`mailto:${candidate.email}`}
                  className="text-blue-600 hover:underline"
                >
                  {candidate.email}
                </a>
              </div>

              {candidate.phone && (
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{t("common.phone")}:</span>
                  <a
                    href={`tel:${candidate.phone}`}
                    className="text-blue-600 hover:underline"
                  >
                    {candidate.phone}
                  </a>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Job Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Building className="h-5 w-5" />
              {t("applications.detail.jobInfo")}
            </h3>

            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div>
                <h4 className="font-semibold text-lg">{job.job_title}</h4>
                <p className="text-muted-foreground">{company.company_name}</p>
              </div>

              <div className="grid gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{job.location}</span>
                </div>

                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span>{formatSalary(job.salary_min, job.salary_max)}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant="outline">
                    {t(`jobs.type.${job.job_type}`)}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Application Timeline */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Clock className="h-5 w-5" />
              {t("applications.detail.timeline")}
            </h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="font-medium">
                    {t("applications.detail.applied")}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(application.applied_at), "PPP", {
                      locale,
                    })}
                  </p>
                </div>
                <Badge variant="secondary">
                  {formatDistanceToNow(new Date(application.applied_at), {
                    addSuffix: true,
                    locale,
                  })}
                </Badge>
              </div>

              {application.updated_at !== application.applied_at && (
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">
                      {t("applications.detail.lastUpdated")}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(application.updated_at), "PPP", {
                        locale,
                      })}
                    </p>
                  </div>
                  <Badge variant="outline">
                    {formatDistanceToNow(new Date(application.updated_at), {
                      addSuffix: true,
                      locale,
                    })}
                  </Badge>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Cover Letter */}
          {application.cover_letter && (
            <>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  {t("applications.detail.coverLetter")}
                </h3>

                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {application.cover_letter}
                  </p>
                </div>
              </div>

              <Separator />
            </>
          )}

          {/* Resume */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <FileText className="h-5 w-5" />
              {t("applications.detail.resume")}
            </h3>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">{application.resume.file_name}</p>
                  <p className="text-sm text-muted-foreground">
                    {t("applications.detail.resumeFile")}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  {t("applications.actions.view")}
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  {t("applications.actions.download")}
                </Button>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button className="flex-1">
              <Mail className="h-4 w-4 mr-2" />
              {t("applications.actions.sendMessage")}
            </Button>
            <Button variant="outline" className="flex-1">
              <Calendar className="h-4 w-4 mr-2" />
              {t("applications.actions.scheduleInterview")}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
