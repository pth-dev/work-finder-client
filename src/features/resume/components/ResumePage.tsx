import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Plus, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { PageHeader } from "@/components/common";
import { ResumeCard } from "./ResumeCard";
import { ResumeUpload } from "./ResumeUpload";
import { ResumeTabTrigger } from "./ResumeTabTrigger";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { EmptyState } from "./EmptyState";
import { useMyResumes } from "../hooks";

export function ResumePage() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("my-resumes");

  const { data: resumes = [], isLoading, refetch } = useMyResumes();

  const handleUploadSuccess = useCallback(() => {
    refetch();
    setActiveTab("my-resumes");
  }, [refetch]);

  return (
    <div className="space-y-4">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <PageHeader
          icon={FileText}
          title={t("resume.title", "Resume Management")}
          subtitle={t(
            "resume.subtitle",
            "Upload, manage, and organize your resumes"
          )}
          theme="blue"
        />

        <Button
          onClick={() => setActiveTab("upload")}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          {t("resume.uploadNew", "Upload New Resume")}
        </Button>
      </div>

      {/* Resume Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <div className="w-full">
          <TabsList className="grid w-full grid-cols-2 h-auto min-h-[48px] rounded-xl bg-white border border-gray-200 p-0.5 shadow-sm gap-0.5">
            <ResumeTabTrigger value="my-resumes">
              {t("resume.myResumes", "My Resumes")} ({resumes.length})
            </ResumeTabTrigger>

            <ResumeTabTrigger value="upload">
              {t("resume.uploadResume", "Upload Resume")}
            </ResumeTabTrigger>
          </TabsList>
        </div>

        <TabsContent value="my-resumes" className="space-y-4">
          {isLoading ? (
            <LoadingSkeleton count={3} />
          ) : resumes.length > 0 ? (
            <div className="space-y-4">
              {resumes.map((resume) => (
                <ResumeCard key={resume.resume_id} resume={resume} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={FileText}
              title={t("resume.noResumes", "No resumes uploaded yet")}
              subtitle={t(
                "resume.noResumesSubtitle",
                "Upload your first resume to get started with job applications"
              )}
              actionLabel={t("resume.uploadFirst", "Upload Your First Resume")}
              onAction={() => setActiveTab("upload")}
              theme="blue"
            />
          )}
        </TabsContent>

        <TabsContent value="upload">
          <ResumeUpload onUploadSuccess={handleUploadSuccess} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
