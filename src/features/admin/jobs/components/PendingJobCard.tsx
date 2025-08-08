import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { AdminJobPost, useApproveJob, useRejectJob } from "../api/admin-jobs";
import {
  Building2,
  MapPin,
  Calendar,
  DollarSign,
  CheckCircle,
  XCircle,
  Eye,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { toast } from "react-hot-toast";
import { formatSalary } from "@/utils/common";
import { JobStatusBadge } from "@/components/common/StatusBadge";

interface PendingJobCardProps {
  job: AdminJobPost;
}

export function PendingJobCard({ job }: PendingJobCardProps) {
  const { t, i18n } = useTranslation();
  const locale = i18n.language === "vi" ? vi : undefined;
  const [rejectReason, setRejectReason] = useState("");
  const [approveModalOpen, setApproveModalOpen] = useState(false);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);

  const approveJobMutation = useApproveJob({
    onSuccess: () => {
      toast.success(
        t("admin.jobs.approve.success", "Job approved successfully")
      );
      setApproveModalOpen(false);
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          t("admin.jobs.approve.error", "Failed to approve job")
      );
    },
  });

  const rejectJobMutation = useRejectJob({
    onSuccess: () => {
      toast.success(
        t("admin.jobs.reject.success", "Job rejected successfully")
      );
      setRejectReason("");
      setRejectModalOpen(false);
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          t("admin.jobs.reject.error", "Failed to reject job")
      );
    },
  });

  const handleApprove = () => {
    approveJobMutation.mutate(job.job_id);
  };

  const handleReject = () => {
    if (!rejectReason.trim()) {
      toast.error(
        t(
          "admin.jobs.reject.reasonRequired",
          "Please provide a reason for rejection"
        )
      );
      return;
    }

    rejectJobMutation.mutate({
      jobId: job.job_id,
      data: { reason: rejectReason },
    } as any);
  };

  const formatJobSalary = (min?: number, max?: number) => {
    return formatSalary({ min, max }, t);
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {job.title}
            </h3>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Building2 className="h-4 w-4" />
                {job.company.company_name}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {job.location}
              </div>
            </div>
          </div>
          <JobStatusBadge status="pending" size="sm" />
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Job Details */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-gray-400" />
            <span>{formatJobSalary(job.salary_min, job.salary_max)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-400" />
            <span>
              {t("common.time.ago", "{{time}} ago", {
                time: formatDistanceToNow(new Date(job.posted_date), {
                  locale,
                }),
              })}
            </span>
          </div>
        </div>

        {/* Description Preview */}
        <div className="text-sm text-gray-600">
          <p className="line-clamp-2">{job.description}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-2">
          {/* Left side - View Details */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-1" />
                {t("admin.jobs.actions.viewDetails", "Xem chi tiết")}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-white">
              <DialogHeader>
                <DialogTitle>{job.title}</DialogTitle>
                <DialogDescription>
                  {job.company.company_name} • {job.location}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">
                    {t("jobs.details.jobDescription", "Job Description")}
                  </h4>
                  <p className="text-sm text-gray-600 whitespace-pre-wrap">
                    {job.description}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">
                    {t("jobs.details.requirements", "Requirements")}
                  </h4>
                  <p className="text-sm text-gray-600 whitespace-pre-wrap">
                    {job.requirements}
                  </p>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Right side - Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Approve Button */}
            <Dialog open={approveModalOpen} onOpenChange={setApproveModalOpen}>
              <DialogTrigger asChild>
                <Button
                  size="sm"
                  className="bg-[#1967D2] hover:bg-[#1557B0] text-white"
                  disabled={approveJobMutation.isPending}
                >
                  <CheckCircle className="h-4 w-4 mr-1" />
                  {t("admin.jobs.actions.approve", "Phê duyệt")}
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white">
                <DialogHeader>
                  <DialogTitle>
                    {t("admin.jobs.approve.title", "Approve Job")}
                  </DialogTitle>
                  <DialogDescription>
                    {t(
                      "admin.jobs.approve.description",
                      'Are you sure you want to approve "{{title}}"?',
                      { title: job.title }
                    )}
                  </DialogDescription>
                </DialogHeader>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setApproveModalOpen(false)}
                  >
                    {t("common.cancel", "Hủy")}
                  </Button>
                  <Button
                    onClick={handleApprove}
                    disabled={approveJobMutation.isPending}
                    className="bg-[#1967D2] hover:bg-[#1557B8] text-white"
                  >
                    {approveJobMutation.isPending
                      ? t("admin.jobs.approve.approving", "Đang phê duyệt...")
                      : t("admin.jobs.approve.approveJob", "Phê duyệt")}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            {/* Reject Button */}
            <Dialog
              open={rejectModalOpen}
              onOpenChange={(open) => {
                setRejectModalOpen(open);
                if (!open) {
                  setRejectReason(""); // Reset reason when modal closes
                }
              }}
            >
              <DialogTrigger asChild>
                <Button
                  variant="destructive"
                  size="sm"
                  className="bg-red-600 hover:bg-red-700 text-white"
                  disabled={rejectJobMutation.isPending}
                >
                  <XCircle className="h-4 w-4 mr-1" />
                  {t("admin.jobs.actions.reject", "Từ chối")}
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white">
                <DialogHeader>
                  <DialogTitle>
                    {t("admin.jobs.reject.title", "Reject Job")}
                  </DialogTitle>
                  <DialogDescription>
                    {t(
                      "admin.jobs.reject.description",
                      'Please provide a reason for rejecting "{{title}}".',
                      { title: job.title }
                    )}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="reject-reason" className="mb-2 block">
                      {t("admin.jobs.reject.reasonLabel", "Rejection Reason")}{" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="reject-reason"
                      placeholder={t(
                        "admin.jobs.reject.reasonPlaceholder",
                        "Please explain why this job is being rejected..."
                      )}
                      value={rejectReason}
                      onChange={(e) => setRejectReason(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setRejectModalOpen(false)}
                    >
                      {t("common.cancel", "Hủy")}
                    </Button>
                    <Button
                      variant="destructive"
                      className="bg-red-600 hover:bg-red-700 text-white border-red-600 hover:border-red-700"
                      onClick={handleReject}
                      disabled={
                        rejectJobMutation.isPending || !rejectReason.trim()
                      }
                    >
                      {rejectJobMutation.isPending
                        ? t("admin.jobs.reject.rejecting", "Đang từ chối...")
                        : t("admin.jobs.reject.rejectJob", "Từ chối")}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
