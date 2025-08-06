import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useTranslation } from "react-i18next";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  FormErrorMessage,
  PasswordInput,
  LoadingButton,
} from "@/components/common";
import { useAuthStore } from "@/stores";
import { paths } from "@/config/paths";
import { useLogin } from "../api/login";
import { useMutationLoading } from "@/hooks/use-loading";
import { useAuthErrorHandler } from "@/hooks";
import { useToast } from "@/services/toast-service";
import { getFieldLabel } from "@/i18n/helpers";

import { createLoginSchema } from "@/utils/validations/auth.schemas";

export function LoginForm() {
  const { t } = useTranslation();
  const { setUser } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const toastService = useToast();
  const { handleAuthError } = useAuthErrorHandler();

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
          toastService.success(t("common:auth.login.success"));

          // Store user data (tokens are stored in HTTP-only cookies)
          setUser(response.data.user);
          // Navigate to appropriate page based on user role
          const redirectPath = getRedirectPath(response.data.user);
          navigate(redirectPath, { replace: true });
        },
        onError: (error: any) => {
          // Use standardized error handler with form context
          handleAuthError(error, form);
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
                  <PasswordInput
                    {...field}
                    placeholder={getFieldLabel(t, "password")}
                    autoComplete="current-password"
                  />
                </FormControl>
                <FormMessage className="text-red-600 text-sm" />
              </FormItem>
            )}
          />

          {/* Form-level error message for authentication failures */}
          <FormErrorMessage message={form.formState.errors.root?.message} />

          {/* Submit Button */}
          <LoadingButton
            type="submit"
            loading={loginMutation.isPending}
            loadingText={t("common:auth.login.signing")}
          >
            {t("common:auth.login.signIn")}
          </LoadingButton>

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
