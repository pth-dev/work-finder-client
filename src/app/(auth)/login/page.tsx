"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { TextFormField, PasswordFormField } from "@/components/ui/form-field";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/stores/user-store";
import { AUTH_ROUTES } from "@/constants/routes";
import { useTranslation } from "@/hooks/useTranslation";
import { loginSchema, type LoginFormData } from "@/lib/validations/auth";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, isLoading } = useAuthStore();
  const { t } = useTranslation();

  // Get redirect URL from query params
  const redirectTo = searchParams.get("redirect") || "/";

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login({
        username: data.username,
        password: data.password,
        rememberMe: data.rememberMe,
      });

      // Redirect to intended page or home after successful login
      router.push(redirectTo);
    } catch (error) {
      // Error is handled by the auth context (toast notification)
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {t("auth.loginTitle")}
        </h1>
        <p className="text-gray-600">{t("metadata.loginDescription")}</p>
      </div>

      {/* Login Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-4">
            {/* Username */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <TextFormField
                  {...field}
                  type="text"
                  label={t("auth.username")}
                  placeholder={t("auth.usernamePlaceholder")}
                  required
                  inputClassName="h-12"
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
                  inputClassName="h-12"
                />
              )}
            />
          </div>

          <div className="flex items-center justify-between">
            {/* Remember Me */}
            <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <Label className="text-sm text-gray-700">
                    {t("auth.rememberMe")}
                  </Label>
                </div>
              )}
            />

            <div className="text-sm">
              <Link
                href={AUTH_ROUTES.FORGOT_PASSWORD}
                className="font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200"
              >
                {t("auth.forgotPassword")}
              </Link>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50"
          >
            {isLoading ? t("common.loading") : t("auth.loginButton")}
          </Button>
        </form>
      </Form>

      {/* Sign up link */}
      <div className="text-center">
        <p className="text-sm text-gray-600">
          {t("auth.dontHaveAccount")}{" "}
          <Link
            href={AUTH_ROUTES.REGISTER}
            className="font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200"
          >
            {t("auth.registerButton")}
          </Link>
        </p>
      </div>
    </div>
  );
}
