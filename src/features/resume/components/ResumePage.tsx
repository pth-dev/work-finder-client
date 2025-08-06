import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { User, Plus, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResumeCard } from "./ResumeCard";
import { ResumeUpload } from "./ResumeUpload";
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
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <User className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {t("resume.title", "Resume Management")}
            </h1>
            <p className="text-gray-600">
              {t(
                "resume.subtitle",
                "Upload, manage, and organize your resumes"
              )}
            </p>
          </div>
        </div>

        <Button onClick={() => setActiveTab("upload")}>
          <Plus className="h-4 w-4 mr-2" />
          {t("resume.uploadNew", "Upload New Resume")}
        </Button>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="my-resumes">
            {t("resume.myResumes", "My Resumes")} ({resumes.length})
          </TabsTrigger>
          <TabsTrigger value="upload">
            {t("resume.uploadResume", "Upload Resume")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="my-resumes" className="space-y-4">
          {isLoading ? (
            <div className="space-y-4">
              {/* Loading Skeleton */}
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="animate-pulse bg-white rounded-lg border p-4"
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                    </div>
                    <div className="w-20 h-8 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : resumes.length > 0 ? (
            <div className="space-y-4">
              {resumes.map((resume) => (
                <ResumeCard key={resume.resume_id} resume={resume} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <FileText className="h-12 w-12 text-gray-400" />
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t("resume.noResumes", "No resumes uploaded yet")}
              </h3>

              <p className="text-gray-600 mb-6">
                {t(
                  "resume.noResumesSubtitle",
                  "Upload your first resume to get started with job applications"
                )}
              </p>

              <Button onClick={() => setActiveTab("upload")}>
                <Plus className="h-4 w-4 mr-2" />
                {t("resume.uploadFirst", "Upload Your First Resume")}
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="upload">
          <ResumeUpload onUploadSuccess={handleUploadSuccess} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
