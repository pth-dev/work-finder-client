import { z } from "zod";

// Common validation patterns
export const emailSchema = z
  .string()
  .min(1, "Email is required")
  .email("Invalid email address");

export const passwordSchema = z
  .string()
  .min(6, "Password must be at least 6 characters")
  .max(100, "Password must be less than 100 characters");

export const phoneSchema = z
  .string()
  .regex(/^(\+?[1-9]\d{1,14}|0\d{9,10})$/, "Invalid phone number format")
  .optional()
  .or(z.literal(""));

export const urlSchema = z
  .string()
  .url("Invalid URL format")
  .optional()
  .or(z.literal(""));

export const requiredStringSchema = (fieldName: string, minLength = 1) =>
  z.string().min(minLength, `${fieldName} is required`).trim();

export const optionalStringSchema = (maxLength?: number) => {
  let schema = z.string().optional();
  if (maxLength) {
    schema = schema.refine(
      (val) => !val || val.length <= maxLength,
      `Must be less than ${maxLength} characters`
    );
  }
  return schema;
};

// File validation schemas
export const imageFileSchema = z
  .instanceof(File)
  .refine(
    (file) => file.size <= 5 * 1024 * 1024,
    "File size must be less than 5MB"
  )
  .refine(
    (file) =>
      ["image/jpeg", "image/png", "image/gif", "image/webp"].includes(
        file.type
      ),
    "Only JPEG, PNG, GIF, and WebP images are allowed"
  );

export const documentFileSchema = z
  .instanceof(File)
  .refine(
    (file) => file.size <= 10 * 1024 * 1024,
    "File size must be less than 10MB"
  )
  .refine(
    (file) =>
      [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ].includes(file.type),
    "Only PDF and Word documents are allowed"
  );

// Date validation schemas
export const dateSchema = z.date().optional();

export const futureDateSchema = z
  .date()
  .refine((date) => date > new Date(), "Date must be in the future")
  .optional();

export const pastDateSchema = z
  .date()
  .refine((date) => date < new Date(), "Date must be in the past")
  .optional();
