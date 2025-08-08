import { useNavigate } from "react-router";
import { ApiJobPost } from "@/features/jobs/types";
import { useJobManagement } from "../hooks";
import { JobManagementHeader } from "./JobManagementHeader";
import { JobListCard } from "./JobListCard";

import { paths } from "@/config/paths";

export function JobManagement() {
  const { jobs, loading, handleDeleteJob } = useJobManagement();
  const navigate = useNavigate();

  const handleCreateJob = () => {
    navigate(paths.recruiter.createJob.getHref());
  };

  const handleEditJob = (job: ApiJobPost) => {
    // Navigate to job detail page in edit mode
    navigate(paths.recruiter.jobDetail.getHref(job.job_id));
  };

  const handleJobClick = (job: ApiJobPost) => {
    // Navigate to job detail page in view mode
    navigate(paths.recruiter.jobDetail.getHref(job.job_id));
  };

  return (
    <div className="space-y-8">
      <JobManagementHeader onCreateJob={handleCreateJob} />
      <JobListCard
        jobs={jobs}
        loading={loading}
        onCreateJob={handleCreateJob}
        onEditJob={handleEditJob}
        onDeleteJob={handleDeleteJob}
        onJobClick={handleJobClick}
      />
    </div>
  );
}
