import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { EyeOff, Eye } from "lucide-react";

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
import { useAuthStore } from "@/stores";
import { paths } from "@/config/paths";
import { useLogin } from "../api/login";
import { useMutationLoading } from "@/hooks/use-loading";
import { useToast } from "@/services/toast-service";
import { getFieldLabel, getAuthError } from "@/i18n/helpers";

import { createLoginSchema } from "@/utils/validations/auth.schemas";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslation();
  const { setUser } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();

  const loginSchema = createLoginSchema(t);

  // Get appropriate redirect path based on user role and 'from' state
  const getRedirectPath = (user: any) => {
    const from = (location.state as any)?.from;

    // If there's a specific 'from' path, use it
    if (from && from !== "/") {
      return from;
    }

    // Default redirect based on user role
    if (user?.role === "job_seeker") {
      return paths.home.getHref();
    } else {
      return paths.app.dashboard.getHref();
    }
  };

  const loginMutation = useMutationLoading(
    useLogin({
      mutationConfig: {
        onSuccess: (response) => {
          // Show success toast
          toast.success(t("common:auth.login.success"));

          // Store user data (tokens are stored in HTTP-only cookies)
          setUser(response.data.user);
          // Navigate to appropriate page based on user role
          const redirectPath = getRedirectPath(response.data.user);
          navigate(redirectPath, { replace: true });
        },
        onError: (error: any) => {
          // Show error toast based on error message/key from backend
          const message = error?.response?.data?.message;
          if (message === "auth.messages.login.invalidCredentials") {
            toast.error(getAuthError(t, "invalidCredentials"));
          } else {
            toast.error(t("common:auth.login.failed"));
          }
        },
      },
    }),
    "login",
    {
      globalLoading: true,
    }
  );

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    loginMutation.mutate(values);
  };

  return (
    <div className="box-border flex flex-col gap-5 items-start justify-start p-0 relative shrink-0">
      {loginMutation.error && (
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
                {t("common:auth.login.error")}
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <p>
                  {loginMutation.error?.message ||
                    t("common:auth.login.failed")}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 w-full"
        >
          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="h-12 lg:h-14 relative rounded-lg">
                    <Input
                      {...field}
                      type="email"
                      placeholder={getFieldLabel(t, "email")}
                      autoComplete="email"
                      className="h-12 lg:h-14 border-[#c6c6c9] text-[#56575d] text-sm lg:text-base font-medium bg-transparent"
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-red-600 text-sm" />
              </FormItem>
            )}
          />

          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="h-12 lg:h-14 relative rounded-lg">
                    <div className="relative">
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        placeholder={getFieldLabel(t, "password")}
                        autoComplete="current-password"
                        className="h-12 lg:h-14 border-[#c6c6c9] text-[#56575d] text-sm lg:text-base font-medium bg-transparent pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#56575d] hover:text-gray-700"
                      >
                        {showPassword ? (
                          <Eye className="w-5 h-5 lg:w-6 lg:h-6" />
                        ) : (
                          <EyeOff className="w-5 h-5 lg:w-6 lg:h-6" />
                        )}
                      </button>
                    </div>
                  </div>
                </FormControl>
                <FormMessage className="text-red-600 text-sm" />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full h-12 lg:h-14 bg-[#2971ff] hover:bg-[#1967d2] text-white font-semibold text-sm lg:text-base rounded-lg"
          >
            {loginMutation.isPending ? (
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
                {t("common:auth.login.signing")}
              </div>
            ) : (
              t("common:auth.login.signIn")
            )}
          </Button>

          {/* Links */}
          <div className="flex flex-col gap-3 text-center text-sm">
            <Link
              to={paths.auth.forgotPassword.getHref()}
              className="text-[#2971ff] hover:text-[#1967d2] font-medium"
            >
              {t("common:auth.login.forgotPassword")}
            </Link>
            <div>
              <span className="text-[#56575d]">
                {t("common:auth.login.noAccount")}{" "}
              </span>
              <Link
                to={paths.auth.register.getHref()}
                className="text-[#2971ff] hover:text-[#1967d2] font-medium"
              >
                {t("common:auth.login.signUp")}
              </Link>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
