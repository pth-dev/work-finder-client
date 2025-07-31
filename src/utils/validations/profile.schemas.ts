import { z } from 'zod'

// User profile schema
export const profileSchema = z.object({
  firstName: z
    .string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'First name can only contain letters and spaces'),
  lastName: z
    .string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Last name can only contain letters and spaces'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  phoneNumber: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^\+?[1-9]\d{1,14}$/.test(val),
      'Please enter a valid phone number'
    ),
  bio: z
    .string()
    .max(500, 'Bio must be less than 500 characters')
    .optional(),
  location: z.object({
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    country: z.string().min(1, 'Country is required'),
  }),
  website: z
    .string()
    .url('Please enter a valid URL')
    .optional()
    .or(z.literal('')),
  linkedinUrl: z
    .string()
    .url('Please enter a valid LinkedIn URL')
    .optional()
    .or(z.literal('')),
  githubUrl: z
    .string()
    .url('Please enter a valid GitHub URL')
    .optional()
    .or(z.literal('')),
  avatar: z
    .instanceof(File)
    .refine((file) => file.size <= 2 * 1024 * 1024, 'Avatar file must be less than 2MB')
    .refine(
      (file) => ['image/jpeg', 'image/png', 'image/webp'].includes(file.type),
      'Avatar must be a JPEG, PNG, or WebP image'
    )
    .optional(),
})

export type ProfileFormData = z.infer<typeof profileSchema>

// Experience schema
export const experienceSchema = z.object({
  title: z
    .string()
    .min(1, 'Job title is required')
    .max(100, 'Job title must be less than 100 characters'),
  company: z
    .string()
    .min(1, 'Company name is required')
    .max(100, 'Company name must be less than 100 characters'),
  location: z
    .string()
    .min(1, 'Location is required')
    .max(100, 'Location must be less than 100 characters'),
  startDate: z.date({
    message: 'Start date is required',
  }),
  endDate: z.date().optional(),
  isCurrentJob: z.boolean().default(false),
  description: z
    .string()
    .min(50, 'Description must be at least 50 characters')
    .max(1000, 'Description must be less than 1000 characters'),
  skills: z
    .array(z.string())
    .min(1, 'At least one skill is required')
    .max(10, 'Maximum 10 skills allowed'),
})
.refine(
  (data) => data.isCurrentJob || data.endDate,
  {
    message: 'End date is required unless this is your current job',
    path: ['endDate'],
  }
)
.refine(
  (data) => !data.endDate || data.startDate <= data.endDate,
  {
    message: 'End date cannot be before start date',
    path: ['endDate'],
  }
)

export type ExperienceFormData = z.infer<typeof experienceSchema>

// Education schema
export const educationSchema = z.object({
  institution: z
    .string()
    .min(1, 'Institution name is required')
    .max(100, 'Institution name must be less than 100 characters'),
  degree: z
    .string()
    .min(1, 'Degree is required')
    .max(100, 'Degree must be less than 100 characters'),
  fieldOfStudy: z
    .string()
    .min(1, 'Field of study is required')
    .max(100, 'Field of study must be less than 100 characters'),
  startDate: z.date({
    message: 'Start date is required',
  }),
  endDate: z.date().optional(),
  isCurrentlyStudying: z.boolean().default(false),
  gpa: z
    .number()
    .min(0, 'GPA cannot be negative')
    .max(4, 'GPA cannot exceed 4.0')
    .optional(),
  description: z
    .string()
    .max(500, 'Description must be less than 500 characters')
    .optional(),
})
.refine(
  (data) => data.isCurrentlyStudying || data.endDate,
  {
    message: 'End date is required unless you are currently studying',
    path: ['endDate'],
  }
)
.refine(
  (data) => !data.endDate || data.startDate <= data.endDate,
  {
    message: 'End date cannot be before start date',
    path: ['endDate'],
  }
)

export type EducationFormData = z.infer<typeof educationSchema>

// Skills schema
export const skillsSchema = z.object({
  skills: z
    .array(
      z.object({
        name: z.string().min(1, 'Skill name is required'),
        level: z.enum(['beginner', 'intermediate', 'advanced', 'expert']),
        yearsOfExperience: z
          .number()
          .min(0, 'Years of experience cannot be negative')
          .max(50, 'Years of experience seems too high')
          .optional(),
      })
    )
    .min(1, 'At least one skill is required')
    .max(20, 'Maximum 20 skills allowed'),
})

export type SkillsFormData = z.infer<typeof skillsSchema>