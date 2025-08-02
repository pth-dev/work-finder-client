import { z } from "zod";
import { TFunction } from "react-i18next";
import { getValidationError, getFieldLabel } from "@/i18n/helpers";

/**
 * I18n-aware Zod schema factories for reusable validation patterns
 */

// Common field schema factories
export const createEmailSchema = (t: TFunction) =>
  z
    .string()
    .min(
      1,
      getValidationError(t, "required", { field: getFieldLabel(t, "email") })
    )
    .email(
      getValidationError(t, "email", { field: getFieldLabel(t, "email") })
    );

export const createPasswordSchema = (t: TFunction, minLength: number = 8) =>
  z
    .string()
    .min(
      1,
      getValidationError(t, "required", { field: getFieldLabel(t, "password") })
    )
    .min(
      minLength,
      getValidationError(t, "minLength", {
        field: getFieldLabel(t, "password"),
        min: minLength,
      })
    )
    .regex(
      /[A-Z]/,
      getValidationError(t, "passwordStrength.uppercase", {
        field: getFieldLabel(t, "password"),
      })
    )
    .regex(
      /[a-z]/,
      getValidationError(t, "passwordStrength.lowercase", {
        field: getFieldLabel(t, "password"),
      })
    )
    .regex(
      /[0-9]/,
      getValidationError(t, "passwordStrength.number", {
        field: getFieldLabel(t, "password"),
      })
    )
    .regex(
      /[^A-Za-z0-9]/,
      getValidationError(t, "passwordStrength.special", {
        field: getFieldLabel(t, "password"),
      })
    );

export const createSimplePasswordSchema = (
  t: TFunction,
  minLength: number = 6,
  fieldKey: string = "password"
) =>
  z
    .string()
    .min(
      1,
      getValidationError(t, "required", { field: getFieldLabel(t, fieldKey) })
    )
    .min(
      minLength,
      getValidationError(t, "minLength", {
        field: getFieldLabel(t, fieldKey),
        min: minLength,
      })
    );

export const createNameSchema = (
  t: TFunction,
  fieldKey: string,
  minLength: number = 2,
  maxLength: number = 50
) =>
  z
    .string()
    .min(
      1,
      getValidationError(t, "required", { field: getFieldLabel(t, fieldKey) })
    )
    .min(
      minLength,
      getValidationError(t, "minLength", {
        field: getFieldLabel(t, fieldKey),
        min: minLength,
      })
    )
    .max(
      maxLength,
      getValidationError(t, "maxLength", {
        field: getFieldLabel(t, fieldKey),
        max: maxLength,
      })
    )
    .regex(
      /^[a-zA-ZÀ-ỹ\s]+$/,
      getValidationError(t, "nameFormat", { field: getFieldLabel(t, fieldKey) })
    );

export const createPhoneSchema = (t: TFunction) =>
  z
    .string()
    .optional()
    .refine(
      (val) => !val || /^\+?[1-9]\d{1,14}$/.test(val),
      getValidationError(t, "phoneNumber", {
        field: getFieldLabel(t, "phoneNumber"),
      })
    );

export const createUrlSchema = (
  t: TFunction,
  fieldKey: string,
  required: boolean = false
) => {
  const baseSchema = z.string();

  if (required) {
    return baseSchema
      .min(
        1,
        getValidationError(t, "required", { field: getFieldLabel(t, fieldKey) })
      )
      .url(getValidationError(t, "url", { field: getFieldLabel(t, fieldKey) }));
  }

  return baseSchema
    .optional()
    .refine(
      (val) => !val || val === "" || z.string().url().safeParse(val).success,
      getValidationError(t, "url", { field: getFieldLabel(t, fieldKey) })
    );
};

export const createFileSchema = (
  t: TFunction,
  fieldKey: string,
  maxSizeMB: number,
  allowedTypes: string[]
) =>
  z
    .instanceof(File)
    .refine(
      (file) => file.size <= maxSizeMB * 1024 * 1024,
      getValidationError(t, "fileSize", {
        field: getFieldLabel(t, fieldKey),
        size: maxSizeMB,
      })
    )
    .refine(
      (file) => allowedTypes.includes(file.type),
      getValidationError(t, "fileType", {
        field: getFieldLabel(t, fieldKey),
        types: allowedTypes.join(", "),
      })
    );

export const createDateSchema = (
  t: TFunction,
  fieldKey: string,
  options?: {
    required?: boolean;
    minDate?: Date;
    maxDate?: Date;
  }
) => {
  const { required = true, minDate, maxDate } = options || {};

  let schema = z.date({
    message: getValidationError(t, "required", {
      field: getFieldLabel(t, fieldKey),
    }),
  });

  if (!required) {
    schema = schema.optional();
  }

  if (minDate) {
    schema = schema.refine(
      (date) => !date || date >= minDate,
      getValidationError(t, "dateInPast", { field: getFieldLabel(t, fieldKey) })
    );
  }

  if (maxDate) {
    schema = schema.refine(
      (date) => !date || date <= maxDate,
      getValidationError(t, "dateInFuture", {
        field: getFieldLabel(t, fieldKey),
      })
    );
  }

  return schema;
};

export const createNumberSchema = (
  t: TFunction,
  fieldKey: string,
  options?: {
    required?: boolean;
    min?: number;
    max?: number;
    positive?: boolean;
  }
) => {
  const { required = true, min, max, positive = false } = options || {};

  let schema = z.number({
    message: getValidationError(t, "required", {
      field: getFieldLabel(t, fieldKey),
    }),
  });

  if (!required) {
    schema = schema.optional();
  }

  if (positive) {
    schema = schema.min(
      0,
      getValidationError(t, "positive", { field: getFieldLabel(t, fieldKey) })
    );
  }

  if (min !== undefined) {
    schema = schema.min(
      min,
      getValidationError(t, "minLength", {
        field: getFieldLabel(t, fieldKey),
        min,
      })
    );
  }

  if (max !== undefined) {
    schema = schema.max(
      max,
      getValidationError(t, "maxLength", {
        field: getFieldLabel(t, fieldKey),
        max,
      })
    );
  }

  return schema;
};

export const createTextSchema = (
  t: TFunction,
  fieldKey: string,
  options?: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
  }
) => {
  const { required = true, minLength, maxLength } = options || {};

  let schema = z.string();

  if (required) {
    schema = schema.min(
      1,
      getValidationError(t, "required", { field: getFieldLabel(t, fieldKey) })
    );
  } else {
    schema = schema.optional();
  }

  if (minLength !== undefined) {
    schema = schema.min(
      minLength,
      getValidationError(t, "minLength", {
        field: getFieldLabel(t, fieldKey),
        min: minLength,
      })
    );
  }

  if (maxLength !== undefined) {
    schema = schema.max(
      maxLength,
      getValidationError(t, "maxLength", {
        field: getFieldLabel(t, fieldKey),
        max: maxLength,
      })
    );
  }

  return schema;
};

export const createBooleanSchema = (
  t: TFunction,
  fieldKey: string,
  mustBeTrue: boolean = false
) => {
  let schema = z.boolean();

  if (mustBeTrue) {
    schema = schema.refine(
      (val) => val === true,
      getValidationError(t, "termsAccepted", {
        field: getFieldLabel(t, fieldKey),
      })
    );
  }

  return schema;
};

// Complex validation refinements
export const createPasswordConfirmationRefine = (
  t: TFunction,
  passwordField: string = "password",
  confirmField: string = "confirmPassword"
) => ({
  message: getValidationError(t, "passwordMismatch", {
    field: getFieldLabel(t, confirmField),
  }),
  path: [confirmField] as const,
});

export const createDateRangeRefine = (
  t: TFunction,
  startField: string,
  endField: string
) => ({
  message: getValidationError(t, "startBeforeEnd", {
    field: getFieldLabel(t, endField),
    startField: getFieldLabel(t, startField),
  }),
  path: [endField] as const,
});

export const createSalaryRangeRefine = (t: TFunction) => ({
  message: getValidationError(t, "salaryRange", { field: "" }),
  path: ["salaryMax"] as const,
});

// Conditional field refinements
export const createConditionalRequiredRefine = (
  t: TFunction,
  fieldKey: string,
  conditionField: string,
  conditionValue: any,
  errorType: "currentJobRequired" | "currentStudyRequired"
) => ({
  message: getValidationError(t, errorType, {
    field: getFieldLabel(t, fieldKey),
  }),
  path: [fieldKey] as const,
});
