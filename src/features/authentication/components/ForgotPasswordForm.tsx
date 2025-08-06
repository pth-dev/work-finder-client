import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useTranslation } from "react-i18next";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { paths } from "@/config/paths";
import { useForgotPassword } from "../api/forgot-password";
import { useToast } from "@/services/toast-service";
import { getFieldLabel, getAuthError } from "@/i18n/helpers";

import {
  createForgotPasswordSchema,
  type ForgotPasswordFormData,
} from "@/utils/validations/auth.schemas";

export function ForgotPasswordForm() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const toastService = useToast();
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const forgotPasswordSchema = createForgotPasswordSchema(t);

  const forgotPasswordMutation = useForgotPassword({
    mutationConfig: {
      onSuccess: () => {
        setIsSuccess(true);
        toastService.success(t("common:auth.forgotPassword.otpSent"));
        // Navigate to verify reset OTP page after 2 seconds
        setTimeout(() => {
          navigate(paths.auth.verifyResetOtp.getHref(), {
            state: { email: form.getValues("email") },
          });
        }, 2000);
      },
      onError: (error: any) => {
        const message = error?.response?.data?.message;

        // Check if email not found
        if (message === "auth.messages.forgotPassword.emailNotFound") {
          const errorMsg = getAuthError(t, "emailNotFound");
          setError(errorMsg);
          toastService.error(errorMsg);
        } else {
          const errorMsg = t("common:errors.api.serverError");
          setError(errorMsg);
          toastService.error(errorMsg);
        }
      },
    },
  });

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: ForgotPasswordFormData) => {
    setError(null);
    forgotPasswordMutation.mutate({ email: values.email });
  };

  if (isSuccess) {
    return (
      <div className="box-border flex flex-col gap-5 items-start justify-start p-0 relative shrink-0">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 w-full">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-green-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">
                {t("common:auth.forgotPassword.emailSent")}
              </h3>
              <div className="mt-2 text-sm text-green-700">
                <p>{t("common:auth.forgotPassword.emailSentDescription")}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 text-center text-sm w-full">
          <Link
            to={paths.auth.login.getHref()}
            className="text-[#2971ff] hover:text-[#1967d2] font-medium"
          >
            {t("common:auth.forgotPassword.backToLogin")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="box-border flex flex-col gap-5 items-start justify-start p-0 relative shrink-0">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 w-full">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                {t("common:ui.error")}
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 w-full max-w-[385px]"
        >
          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="h-[50px] relative rounded-lg">
                    <Input
                      {...field}
                      type="email"
                      placeholder={getFieldLabel(t, "email")}
                      autoComplete="email"
                      className="h-[50px] border-[#c6c6c9] text-[#56575d] text-[15px] font-medium bg-transparent"
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-red-600 text-sm" />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={forgotPasswordMutation.isPending}
            className="w-full h-[50px] bg-[#2971ff] hover:bg-[#1967d2] text-white font-semibold text-[16px] rounded-lg"
          >
            {forgotPasswordMutation.isPending ? (
              <div className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                {t("common:auth.forgotPassword.sending")}
              </div>
            ) : (
              t("common:auth.forgotPassword.sendInstructions")
            )}
          </Button>

          {/* Links */}
          <div className="flex flex-col gap-3 text-center text-sm">
            <Link
              to={paths.auth.login.getHref()}
              className="text-[#2971ff] hover:text-[#1967d2] font-medium"
            >
              {t("common:auth.forgotPassword.backToLogin")}
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}
