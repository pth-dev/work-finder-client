import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
// import { useTranslation } from "react-i18next";
import { User, Upload, ChevronDown, ChevronUp, FileText } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  ScrollArea,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useMyResumes, useUploadResume } from "@/features/resume/hooks";
import { useCreateApplication } from "@/features/applications/hooks";
import { type Job } from "@/types";
import { type ApiCompany } from "../types";
import { toast } from "sonner";

interface JobApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: Job;
  company?: ApiCompany;
  onSuccess?: () => void;
}

export function JobApplicationModal({
  isOpen,
  onClose,
  job,
  company: _company,
  onSuccess,
}: JobApplicationModalProps) {
  // const { t } = useTranslation();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isResumeListOpen, setIsResumeListOpen] = useState(false);
  const [isUploadSectionOpen, setIsUploadSectionOpen] = useState(false);

  // Create schema with i18n
  const formSchema = z
    .object({
      resumeOption: z.enum(["latest", "select", "upload"]),
      resumeId: z.number().optional(),
      uploadedFile: z.instanceof(File).optional(),
    })
    .refine(
      (data) => {
        if (data.resumeOption === "latest" || data.resumeOption === "select")
          return !!data.resumeId;
        if (data.resumeOption === "upload") return !!data.uploadedFile;
        return false;
      },
      {
        message: "Vui lòng chọn CV để ứng tuyển",
        path: ["resumeOption"],
      }
    );

  type FormData = z.infer<typeof formSchema>;

  const { data: resumes = [] } = useMyResumes({
    enabled: isOpen,
  });

  const uploadResumeMutation = useUploadResume();

  const createApplicationMutation = useCreateApplication({
    mutationConfig: {
      onSuccess: () => {
        toast.success("Nộp hồ sơ ứng tuyển thành công!");
        onSuccess?.();
        onClose();
        form.reset();
        setSelectedFile(null);
      },
      onError: (error: any) => {
        toast.error(
          error.response?.data?.message || "Lỗi khi nộp hồ sơ ứng tuyển"
        );
      },
    },
  });

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      resumeOption: "upload",
      resumeId: undefined,
      uploadedFile: undefined,
    },
  });

  // Update form when resumes data changes
  useEffect(() => {
    if (resumes.length > 0) {
      form.setValue("resumeOption", "latest");
      form.setValue("resumeId", resumes[0]?.resume_id);
    } else {
      form.setValue("resumeOption", "upload");
      form.setValue("resumeId", undefined);
    }
  }, [resumes, form]);

  const latestResume = resumes[0]; // Resumes are sorted by upload_time DESC

  const handleSubmit = async (data: FormData) => {
    try {
      let resumeId = data.resumeId;

      // If uploading new CV, upload it first
      if (data.resumeOption === "upload" && data.uploadedFile) {
        const uploadResult = await uploadResumeMutation.mutateAsync(
          data.uploadedFile
        );
        resumeId = uploadResult.resume_id;
      }
      if (!resumeId) {
        toast.error("Không tìm thấy CV để nộp hồ sơ");
        return;
      }

      // Create application
      await createApplicationMutation.mutateAsync({
        job_id: parseInt(job.id),
        resume_id: resumeId,
      });
    } catch (error) {
      console.error("Application submission error:", error);
    }
  };

  const isSubmitting =
    uploadResumeMutation.isPending || createApplicationMutation.isPending;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] min-h-[70vh] bg-white border-0 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900">
            Ứng tuyển <span className="text-[#1967D2]">{job.title}</span>
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <ScrollArea className="max-h-[65vh] pr-4 overflow-y-auto">
              <div className="space-y-6">
                {/* CV Selection Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#1967D2]/10 rounded-lg flex items-center justify-center">
                      <User className="h-5 w-5 text-[#1967D2]" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">
                      Chọn CV để ứng tuyển
                    </h3>
                  </div>

                  <FormField
                    control={form.control}
                    name="resumeOption"
                    render={({ field }) => (
                      <FormItem className="space-y-4">
                        <FormControl>
                          <RadioGroup
                            onValueChange={(value) => {
                              field.onChange(value);
                              if (value === "latest" && latestResume) {
                                form.setValue(
                                  "resumeId",
                                  latestResume.resume_id
                                );
                                setIsResumeListOpen(false);
                                setIsUploadSectionOpen(false);
                              } else if (value === "select") {
                                setIsResumeListOpen(true);
                                setIsUploadSectionOpen(false);
                                form.setValue("resumeId", undefined);
                              } else if (value === "upload") {
                                setIsUploadSectionOpen(true);
                                setIsResumeListOpen(false);
                                form.setValue("resumeId", undefined);
                              }
                            }}
                            value={field.value}
                            className="space-y-4"
                          >
                            {/* Show options 1 & 2 only if user has CVs */}
                            {resumes.length > 0 ? (
                              <>
                                {/* Option 1: Use Latest CV */}
                                <div
                                  className={`border-2 rounded-xl p-4 ${
                                    field.value === "latest"
                                      ? "border-[#1967D2] bg-[#1967D2]/5"
                                      : "border-gray-200"
                                  }`}
                                >
                                  <div className="flex items-start gap-4">
                                    <div className="flex items-center justify-center mt-1">
                                      <RadioGroupItem
                                        value="latest"
                                        id="latest"
                                        className="border-[#1967D2] text-[#1967D2]"
                                      />
                                    </div>
                                    <div className="flex-1">
                                      <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                          <p className="font-semibold text-[#1967D2] mb-3">
                                            CV ứng tuyển gần nhất
                                          </p>
                                          <p className="text-sm text-gray-600 mb-2">
                                            {latestResume.file_name}
                                          </p>
                                          {latestResume.user && (
                                            <div className="space-y-1 text-sm text-gray-600">
                                              <div>
                                                <span className="font-medium">
                                                  Họ và tên:
                                                </span>{" "}
                                                {latestResume.user.full_name}
                                              </div>
                                              <div>
                                                <span className="font-medium">
                                                  Email:
                                                </span>{" "}
                                                {latestResume.user.email}
                                              </div>
                                              {latestResume.user.phone && (
                                                <div>
                                                  <span className="font-medium">
                                                    Số điện thoại:
                                                  </span>{" "}
                                                  {latestResume.user.phone}
                                                </div>
                                              )}
                                            </div>
                                          )}
                                        </div>
                                        <Button
                                          type="button"
                                          variant="link"
                                          size="sm"
                                          className="p-0 h-auto text-[#1967D2] hover:text-[#1967D2]/80 shrink-0 font-medium"
                                        >
                                          Xem
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Option 2: Select from CV List */}
                                <Collapsible
                                  open={isResumeListOpen}
                                  onOpenChange={setIsResumeListOpen}
                                >
                                  <div
                                    className={`border-2 rounded-xl p-4 ${
                                      field.value === "select"
                                        ? "border-[#1967D2] bg-[#1967D2]/5"
                                        : "border-gray-200"
                                    }`}
                                  >
                                    <div className="flex items-start gap-4">
                                      <div className="flex items-center justify-center mt-1">
                                        <RadioGroupItem
                                          value="select"
                                          id="select"
                                          className="border-[#1967D2] text-[#1967D2]"
                                        />
                                      </div>
                                      <div className="flex-1">
                                        <CollapsibleTrigger asChild>
                                          <Button
                                            type="button"
                                            variant="ghost"
                                            className="w-full justify-between p-0 h-auto font-semibold text-gray-900 hover:bg-transparent"
                                          >
                                            Chọn CV trong danh sách CV của tôi
                                            {isResumeListOpen ? (
                                              <ChevronUp className="h-4 w-4" />
                                            ) : (
                                              <ChevronDown className="h-4 w-4" />
                                            )}
                                          </Button>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent className="mt-4">
                                          <div className="space-y-3">
                                            {resumes
                                              .slice(0, 3)
                                              .map((resume) => (
                                                <div
                                                  key={resume.resume_id}
                                                  className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                                                    form.watch("resumeId") ===
                                                    resume.resume_id
                                                      ? "border-[#1967D2] bg-[#1967D2]/5"
                                                      : "border-gray-200 hover:border-gray-300"
                                                  }`}
                                                  onClick={() => {
                                                    form.setValue(
                                                      "resumeId",
                                                      resume.resume_id
                                                    );
                                                  }}
                                                >
                                                  <div className="flex items-center gap-3">
                                                    <FileText className="h-5 w-5 text-[#1967D2]" />
                                                    <div className="flex-1">
                                                      <p className="font-medium text-gray-900">
                                                        {resume.file_name}
                                                      </p>
                                                      <p className="text-sm text-gray-500">
                                                        Tải lên:{" "}
                                                        {new Date(
                                                          resume.upload_time
                                                        ).toLocaleDateString(
                                                          "vi-VN"
                                                        )}
                                                      </p>
                                                    </div>
                                                  </div>
                                                </div>
                                              ))}
                                            {resumes.length > 3 && (
                                              <Button
                                                type="button"
                                                variant="link"
                                                className="w-full text-[#1967D2] p-0 h-auto"
                                              >
                                                Xem thêm ({resumes.length - 3}{" "}
                                                CV)
                                              </Button>
                                            )}
                                          </div>
                                        </CollapsibleContent>
                                      </div>
                                    </div>
                                  </div>
                                </Collapsible>
                              </>
                            ) : null}

                            {/* Option 3: Upload New CV */}
                            <Collapsible
                              open={isUploadSectionOpen}
                              onOpenChange={setIsUploadSectionOpen}
                            >
                              <div
                                className={`border-2 rounded-xl p-4 ${
                                  field.value === "upload"
                                    ? "border-[#1967D2] bg-[#1967D2]/5"
                                    : "border-gray-200"
                                }`}
                              >
                                <CollapsibleTrigger asChild>
                                  <div className="flex items-start gap-4 cursor-pointer">
                                    <div className="flex items-center justify-center mt-1">
                                      <RadioGroupItem
                                        value="upload"
                                        id="upload"
                                        className="border-[#1967D2] text-[#1967D2]"
                                      />
                                    </div>
                                    <div className="flex-1 flex items-center justify-between">
                                      <p className="font-semibold text-gray-900">
                                        {resumes.length > 0
                                          ? "Tải lên CV mới"
                                          : "Chọn CV khác trong thư viện CV của tôi"}
                                      </p>
                                      {isUploadSectionOpen ? (
                                        <ChevronUp className="h-5 w-5 text-gray-400" />
                                      ) : (
                                        <ChevronDown className="h-5 w-5 text-gray-400" />
                                      )}
                                    </div>
                                  </div>
                                </CollapsibleTrigger>

                                <CollapsibleContent className="mt-4">
                                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                                    <div className="flex flex-col items-center gap-3">
                                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                                        <Upload className="h-6 w-6 text-gray-400" />
                                      </div>
                                      <div>
                                        <p className="font-medium text-gray-900">
                                          Tải lên CV từ máy tính, chọn hoặc kéo
                                          thả
                                        </p>
                                        <p className="text-sm text-gray-500 mt-1">
                                          Hỗ trợ định dạng .doc, .docx, pdf có
                                          kích thước dưới 5MB
                                        </p>
                                      </div>
                                      <Button
                                        type="button"
                                        variant="outline"
                                        className="mt-2"
                                        onClick={() => {
                                          const input =
                                            document.createElement("input");
                                          input.type = "file";
                                          input.accept = ".pdf,.doc,.docx";
                                          input.onchange = (e) => {
                                            const file = (
                                              e.target as HTMLInputElement
                                            ).files?.[0];
                                            if (file) {
                                              setSelectedFile(file);
                                              form.setValue(
                                                "uploadedFile",
                                                file
                                              );
                                            }
                                          };
                                          input.click();
                                        }}
                                      >
                                        Chọn CV
                                      </Button>
                                      {selectedFile && (
                                        <p className="text-sm text-[#1967D2] mt-2">
                                          Đã chọn: {selectedFile.name}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                </CollapsibleContent>
                              </div>
                            </Collapsible>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </ScrollArea>

            <DialogFooter className="flex gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isSubmitting}
                className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Hủy
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-[#1967D2] hover:bg-[#1967D2]/90 text-white font-semibold"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Đang nộp...
                  </div>
                ) : (
                  "Nộp hồ sơ ứng tuyển"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
