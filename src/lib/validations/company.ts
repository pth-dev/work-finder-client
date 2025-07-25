import { z } from "zod";
import { 
  requiredStringSchema, 
  optionalStringSchema, 
  urlSchema, 
  emailSchema,
  phoneSchema,
  imageFileSchema 
} from "./common";

// Company profile validation
export const companyProfileSchema = z.object({
  name: requiredStringSchema("Company name", 2)
    .max(100, "Company name must be less than 100 characters"),
  description: requiredStringSchema("Company description", 50)
    .max(2000, "Company description must be less than 2000 characters"),
  industry: requiredStringSchema("Industry"),
  companySize: z.enum(["startup", "small", "medium", "large", "enterprise"]),
  companyType: z.enum(["public", "private", "nonprofit", "government"]),
  foundedYear: z.number()
    .min(1800, "Founded year must be after 1800")
    .max(new Date().getFullYear(), "Founded year cannot be in the future")
    .optional(),
  headquarters: optionalStringSchema(200),
  website: urlSchema,
  email: emailSchema.optional(),
  phone: phoneSchema,
  linkedIn: urlSchema,
  twitter: urlSchema,
  facebook: urlSchema,
  instagram: urlSchema,
  benefits: z.array(z.string()).optional(),
  culture: optionalStringSchema(1000),
  mission: optionalStringSchema(500),
  vision: optionalStringSchema(500),
  values: z.array(z.string()).optional(),
});

export type CompanyProfileFormData = z.infer<typeof companyProfileSchema>;

// Company logo upload validation
export const companyLogoSchema = z.object({
  logo: imageFileSchema,
});

export type CompanyLogoData = z.infer<typeof companyLogoSchema>;

// Company search validation
export const companySearchSchema = z.object({
  keywords: optionalStringSchema(100),
  location: optionalStringSchema(100),
  industry: z.string().optional(),
  companySize: z.enum(["startup", "small", "medium", "large", "enterprise"]).optional(),
  companyType: z.enum(["public", "private", "nonprofit", "government"]).optional(),
  sortBy: z.enum(["relevance", "name", "size", "founded"]).default("relevance"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export type CompanySearchFormData = z.infer<typeof companySearchSchema>;

// Company follow validation
export const companyFollowSchema = z.object({
  companyId: z.number().min(1, "Company ID is required"),
  notifications: z.boolean().default(true),
});

export type CompanyFollowData = z.infer<typeof companyFollowSchema>;

// Company review validation
export const companyReviewSchema = z.object({
  companyId: z.number().min(1, "Company ID is required"),
  rating: z.number().min(1, "Rating must be at least 1").max(5, "Rating must be at most 5"),
  title: requiredStringSchema("Review title", 5)
    .max(100, "Review title must be less than 100 characters"),
  pros: requiredStringSchema("Pros", 10)
    .max(1000, "Pros must be less than 1000 characters"),
  cons: requiredStringSchema("Cons", 10)
    .max(1000, "Cons must be less than 1000 characters"),
  advice: optionalStringSchema(1000),
  workLifeBalance: z.number().min(1).max(5).optional(),
  culture: z.number().min(1).max(5).optional(),
  careerOpportunities: z.number().min(1).max(5).optional(),
  compensation: z.number().min(1).max(5).optional(),
  management: z.number().min(1).max(5).optional(),
  isCurrentEmployee: z.boolean().default(false),
  jobTitle: optionalStringSchema(100),
  department: optionalStringSchema(100),
  employmentStatus: z.enum(["full_time", "part_time", "contract", "intern", "former"]).optional(),
  yearsAtCompany: z.number().min(0).max(50).optional(),
  wouldRecommend: z.boolean().optional(),
  allowsCEOApproval: z.boolean().default(true),
});

export type CompanyReviewFormData = z.infer<typeof companyReviewSchema>;

// Company job posting validation
export const companyJobPostingSchema = z.object({
  companyId: z.number().min(1, "Company ID is required"),
  title: requiredStringSchema("Job title", 5)
    .max(200, "Job title must be less than 200 characters"),
  department: optionalStringSchema(100),
  location: requiredStringSchema("Location"),
  jobType: z.enum(["full_time", "part_time", "contract", "freelance", "internship", "remote"]),
  experienceLevel: z.enum(["entry", "junior", "mid", "senior", "lead", "executive"]),
  salaryMin: z.number().min(0).optional(),
  salaryMax: z.number().min(0).optional(),
  salaryCurrency: z.enum(["USD", "EUR", "GBP", "VND"]).default("USD"),
  isRemote: z.boolean().default(false),
  isUrgent: z.boolean().default(false),
  applicationDeadline: z.date().optional(),
});

export type CompanyJobPostingFormData = z.infer<typeof companyJobPostingSchema>;
