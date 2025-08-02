import { z } from "zod";
import { TFunction } from "react-i18next";
import {
  createEmailSchema,
  createPasswordSchema,
  createSimplePasswordSchema,
  createNameSchema,
  createPhoneSchema,
  createBooleanSchema,
  createPasswordConfirmationRefine,
} from "./schema-factories";
import { getValidationError, getFieldLabel } from "@/i18n/helpers";

// I18n-aware schema factories
export const createLoginSchema = (t: TFunction) =>
  z.object({
    email: createEmailSchema(t),
    password: createSimplePasswordSchema(t, 1), // Just required, no complexity for login
    rememberMe: z.boolean().optional().default(false),
  });

export type LoginFormData = {
  email: string;
  password: string;
  rememberMe?: boolean;
};

export const createRegisterSchema = (t: TFunction) =>
  z
    .object({
      firstName: createNameSchema(t, "firstName"),
      lastName: createNameSchema(t, "lastName"),
      email: createEmailSchema(t),
      password: createPasswordSchema(t),
      confirmPassword: createSimplePasswordSchema(t, 1),
      phoneNumber: createPhoneSchema(t),
      termsAccepted: createBooleanSchema(t, "termsAccepted", true),
      marketingEmails: z.boolean().optional().default(false),
    })
    .refine(
      (data) => data.password === data.confirmPassword,
      createPasswordConfirmationRefine(t)
    );

export type RegisterFormData = z.infer<ReturnType<typeof createRegisterSchema>>;

export const createForgotPasswordSchema = (t: TFunction) =>
  z.object({
    email: createEmailSchema(t),
  });

export type ForgotPasswordFormData = z.infer<
  ReturnType<typeof createForgotPasswordSchema>
>;

export const createResetPasswordSchema = (t: TFunction) =>
  z
    .object({
      token: createSimplePasswordSchema(t, 1, "token"), // Token is required
      password: createPasswordSchema(t),
      confirmPassword: createSimplePasswordSchema(t, 1, "confirmPassword"),
    })
    .refine(
      (data) => data.password === data.confirmPassword,
      createPasswordConfirmationRefine(t)
    );

export type ResetPasswordFormData = z.infer<
  ReturnType<typeof createResetPasswordSchema>
>;

export const createChangePasswordSchema = (t: TFunction) =>
  z
    .object({
      currentPassword: createSimplePasswordSchema(t, 1, "currentPassword"),
      newPassword: createPasswordSchema(t),
      confirmNewPassword: createSimplePasswordSchema(
        t,
        1,
        "confirmNewPassword"
      ),
    })
    .refine(
      (data) => data.newPassword === data.confirmNewPassword,
      createPasswordConfirmationRefine(t, "newPassword", "confirmNewPassword")
    )
    .refine((data) => data.currentPassword !== data.newPassword, {
      message: getValidationError(t, "match", {
        field: getFieldLabel(t, "newPassword"),
        target: getFieldLabel(t, "currentPassword"),
      }),
      path: ["newPassword"],
    });

export type ChangePasswordFormData = z.infer<
  ReturnType<typeof createChangePasswordSchema>
>;
