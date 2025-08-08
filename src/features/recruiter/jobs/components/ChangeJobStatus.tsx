import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ApiJobStatus } from "@/features/jobs/types";
import { useUpdateJobStatus } from "../hooks";

interface ChangeJobStatusProps {
  jobId: number;
  currentStatus: ApiJobStatus;
  disabled?: boolean;
}

export function ChangeJobStatus({
  jobId,
  currentStatus,
  disabled = false,
}: ChangeJobStatusProps) {
  const { t } = useTranslation();
  const updateStatusMutation = useUpdateJobStatus();

  // Only show status changer for active and inactive jobs
  if (currentStatus !== "active" && currentStatus !== "inactive") {
    return null;
  }

  // Only allow switching between active and inactive
  const statusOptions: { value: ApiJobStatus; label: string }[] = [
    { value: "active", label: t("recruiter.jobs.status.active") },
    { value: "inactive", label: t("recruiter.jobs.status.inactive") },
  ];

  const handleStatusChange = async (newStatus: ApiJobStatus) => {
    if (newStatus === currentStatus) return;

    try {
      await updateStatusMutation.mutateAsync({
        jobId,
        status: newStatus,
      });
    } catch (error) {
      // Error is handled by the mutation's onError callback
    }
  };

  return (
    <Select
      value={currentStatus}
      onValueChange={handleStatusChange}
      disabled={disabled || updateStatusMutation.isPending}
    >
      <SelectTrigger className="w-[140px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {statusOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
