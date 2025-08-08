import React from "react";
import { useTranslation } from "react-i18next";
import { UseFormReturn } from "react-hook-form";
import { MapPin, Video } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { InterviewTypeSelect } from "./InterviewTypeSelect";
import { DateTimePicker } from "./DateTimePicker";
import { InterviewType } from "../types";

export interface CreateInterviewFormData {
  interview_type: InterviewType;
  scheduled_at: string;
  duration_minutes: number;
  location?: string;
  meeting_link?: string;
  notes?: string;
}

interface CreateInterviewFormProps {
  form: UseFormReturn<any>;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  isLoading?: boolean;
  candidateName?: string;
  jobTitle?: string;
}

export function CreateInterviewForm({
  form,
  onSubmit,
  onCancel,
  isLoading = false,
  candidateName,
  jobTitle,
}: CreateInterviewFormProps) {
  const { t } = useTranslation();

  // Watch interview type to show/hide conditional fields
  const interviewType = form.watch("interview_type");
  const showLocationField = interviewType === InterviewType.IN_PERSON;
  const showMeetingLinkField = interviewType === InterviewType.VIDEO;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Interview Type & Scheduled Date - Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="interview_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-900">
                  Loại phỏng vấn
                  <span className="text-red-500 ml-1">*</span>
                </FormLabel>
                <FormControl>
                  <InterviewTypeSelect
                    value={field.value}
                    onValueChange={field.onChange}
                    placeholder="Chọn loại phỏng vấn"
                  />
                </FormControl>

                <FormMessage className="text-red-600 font-medium" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="scheduled_at"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-900">
                  Ngày & Giờ phỏng vấn
                  <span className="text-red-500 ml-1">*</span>
                </FormLabel>
                <FormControl>
                  <DateTimePicker
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Chọn ngày và giờ"
                  />
                </FormControl>

                <FormMessage className="text-red-600 font-medium" />
              </FormItem>
            )}
          />
        </div>

        {/* Duration */}
        <FormField
          control={form.control}
          name="duration_minutes"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-900">
                Thời lượng (phút)
                <span className="text-red-500 ml-1">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="15"
                  max="480"
                  step="15"
                  placeholder="60"
                  {...field}
                  onChange={(e) =>
                    field.onChange(parseInt(e.target.value) || 60)
                  }
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* Conditional Location Field */}
        {showLocationField && (
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Địa điểm
                </FormLabel>
                <FormControl>
                  <Input placeholder="Nhập địa điểm phỏng vấn" {...field} />
                </FormControl>
                <FormDescription>Phỏng vấn sẽ diễn ra ở đâu?</FormDescription>
                <FormMessage className="text-red-600 font-medium" />
              </FormItem>
            )}
          />
        )}

        {/* Conditional Meeting Link Field */}
        {showMeetingLinkField && (
          <FormField
            control={form.control}
            name="meeting_link"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Video className="h-4 w-4" />
                  Link cuộc họp
                </FormLabel>
                <FormControl>
                  <Input
                    type="url"
                    placeholder="https://meet.google.com/..."
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Link video call cho phỏng vấn trực tuyến
                </FormDescription>
                <FormMessage className="text-red-600 font-medium" />
              </FormItem>
            )}
          />
        )}

        {/* Notes */}
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ghi chú</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Ghi chú thêm về cuộc phỏng vấn..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Thông tin bổ sung hoặc ghi chú chuẩn bị
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Form Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
          >
            Hủy
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-[#1967D2] hover:bg-[#1557B0] text-white font-semibold"
          >
            {isLoading ? "Đang tạo..." : "Lên lịch phỏng vấn"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
