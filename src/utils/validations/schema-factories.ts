import { z } from "zod";
import { TFunction } from "i18next";
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
      getValidationError(t, "strongPassword" as any, {
        field: getFieldLabel(t, "password" as any),
      })
    )
    .regex(
      /[a-z]/,
      getValidationError(t, "strongPassword" as any, {
        field: getFieldLabel(t, "password" as any),
      })
    )
    .regex(
      /[0-9]/,
      getValidationError(t, "strongPassword" as any, {
        field: getFieldLabel(t, "password" as any),
      })
    )
    .regex(
      /[^A-Za-z0-9]/,
      getValidationError(t, "strongPassword" as any, {
        field: getFieldLabel(t, "password" as any),
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
      getValidationError(t, "required", {
        field: getFieldLabel(t, fieldKey as any),
      })
    )
    .min(
      minLength,
      getValidationError(t, "minLength", {
        field: getFieldLabel(t, fieldKey as any),
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
      getValidationError(t, "required", {
        field: getFieldLabel(t, fieldKey as any),
      })
    )
    .min(
      minLength,
      getValidationError(t, "minLength", {
        field: getFieldLabel(t, fieldKey as any),
        min: minLength,
      })
    )
    .max(
      maxLength,
      getValidationError(t, "maxLength", {
        field: getFieldLabel(t, fieldKey as any),
        max: maxLength,
      })
    )
    .regex(
      /^[a-zA-ZÀ-ỹ\s]+$/,
      getValidationError(t, "nameFormat", {
        field: getFieldLabel(t, fieldKey as any),
      })
    );

export const createPhoneSchema = (t: TFunction) =>
  z
    .string()
    .optional()
    .refine(
      (val) => !val || /^\+?[1-9]\d{1,14}$/.test(val),
      getValidationError(t, "phoneNumber", {
        field: getFieldLabel(t, "phoneNumber" as any),
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
        getValidationError(t, "required", {
          field: getFieldLabel(t, fieldKey as any),
        })
      )
      .url(
        getValidationError(t, "url", {
          field: getFieldLabel(t, fieldKey as any),
        })
      );
  }

  return baseSchema
    .optional()
    .refine(
      (val) => !val || val === "" || z.string().url().safeParse(val).success,
      getValidationError(t, "url", { field: getFieldLabel(t, fieldKey as any) })
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
        field: getFieldLabel(t, fieldKey as any),
        size: maxSizeMB,
      })
    )
    .refine(
      (file) => allowedTypes.includes(file.type),
      getValidationError(t, "fileType", {
        field: getFieldLabel(t, fieldKey as any),
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
      field: getFieldLabel(t, fieldKey as any),
    }),
  });

  if (!required) {
    schema = schema.optional() as any;
  }

  if (minDate) {
    schema = schema.refine(
      (date) => !date || date >= minDate,
      getValidationError(t, "dateInPast", {
        field: getFieldLabel(t, fieldKey as any),
      })
    );
  }

  if (maxDate) {
    schema = schema.refine(
      (date) => !date || date <= maxDate,
      getValidationError(t, "dateInFuture", {
        field: getFieldLabel(t, fieldKey as any),
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
      field: getFieldLabel(t, fieldKey as any),
    }),
  });

  if (!required) {
    schema = schema.optional() as any;
  }

  if (positive) {
    schema = schema.min(
      0,
      getValidationError(t, "positive", {
        field: getFieldLabel(t, fieldKey as any),
      })
    );
  }

  if (min !== undefined) {
    schema = schema.min(
      min,
      getValidationError(t, "minLength", {
        field: getFieldLabel(t, fieldKey as any),
        min,
      })
    );
  }

  if (max !== undefined) {
    schema = schema.max(
      max,
      getValidationError(t, "maxLength", {
        field: getFieldLabel(t, fieldKey as any),
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
      getValidationError(t, "required", {
        field: getFieldLabel(t, fieldKey as any),
      })
    );
  } else {
    schema = schema.optional() as any;
  }

  if (minLength !== undefined) {
    schema = schema.min(
      minLength,
      getValidationError(t, "minLength", {
        field: getFieldLabel(t, fieldKey as any),
        min: minLength,
      })
    );
  }

  if (maxLength !== undefined) {
    schema = schema.max(
      maxLength,
      getValidationError(t, "maxLength", {
        field: getFieldLabel(t, fieldKey as any),
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
        field: getFieldLabel(t, fieldKey as any),
      })
    );
  }

  return schema;
};

// Complex validation refinements
export const createPasswordConfirmationRefine = (
  t: TFunction,
  _passwordField: string = "password",
  confirmField: string = "confirmPassword"
) => ({
  message: getValidationError(t, "passwordMismatch", {
    field: getFieldLabel(t, confirmField as any),
  }),
  path: [confirmField],
});

export const createDateRangeRefine = (
  t: TFunction,
  startField: string,
  endField: string
) => ({
  message: getValidationError(t, "startBeforeEnd", {
    field: getFieldLabel(t, endField as any),
    startField: getFieldLabel(t, startField as any),
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
  _conditionField: string,
  _conditionValue: any,
  errorType: "currentJobRequired" | "currentStudyRequired"
) => ({
  message: getValidationError(t, errorType, {
    field: getFieldLabel(t, fieldKey as any),
  }),
  path: [fieldKey] as const,
});
