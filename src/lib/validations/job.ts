import { z } from "zod";
import { requiredStringSchema, optionalStringSchema, futureDateSchema } from "./common";

// Job application form validation
export const jobApplicationSchema = z.object({
  jobId: z.number().min(1, "Job ID is required"),
  coverLetter: optionalStringSchema(2000),
  resumeUrl: z.string().url("Invalid resume URL").optional(),
  portfolioUrl: z.string().url("Invalid portfolio URL").optional(),
  expectedSalary: z.number().min(0, "Expected salary must be positive").optional(),
  availableStartDate: futureDateSchema,
  additionalInfo: optionalStringSchema(1000),
});

export type JobApplicationFormData = z.infer<typeof jobApplicationSchema>;

// Job posting form validation (for recruiters)
export const jobPostingSchema = z.object({
  title: requiredStringSchema("Job title", 5)
    .max(200, "Job title must be less than 200 characters"),
  description: requiredStringSchema("Job description", 50)
    .max(5000, "Job description must be less than 5000 characters"),
  requirements: z.array(z.string()).min(1, "At least one requirement is required"),
  responsibilities: z.array(z.string()).min(1, "At least one responsibility is required"),
  benefits: z.array(z.string()).optional(),
  
  // Job details
  jobType: z.enum(["full_time", "part_time", "contract", "freelance", "internship", "remote"]),
  experienceLevel: z.enum(["entry", "junior", "mid", "senior", "lead", "executive"]),
  location: requiredStringSchema("Location"),
  remoteWork: z.enum(["remote_only", "hybrid", "on_site"]).default("on_site"),
  
  // Salary information
  salaryMin: z.number().min(0, "Minimum salary must be positive").optional(),
  salaryMax: z.number().min(0, "Maximum salary must be positive").optional(),
  salaryCurrency: z.enum(["USD", "EUR", "GBP", "VND"]).default("USD"),
  salaryPeriod: z.enum(["hourly", "monthly", "yearly"]).default("yearly"),
  
  // Skills and qualifications
  requiredSkills: z.array(z.string()).min(1, "At least one required skill is needed"),
  preferredSkills: z.array(z.string()).optional(),
  education: z.enum(["high_school", "associate", "bachelor", "master", "phd", "none"]).optional(),
  
  // Application settings
  applicationDeadline: futureDateSchema,
  maxApplications: z.number().min(1, "Maximum applications must be at least 1").optional(),
  
  // Company information
  companyId: z.number().min(1, "Company ID is required"),
  
  // Additional settings
  isUrgent: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
  tags: z.array(z.string()).optional(),
}).refine((data) => {
  if (data.salaryMin && data.salaryMax) {
    return data.salaryMin <= data.salaryMax;
  }
  return true;
}, {
  message: "Minimum salary cannot be greater than maximum salary",
  path: ["salaryMax"],
});

export type JobPostingFormData = z.infer<typeof jobPostingSchema>;

// Job bookmark/save validation
export const jobBookmarkSchema = z.object({
  jobId: z.number().min(1, "Job ID is required"),
  notes: optionalStringSchema(500),
  tags: z.array(z.string()).optional(),
});

export type JobBookmarkFormData = z.infer<typeof jobBookmarkSchema>;

// Job alert form validation
export const jobAlertSchema = z.object({
  name: requiredStringSchema("Alert name")
    .max(100, "Alert name must be less than 100 characters"),
  keywords: optionalStringSchema(100),
  location: optionalStringSchema(100),
  jobType: z.array(z.enum(["full_time", "part_time", "contract", "freelance", "internship", "remote"])).optional(),
  experienceLevel: z.array(z.enum(["entry", "junior", "mid", "senior", "lead", "executive"])).optional(),
  salaryMin: z.number().min(0).optional(),
  salaryMax: z.number().min(0).optional(),
  frequency: z.enum(["daily", "weekly", "monthly"]).default("weekly"),
  isActive: z.boolean().default(true),
}).refine((data) => {
  if (data.salaryMin && data.salaryMax) {
    return data.salaryMin <= data.salaryMax;
  }
  return true;
}, {
  message: "Minimum salary cannot be greater than maximum salary",
  path: ["salaryMax"],
});

export type JobAlertFormData = z.infer<typeof jobAlertSchema>;
