// Re-export job types from the main jobs feature
export * from "@/features/jobs/types";

// Additional types specific to job management
export interface JobManagementFilters {
  search?: string;
  status?: "active" | "closed" | "draft";
  job_type?: "full_time" | "part_time" | "contract" | "internship" | "temporary" | "freelance";
  page?: number;
  limit?: number;
}

export interface JobTableAction {
  type: "edit" | "delete" | "view" | "toggle_status";
  jobId: number;
}