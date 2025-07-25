import { z } from "zod";
import { optionalStringSchema } from "./common";

// Simple job search form validation
export const jobSearchSchema = z.object({
  keywords: optionalStringSchema(100),
  location: optionalStringSchema(100),
});

export type JobSearchFormData = z.infer<typeof jobSearchSchema>;

// Advanced job search form validation
export const advancedJobSearchSchema = z
  .object({
    keywords: optionalStringSchema(100),
    location: optionalStringSchema(100),
    category: z.string().optional(),
    jobType: z
      .enum([
        "full_time",
        "part_time",
        "contract",
        "freelance",
        "internship",
        "remote",
      ])
      .optional(),
    experienceLevel: z
      .enum(["entry", "junior", "mid", "senior", "lead", "executive"])
      .optional(),
    salaryMin: z.number().min(0, "Minimum salary must be positive").optional(),
    salaryMax: z.number().min(0, "Maximum salary must be positive").optional(),
    postedDate: z
      .enum(["last24h", "last7days", "last30days", "all"])
      .default("all"),
    companyType: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    sortBy: z
      .enum(["relevance", "date", "salary", "company"])
      .default("relevance"),
    sortOrder: z.enum(["asc", "desc"]).default("desc"),
  })
  .refine(
    (data) => {
      if (data.salaryMin && data.salaryMax) {
        return data.salaryMin <= data.salaryMax;
      }
      return true;
    },
    {
      message: "Minimum salary cannot be greater than maximum salary",
      path: ["salaryMax"],
    }
  );

export type AdvancedJobSearchFormData = z.infer<typeof advancedJobSearchSchema>;

// Company search form validation
export const companySearchSchema = z.object({
  keywords: optionalStringSchema(100),
  location: optionalStringSchema(100),
  industry: z.string().optional(),
  companySize: z
    .enum(["startup", "small", "medium", "large", "enterprise"])
    .optional(),
  companyType: z
    .enum(["public", "private", "nonprofit", "government"])
    .optional(),
  sortBy: z.enum(["relevance", "name", "size", "founded"]).default("relevance"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export type CompanySearchFormData = z.infer<typeof companySearchSchema>;

// Advanced search filters validation
export const advancedSearchSchema = z
  .object({
    // Basic search
    keywords: optionalStringSchema(100),
    location: optionalStringSchema(100),

    // Job details
    jobType: z
      .array(
        z.enum([
          "full_time",
          "part_time",
          "contract",
          "freelance",
          "internship",
          "remote",
        ])
      )
      .optional(),
    experienceLevel: z
      .array(z.enum(["entry", "junior", "mid", "senior", "lead", "executive"]))
      .optional(),

    // Salary range
    salaryMin: z.number().min(0).optional(),
    salaryMax: z.number().min(0).optional(),
    salaryCurrency: z.enum(["USD", "EUR", "GBP", "VND"]).default("USD"),

    // Company filters
    companySize: z
      .array(z.enum(["startup", "small", "medium", "large", "enterprise"]))
      .optional(),
    industry: z.array(z.string()).optional(),

    // Date filters
    postedDate: z
      .enum(["last24h", "last7days", "last30days", "all"])
      .default("all"),

    // Skills and requirements
    requiredSkills: z.array(z.string()).optional(),
    preferredSkills: z.array(z.string()).optional(),

    // Work arrangement
    remoteWork: z.enum(["remote_only", "hybrid", "on_site", "any"]).optional(),

    // Benefits
    benefits: z.array(z.string()).optional(),

    // Sorting
    sortBy: z
      .enum(["relevance", "date", "salary", "company", "location"])
      .default("relevance"),
    sortOrder: z.enum(["asc", "desc"]).default("desc"),
  })
  .refine(
    (data) => {
      if (data.salaryMin && data.salaryMax) {
        return data.salaryMin <= data.salaryMax;
      }
      return true;
    },
    {
      message: "Minimum salary cannot be greater than maximum salary",
      path: ["salaryMax"],
    }
  );

export type AdvancedSearchFormData = z.infer<typeof advancedSearchSchema>;
