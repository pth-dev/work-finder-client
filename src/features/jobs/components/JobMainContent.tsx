import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Building2,
  MapPin,
  Clock,
  DollarSign,
  Heart,
  Share2,
  ChevronLeft,
} from "lucide-react";
import { Button, Card, Badge, Avatar } from "@/components";
import { type Job } from "@/types";
import { type ApiCompany } from "../types";
import { formatSalary } from "@/utils/common";
import { ShareJob } from "./ShareJob";

interface JobMainContentProps {
  job: Job;
  company?: ApiCompany;
  onSaveJob: () => void;
  onApply: () => void;
  isSaved: boolean;
  isApplying: boolean;
  hasApplied: boolean;
}

interface JobSections {
  overview: string;
  responsibilities: string[];
  requirements: string[];
}

// Helper to convert Job salary to global formatSalary format
const formatJobSalary = (job: Job) => {
  if (!job.salary) return formatSalary({});
  return formatSalary({
    min: job.salary.min,
    max: job.salary.max,
    text: job.salary.text, // ✅ Use pre-formatted text if available
  });
};

const getBadgeVariant = (type: string) => {
  switch (type) {
    case "full_time":
      return "bg-[#1967D2] text-white";
    case "part_time":
      return "bg-[#34A853] text-white";
    case "contract":
      return "bg-[#9C27B0] text-white";
    case "internship":
      return "bg-[#FF9800] text-white";
    default:
      return "bg-[#6C757D] text-white";
  }
};

export function JobMainContent({
  job,
  company,
  onSaveJob,
  onApply,
  isSaved,
  isApplying,
  hasApplied,
}: JobMainContentProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      // Use toast notification here
    } catch (error) {
      console.error("Failed to copy to clipboard:", error);
    }
  };

  const salaryText = useMemo(() => formatJobSalary(job), [job.salary]);
  const badgeVariant = useMemo(() => getBadgeVariant(job.type), [job.type]);

  // Memoized job description parsing
  const jobSections = useMemo((): JobSections => {
    if (!job?.description)
      return { overview: "", responsibilities: [], requirements: [] };

    const sections = job.description.split("\n\n");
    return {
      overview: sections[0] || job.description,
      responsibilities: sections.filter(
        (section) =>
          section.toLowerCase().includes("responsibilities") ||
          section.toLowerCase().includes("duties")
      ),
      requirements: sections.filter(
        (section) =>
          section.toLowerCase().includes("requirements") ||
          section.toLowerCase().includes("qualifications") ||
          section.toLowerCase().includes("skills")
      ),
    };
  }, [job?.description]);

  return (
    <Card className="border-0 shadow-lg bg-white">
      <div className="p-6 md:p-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="-ml-2 text-[#202124] hover:bg-gray-100"
              aria-label="Go back to jobs list"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Jobs
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="border-[#1967D2] text-[#1967D2] hover:bg-[#1967D2] hover:text-white"
              aria-label="Share this job"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row items-start gap-6">
            {/* Company Avatar */}
            <Avatar className="h-16 w-16 sm:h-20 sm:w-20 rounded-lg">
              {company?.company_image ? (
                <img
                  src={company.company_image}
                  alt={`${company.company_name} logo`}
                  className="object-cover"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <div className="bg-primary/10 flex items-center justify-center text-primary font-semibold text-lg">
                  {company?.company_name?.[0] || job.companyName[0]}
                </div>
              )}
            </Avatar>

            <div className="flex-1 min-w-0">
              <h1 className="text-2xl md:text-3xl font-bold text-[#202124] mb-3">
                {job.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-[#696969]">
                <div className="flex items-center gap-1">
                  <Building2 className="h-4 w-4" aria-hidden="true" />
                  <span className="font-medium">{job.companyName}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                  <span>
                    {job.location.isRemote
                      ? "Remote"
                      : `${job.location.city}, ${job.location.country}`}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                  <span>{new Date(job.postedAt).toLocaleDateString()}</span>
                </div>
                {job.salary && (
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4" aria-hidden="true" />
                    <span>{salaryText}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                <Badge
                  className={`${badgeVariant} px-3 py-1 rounded-md font-medium text-sm`}
                >
                  {job.type.replace("_", " ").toUpperCase()}
                </Badge>
                {job.featured && (
                  <Badge className="bg-[#34A853] text-white px-3 py-1 rounded-md font-medium text-sm">
                    Private
                  </Badge>
                )}
                {job.urgent && (
                  <Badge className="bg-[#D93025] text-white px-3 py-1 rounded-md font-medium text-sm">
                    Urgent
                  </Badge>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  size="lg"
                  onClick={onApply}
                  disabled={isApplying || hasApplied}
                  className={`min-w-[120px] bg-[#1967D2] hover:bg-[#1557B8] text-white font-medium ${
                    hasApplied ? "bg-gray-400 hover:bg-gray-400" : ""
                  }`}
                  aria-label={
                    hasApplied
                      ? "Already applied to this job"
                      : "Apply to this job"
                  }
                >
                  {isApplying
                    ? t("jobs.details.applying")
                    : hasApplied
                    ? t("jobs.details.applied")
                    : t("jobs.details.apply")}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={onSaveJob}
                  className={`min-w-[100px] border-[#1967D2] text-[#1967D2] hover:bg-[#1967D2] hover:text-white ${
                    isSaved ? "bg-[#1967D2] text-white" : ""
                  }`}
                  aria-label={
                    isSaved ? "Remove from saved jobs" : "Save this job"
                  }
                >
                  <Heart
                    className={`h-4 w-4 mr-2 ${isSaved ? "fill-current" : ""}`}
                  />
                  {isSaved ? t("jobs.details.saved") : t("jobs.details.save")}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-8">
          {/* Job Description */}
          <div>
            <h2 className="text-xl font-bold text-[#202124] mb-6">
              {t("jobs.details.jobDescription")}
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-[#696969] leading-relaxed text-base">
                {jobSections.overview}
              </p>
            </div>
          </div>

          {/* Key Responsibilities */}
          {jobSections.responsibilities.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-[#202124] mb-6 font-['Jost']">
                Key Responsibilities
              </h2>
              <div className="space-y-4">
                {jobSections.responsibilities.map((responsibility, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#1967D2] rounded-full mt-2 flex-shrink-0" />
                    <p className="text-[#696969] leading-relaxed text-base font-['Jost']">
                      {responsibility}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills & Experience */}
          {jobSections.requirements.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-[#202124] mb-6">
                {t("jobs.details.skillsExperience")}
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
      </div>
    </Card>
  );
}
