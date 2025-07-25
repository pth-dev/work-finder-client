import { z } from "zod";
import { 
  emailSchema, 
  phoneSchema, 
  urlSchema, 
  requiredStringSchema, 
  optionalStringSchema,
  imageFileSchema,
  documentFileSchema 
} from "./common";

// Profile form validation
export const profileSchema = z.object({
  username: requiredStringSchema("Username", 3)
    .max(50, "Username must be less than 50 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
  fullName: requiredStringSchema("Full name", 2)
    .max(100, "Full name must be less than 100 characters"),
  email: emailSchema,
  phone: phoneSchema,
  address: optionalStringSchema(200),
  bio: optionalStringSchema(500),
  website: urlSchema,
  linkedIn: urlSchema,
  github: urlSchema,
  twitter: urlSchema,
  location: optionalStringSchema(100),
  jobTitle: optionalStringSchema(100),
  company: optionalStringSchema(100),
  experience: z.enum(["entry", "junior", "mid", "senior", "lead", "executive"]).optional(),
  skills: z.array(z.string()).optional(),
  languages: z.array(z.string()).optional(),
  availability: z.enum(["available", "not_available", "open_to_offers"]).optional(),
});

export type ProfileFormData = z.infer<typeof profileSchema>;

// Avatar upload validation
export const avatarUploadSchema = z.object({
  avatar: imageFileSchema,
});

export type AvatarUploadData = z.infer<typeof avatarUploadSchema>;

// Resume upload validation
export const resumeUploadSchema = z.object({
  resume: documentFileSchema,
});

export type ResumeUploadData = z.infer<typeof resumeUploadSchema>;

// Education form validation
export const educationSchema = z.object({
  institution: requiredStringSchema("Institution name"),
  degree: requiredStringSchema("Degree"),
  fieldOfStudy: requiredStringSchema("Field of study"),
  startDate: z.date(),
  endDate: z.date().optional(),
  isCurrentlyStudying: z.boolean().default(false),
  description: optionalStringSchema(500),
  gpa: z.string().optional(),
});

export type EducationFormData = z.infer<typeof educationSchema>;

// Experience form validation
export const experienceSchema = z.object({
  company: requiredStringSchema("Company name"),
  position: requiredStringSchema("Position"),
  location: optionalStringSchema(100),
  startDate: z.date(),
  endDate: z.date().optional(),
  isCurrentlyWorking: z.boolean().default(false),
  description: optionalStringSchema(1000),
  achievements: z.array(z.string()).optional(),
});

export type ExperienceFormData = z.infer<typeof experienceSchema>;

// Skills form validation
export const skillsSchema = z.object({
  skills: z.array(z.object({
    name: requiredStringSchema("Skill name"),
    level: z.enum(["beginner", "intermediate", "advanced", "expert"]),
    category: z.string().optional(),
  })).min(1, "At least one skill is required"),
});

export type SkillsFormData = z.infer<typeof skillsSchema>;
