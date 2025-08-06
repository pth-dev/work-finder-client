import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Calendar, Clock, MapPin, Briefcase, DollarSign } from "lucide-react";
import { type Job } from "@/types";
import { formatSalary } from "@/utils/common";
import { JobSection } from "./JobSection";

interface JobOverviewProps {
  job: Job;
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

export function JobOverview({ job }: JobOverviewProps) {
  const { t } = useTranslation();

  const jobOverviewItems = useMemo(
    () => [
      {
        label: "Date Posted",
        value: new Date(job.postedAt).toLocaleDateString(),
        icon: <Calendar className="h-4 w-4 text-muted-foreground" />,
      },
      {
        label: "Expiration Date",
        value: job.expiresAt
          ? new Date(job.expiresAt).toLocaleDateString()
          : "Not specified",
        icon: <Clock className="h-4 w-4 text-muted-foreground" />,
      },
      {
        label: "Location",
        value: job.location.isRemote
          ? "Remote"
          : `${job.location.city}, ${job.location.country}`,
        icon: <MapPin className="h-4 w-4 text-muted-foreground" />,
      },
      {
        label: "Job Type",
        value: job.type.replace("_", " ").toUpperCase(),
        icon: <Briefcase className="h-4 w-4 text-muted-foreground" />,
      },
      {
        label: "Salary",
        value: formatJobSalary(job),
        icon: <DollarSign className="h-4 w-4 text-muted-foreground" />,
      },
    ],
    [job, t]
  );

  return (
    <JobSection title="Job Overview">
      <div className="space-y-4">
        {jobOverviewItems.map((item, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="p-2 bg-[#F5F7FC] rounded-lg">{item.icon}</div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-[#202124] mb-1 font-['Jost']">
                {item.label}
              </p>
              <p className="text-sm text-[#696969] font-['Jost']">
                {item.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </JobSection>
  );
}
