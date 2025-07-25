import { z } from "zod";
import { 
  requiredStringSchema, 
  optionalStringSchema, 
  documentFileSchema,
  futureDateSchema 
} from "./common";

// Job application validation
export const jobApplicationSchema = z.object({
  jobId: z.number().min(1, "Job ID is required"),
  coverLetter: optionalStringSchema(2000),
  resumeFile: documentFileSchema.optional(),
  portfolioUrl: z.string().url("Invalid portfolio URL").optional().or(z.literal("")),
  expectedSalary: z.number().min(0, "Expected salary must be positive").optional(),
  availableStartDate: futureDateSchema,
  additionalInfo: optionalStringSchema(1000),
  agreedToTerms: z.boolean().refine((val) => val === true, "You must agree to the terms"),
});

export type JobApplicationFormData = z.infer<typeof jobApplicationSchema>;

// Application status update validation (for recruiters)
export const applicationStatusSchema = z.object({
  applicationId: z.number().min(1, "Application ID is required"),
  status: z.enum([
    "pending", 
    "reviewing", 
    "shortlisted", 
    "interview_scheduled", 
    "interviewed", 
    "offer_made", 
    "hired", 
    "rejected"
  ]),
  notes: optionalStringSchema(1000),
  feedback: optionalStringSchema(2000),
  nextSteps: optionalStringSchema(500),
  interviewDate: z.date().optional(),
  interviewType: z.enum(["phone", "video", "in_person", "technical", "panel"]).optional(),
  interviewLocation: optionalStringSchema(200),
  offerAmount: z.number().min(0).optional(),
  offerCurrency: z.enum(["USD", "EUR", "GBP", "VND"]).default("USD"),
  offerDeadline: futureDateSchema,
});

export type ApplicationStatusFormData = z.infer<typeof applicationStatusSchema>;

// Application search/filter validation
export const applicationSearchSchema = z.object({
  keywords: optionalStringSchema(100),
  status: z.array(z.enum([
    "pending", 
    "reviewing", 
    "shortlisted", 
    "interview_scheduled", 
    "interviewed", 
    "offer_made", 
    "hired", 
    "rejected"
  ])).optional(),
  jobTitle: optionalStringSchema(100),
  company: optionalStringSchema(100),
  location: optionalStringSchema(100),
  appliedDateFrom: z.date().optional(),
  appliedDateTo: z.date().optional(),
  salaryMin: z.number().min(0).optional(),
  salaryMax: z.number().min(0).optional(),
  jobType: z.array(z.enum(["full_time", "part_time", "contract", "freelance", "internship", "remote"])).optional(),
  sortBy: z.enum(["applied_date", "status", "company", "job_title", "salary"]).default("applied_date"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export type ApplicationSearchFormData = z.infer<typeof applicationSearchSchema>;

// Bulk application action validation
export const bulkApplicationActionSchema = z.object({
  applicationIds: z.array(z.number().min(1)).min(1, "At least one application must be selected"),
  action: z.enum(["withdraw", "archive", "mark_favorite", "unmark_favorite", "delete"]),
  reason: optionalStringSchema(500), // For withdraw action
});

export type BulkApplicationActionData = z.infer<typeof bulkApplicationActionSchema>;

// Application withdrawal validation
export const applicationWithdrawalSchema = z.object({
  applicationId: z.number().min(1, "Application ID is required"),
  reason: z.enum([
    "found_other_job",
    "not_interested",
    "company_issues",
    "salary_mismatch",
    "location_issues",
    "other"
  ]),
  feedback: optionalStringSchema(1000),
  wouldReapply: z.boolean().default(false),
});

export type ApplicationWithdrawalFormData = z.infer<typeof applicationWithdrawalSchema>;

// Interview scheduling validation
export const interviewSchedulingSchema = z.object({
  applicationId: z.number().min(1, "Application ID is required"),
  interviewType: z.enum(["phone", "video", "in_person", "technical", "panel"]),
  scheduledDate: z.date(),
  duration: z.number().min(15, "Duration must be at least 15 minutes").max(480, "Duration cannot exceed 8 hours"),
  location: optionalStringSchema(200), // For in-person interviews
  meetingLink: z.string().url("Invalid meeting link").optional().or(z.literal("")), // For video interviews
  interviewerName: requiredStringSchema("Interviewer name"),
  interviewerEmail: z.string().email("Invalid interviewer email"),
  instructions: optionalStringSchema(1000),
  requiresPreparation: z.boolean().default(false),
  preparationMaterials: optionalStringSchema(500),
});

export type InterviewSchedulingFormData = z.infer<typeof interviewSchedulingSchema>;

// Interview feedback validation
export const interviewFeedbackSchema = z.object({
  applicationId: z.number().min(1, "Application ID is required"),
  interviewId: z.number().min(1, "Interview ID is required"),
  overallRating: z.number().min(1, "Rating must be at least 1").max(5, "Rating must be at most 5"),
  technicalSkills: z.number().min(1).max(5).optional(),
  communication: z.number().min(1).max(5).optional(),
  problemSolving: z.number().min(1).max(5).optional(),
  culturalFit: z.number().min(1).max(5).optional(),
  experience: z.number().min(1).max(5).optional(),
  strengths: optionalStringSchema(1000),
  weaknesses: optionalStringSchema(1000),
  notes: optionalStringSchema(2000),
  recommendation: z.enum(["strong_hire", "hire", "no_hire", "strong_no_hire"]),
  nextRound: z.boolean().default(false),
  nextRoundType: z.enum(["phone", "video", "in_person", "technical", "panel"]).optional(),
});

export type InterviewFeedbackFormData = z.infer<typeof interviewFeedbackSchema>;
