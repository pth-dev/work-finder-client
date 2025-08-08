import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Badge, Card } from "@/components";
import { type Job } from "@/types";
import { type ApiCompany, type ApiJobPost } from "../types";
import { JobHeader } from "./JobHeader";
import { JobSidebar } from "./JobSidebar";
import { ShareJob } from "./ShareJob";

interface JobTwoColumnLayoutProps {
  job: Job;
  company?: ApiCompany;
  rawJobData?: ApiJobPost; // Add raw API data for description, requirements, benefits
  onSaveJob: () => void;
  onApply: () => void;
  isSaved: boolean;
  isApplying: boolean;
  hasApplied: boolean;
  appliedAt?: string; // Application date when user has applied
}

interface JobSections {
  description: string;
  requirements: string[];
  benefits: string[];
}

export function JobTwoColumnLayout({
  job,
  company,
  rawJobData,
  onSaveJob,
  onApply,
  isSaved,
  isApplying,
  hasApplied,
  appliedAt,
}: JobTwoColumnLayoutProps) {
  const { t } = useTranslation();
  // Memoized job sections using raw API data
  const jobSections = useMemo((): JobSections => {
    if (!rawJobData) {
      return {
        description: job?.description || "",
        requirements: [],
        benefits: [],
      };
    }

    // Parse requirements and benefits into arrays
    const parseListItems = (text?: string): string[] => {
      if (!text) return [];
      return text
        .split("\n")
        .filter((item) => {
          const trimmed = item.trim();
          return (
            trimmed.startsWith("•") ||
            trimmed.startsWith("-") ||
            trimmed.startsWith("*")
          );
        })
        .map((item) => {
          const trimmed = item.trim();
          // Remove bullet points (•, -, *)
          if (trimmed.startsWith("•")) return trimmed.substring(1).trim();
          if (trimmed.startsWith("-")) return trimmed.substring(1).trim();
          if (trimmed.startsWith("*")) return trimmed.substring(1).trim();
          return trimmed;
        })
        .filter((item) => item.length > 0);
    };

    return {
      description: rawJobData.description || "",
      requirements: parseListItems(rawJobData.requirements),
      benefits: parseListItems(rawJobData.benefits),
    };
  }, [rawJobData, job?.description]);

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-6">
          {/* Header Section - Full Width */}
          <JobHeader
            job={job}
            company={company}
            onSaveJob={onSaveJob}
            onApply={onApply}
            isSaved={isSaved}
            isApplying={isApplying}
            hasApplied={hasApplied}
            appliedAt={appliedAt}
          />

          {/* Two Column Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-[2fr_1fr] gap-6 lg:items-start">
            {/* Left Column - Job Description */}
            <div className="lg:col-span-2 xl:col-span-1">
              <Card className="border-0 shadow-lg bg-white h-full">
                <div className="p-6 md:p-8 space-y-8">
                  {/* Job Description */}
                  <div>
                    <h2 className="text-xl font-bold text-[#202124] mb-6">
                      {t("jobs.details.jobDescription")}
                    </h2>
                    <div className="prose prose-gray max-w-none">
                      <p className="text-[#696969] leading-relaxed text-base">
                        {jobSections.description}
                      </p>
                    </div>
                  </div>

                  {/* Requirements */}
                  {jobSections.requirements.length > 0 && (
                    <div>
                      <h2 className="text-xl font-bold text-[#202124] mb-6">
                        {t("jobs.details.requirements")}
                      </h2>
                      <div className="space-y-4">
                        {jobSections.requirements.map((requirement, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-[#1967D2] rounded-full mt-2 flex-shrink-0" />
                            <p className="text-[#696969] leading-relaxed text-base">
                              {requirement}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Benefits */}
                  {jobSections.benefits.length > 0 && (
                    <div>
                      <h2 className="text-xl font-bold text-[#202124] mb-6">
                        {t("jobs.details.benefits")}
                      </h2>
                      <div className="space-y-4">
                        {jobSections.benefits.map((benefit, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-[#34A853] rounded-full mt-2 flex-shrink-0" />
                            <p className="text-[#696969] leading-relaxed text-base">
                              {benefit}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Skills */}
                  {job.skills && job.skills.length > 0 && (
                    <div>
                      <h2 className="text-xl font-bold text-[#202124] mb-6">
                        {t("jobs.details.requiredSkills")}
                      </h2>
                      <div className="flex flex-wrap gap-2">
                        {job.skills.map((skill, index) => (
                          <Badge
                            key={index}
                            className="bg-[#F5F7FC] text-[#1967D2] border-[#1967D2] hover:bg-[#1967D2] hover:text-white px-3 py-1 rounded-md font-medium"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Share Job */}
                  <ShareJob jobTitle={job.title} />
                </div>
              </Card>
            </div>

            {/* Right Column - Job Overview & Sidebar */}
            <div className="lg:col-span-1 xl:col-span-1">
              <div className="lg:sticky lg:top-6 lg:self-start">
                <JobSidebar job={job} company={company} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
