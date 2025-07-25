"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import {
  TextFormField,
  PasswordFormField,
  RoleFormField,
} from "@/components/ui/form-field";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/stores/user-store";
import { AUTH_ROUTES } from "@/constants/routes";
import { useTranslation } from "@/hooks/useTranslation";
import { registerSchema, type RegisterFormData } from "@/lib/validations/auth";

export default function RegisterPage() {
  const router = useRouter();
  const { register: registerUser, isLoading } = useAuthStore();
  const { t } = useTranslation();

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
      role: "job_seeker",
      agreeToTerms: false,
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      // Map role from schema to API format
      const apiRole = data.role === "recruiter" ? "employer" : "job_seeker";

      await registerUser({
        username: data.username,
        password: data.password,
        role: apiRole,
      });

      // Redirect to complete profile page after successful registration
      router.push("/complete-profile");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-xl font-bold text-gray-900 mb-1">
          {t("auth.registerTitle")}
        </h1>
        <p className="text-sm text-gray-600 mb-2">
          {t("metadata.registerDescription")}
        </p>
        <p className="text-[#1967D2] text-xs bg-blue-50 px-3 py-2 rounded-lg">
          💡 Quick registration - Complete your profile after signing up
        </p>
      </div>

      {/* Registration Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <div className="space-y-4">
            {/* Role Selection */}
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <RoleFormField
                  {...field}
                  label={t("auth.accountType")}
                  jobSeekerLabel={t("auth.jobSeeker")}
                  recruiterLabel={t("auth.recruiter")}
                  required
                />
              )}
            />

            {/* Username */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <TextFormField
                  {...field}
                  label={t("auth.username")}
                  placeholder={t("auth.usernamePlaceholder")}
                  required
                />
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <PasswordFormField
                  {...field}
                  label={t("auth.password")}
                  placeholder={t("auth.passwordPlaceholder")}
                  required
                />
              )}
            />

            {/* Confirm Password */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <PasswordFormField
                  {...field}
                  label={t("auth.confirmPassword")}
                  placeholder={t("auth.confirmPasswordPlaceholder")}
                  required
                />
              )}
            />

            {/* Terms Agreement */}
            <FormField
              control={form.control}
              name="agreeToTerms"
              render={({ field }) => (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    required
                  />
                  <Label className="text-xs text-gray-700">
                    {t("auth.agreeToTerms")}{" "}
                    <Link
                      href="/terms"
                      className="text-blue-600 hover:text-blue-700 transition-colors duration-200"
                    >
                      {t("auth.termsOfService")}
                    </Link>{" "}
                    {t("auth.and")}{" "}
                    <Link
                      href="/privacy"
                      className="text-blue-600 hover:text-blue-700 transition-colors duration-200"
                    >
                      {t("auth.privacyPolicy")}
                    </Link>
                  </Label>
                </div>
              )}
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-10 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium text-sm rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {isLoading ? t("auth.registering") : t("auth.registerButton")}
          </Button>
        </form>
      </Form>

      {/* Sign in link */}
      <div className="text-center">
        <p className="text-xs text-gray-600">
          {t("auth.alreadyHaveAccount")}{" "}
          <Link
            href={AUTH_ROUTES.LOGIN}
            className="font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200"
          >
            {t("auth.loginButton")}
          </Link>
        </p>
      </div>
    </div>
  );
}
