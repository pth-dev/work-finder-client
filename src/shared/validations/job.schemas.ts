import { z } from 'zod'

// Job search schema
export const jobSearchSchema = z.object({
  query: z.string().optional(),
  location: z.string().optional(),
  category: z.string().optional(),
  jobType: z.enum(['full-time', 'part-time', 'contract', 'freelance', 'internship']).optional(),
  experienceLevel: z.enum(['entry', 'mid', 'senior', 'lead', 'executive']).optional(),
  workLocation: z.enum(['on-site', 'remote', 'hybrid']).optional(),
  salaryMin: z.number().min(0, 'Minimum salary must be positive').optional(),
  salaryMax: z.number().min(0, 'Maximum salary must be positive').optional(),
  postedWithin: z.enum(['day', 'week', 'month']).optional(),
  sortBy: z.enum(['relevance', 'date', 'salary', 'company']).optional().default('relevance'),
  page: z.number().min(1).optional().default(1),
  limit: z.number().min(1).max(100).optional().default(20),
})
.refine(
  (data) => !data.salaryMin || !data.salaryMax || data.salaryMin <= data.salaryMax,
  {
    message: 'Minimum salary cannot be greater than maximum salary',
    path: ['salaryMax'],
  }
)

export type JobSearchFormData = z.infer<typeof jobSearchSchema>

// Job application schema
export const jobApplicationSchema = z.object({
  jobId: z.string().min(1, 'Job ID is required'),
  coverLetter: z
    .string()
    .min(100, 'Cover letter must be at least 100 characters')
    .max(2000, 'Cover letter must be less than 2000 characters'),
  resume: z
    .instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, 'Resume file must be less than 5MB')
    .refine(
      (file) => ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type),
      'Resume must be a PDF or Word document'
    ),
  portfolioUrl: z
    .string()
    .url('Please enter a valid URL')
    .optional()
    .or(z.literal('')),
  availableStartDate: z
    .date()
    .min(new Date(), 'Start date cannot be in the past'),
  expectedSalary: z
    .number()
    .min(0, 'Expected salary must be positive')
    .optional(),
  additionalInfo: z
    .string()
    .max(1000, 'Additional information must be less than 1000 characters')
    .optional(),
  agreeToTerms: z
    .boolean()
    .refine((val) => val === true, 'You must agree to the terms and conditions'),
})

export type JobApplicationFormData = z.infer<typeof jobApplicationSchema>

// Job alert schema
export const jobAlertSchema = z.object({
  name: z
    .string()
    .min(1, 'Alert name is required')
    .max(100, 'Alert name must be less than 100 characters'),
  keywords: z
    .string()
    .min(1, 'Keywords are required')
    .max(200, 'Keywords must be less than 200 characters'),
  location: z.string().optional(),
  jobType: z.enum(['full-time', 'part-time', 'contract', 'freelance', 'internship']).optional(),
  experienceLevel: z.enum(['entry', 'mid', 'senior', 'lead', 'executive']).optional(),
  workLocation: z.enum(['on-site', 'remote', 'hybrid']).optional(),
  salaryMin: z.number().min(0, 'Minimum salary must be positive').optional(),
  frequency: z.enum(['daily', 'weekly', 'monthly']).default('weekly'),
  isActive: z.boolean().default(true),
})
.refine(
  (data) => !data.salaryMin || data.salaryMin > 0,
  {
    message: 'Minimum salary must be greater than 0',
    path: ['salaryMin'],
  }
)

export type JobAlertFormData = z.infer<typeof jobAlertSchema>