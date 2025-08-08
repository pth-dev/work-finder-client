import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CreateInterviewForm } from "./CreateInterviewForm";
import { useCreateInterview } from "../hooks/useInterviewMutations";
import { InterviewType } from "../types";
import { ApiApplication } from "../../applications/types";

interface CreateInterviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  application: ApiApplication;
}

// Validation schema factory - HARDCODED VIETNAMESE FOR DEMO
const createValidationSchema = (t: (key: string, options?: any) => string) =>
  z
    .object({
      interview_type: z.enum(
        [
          InterviewType.PHONE,
          InterviewType.VIDEO,
          InterviewType.IN_PERSON,
        ] as const,
        {
          message: "Vui lòng chọn loại phỏng vấn",
        }
      ),
      scheduled_at: z.string().min(1, "Vui lòng chọn ngày và giờ phỏng vấn"),
      duration_minutes: z
        .number()
        .min(15, "Phỏng vấn phải có ít nhất 15 phút")
        .max(480, "Phỏng vấn không được vượt quá 480 phút"),
      location: z.string().optional(),
      meeting_link: z
        .string()
        .url("Vui lòng nhập link hợp lệ")
        .optional()
        .or(z.literal("")),
      notes: z.string().optional(),
    })
    .refine(
      (data) => {
        // Location is required for in-person interviews
        if (data.interview_type === InterviewType.IN_PERSON) {
          return data.location && data.location.trim().length > 0;
        }
        return true;
      },
      {
        message: "Địa điểm là bắt buộc cho phỏng vấn trực tiếp",
        path: ["location"],
      }
    )
    .refine(
      (data) => {
        // Meeting link is required for video interviews
        if (data.interview_type === InterviewType.VIDEO) {
          return data.meeting_link && data.meeting_link.trim().length > 0;
        }
        return true;
      },
      {
        message: "Link cuộc họp là bắt buộc cho phỏng vấn video",
        path: ["meeting_link"],
      }
    )
    .refine(
      (data) => {
        // Validate future date
        if (data.scheduled_at) {
          const scheduledDate = new Date(data.scheduled_at);
          const now = new Date();
          return scheduledDate > now;
        }
        return true;
      },
      {
        message: "Phỏng vấn phải được lên lịch cho thời gian trong tương lai",
        path: ["scheduled_at"],
      }
    );

export function CreateInterviewModal({
  isOpen,
  onClose,
  application,
}: CreateInterviewModalProps) {
  const { t } = useTranslation();
  const createInterviewMutation = useCreateInterview();

  const createInterviewSchema = createValidationSchema(t);
  type CreateInterviewSchemaType = z.infer<typeof createInterviewSchema>;

  const form = useForm<CreateInterviewSchemaType>({
    resolver: zodResolver(createInterviewSchema),
    defaultValues: {
      interview_type: InterviewType.VIDEO,
      scheduled_at: "",
      duration_minutes: 60,
      location: "",
      meeting_link: "",
      notes: "",
    },
  });

  const handleSubmit = async (data: CreateInterviewSchemaType) => {
    try {
      await createInterviewMutation.mutateAsync({
        application_id: application.application_id,
        interview_type: data.interview_type,
        scheduled_at: data.scheduled_at,
        duration_minutes: data.duration_minutes,
        location: data.location || undefined,
        meeting_link: data.meeting_link || undefined,
        notes: data.notes || undefined,
      });

      // Reset form and close modal on success
      form.reset();
      onClose();
    } catch (error) {
      // Error handling is done in the mutation hook
      console.error("Failed to create interview:", error);
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const candidateName =
    application.resume?.user?.full_name || "Unknown Candidate";
  const jobTitle = application.job_post?.job_title || "Unknown Position";

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto"
        overlayVariant="light"
      >
        <DialogHeader>
          <DialogTitle>Lên lịch phỏng vấn</DialogTitle>
          <DialogDescription>
            Lên lịch phỏng vấn với {candidateName} cho vị trí {jobTitle}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6">
          <CreateInterviewForm
            form={form}
            onSubmit={handleSubmit}
            onCancel={handleClose}
            isLoading={createInterviewMutation.isPending}
            candidateName={candidateName}
            jobTitle={jobTitle}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
