import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeOff, Eye } from "lucide-react";

import { useTranslation } from "react-i18next";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { paths } from "@/config/paths";
import { useRegister } from "../api/register";
import { useMutationLoading } from "@/hooks/use-loading";
import { useToast } from "@/services/toast-service";

import {
  createRegisterSchema,
  type RegisterFormData,
} from "@/utils/validations/auth.schemas";

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();

  const registerSchema = createRegisterSchema(t);

  // Get email from navigation state (from forgot password)
  const prefilledEmail = location.state?.email || "";

  const registerMutation = useMutationLoading(
    useRegister({
      mutationConfig: {
        onSuccess: (response) => {
          // Show success toast using message from response
          const messageKey =
            response.message || "auth.messages.registration.success";
          toast.success(messageKey);

          // Navigate to OTP verification page
          const email = response.data?.email || form.getValues().email;
          navigate(paths.auth.verifyOTP.getHref(), {
            state: { email },
            replace: true,
          });
        },
        onError: (error: any) => {
          // Show error toast based on error message/key from backend
          const messageKey =
            error?.response?.data?.message ||
            "auth.messages.registration.failed";
          toast.error(messageKey);
        },
      },
    }),
    "registration",
    {
      globalLoading: true,
    }
  );

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: prefilledEmail,
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      termsAccepted: false,
      marketingEmails: false,
    },
  });

  const onSubmit = async (values: RegisterFormData) => {
    registerMutation.mutate({
      email: values.email,
      password: values.password,
      full_name: `${values.firstName} ${values.lastName}`.trim(),
      role: "job_seeker", // Default role since it's not in the form
    });
  };

  return (
    <div className="box-border flex flex-col gap-5 items-start justify-start p-0 relative shrink-0">
      {registerMutation.error && (
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
              <h3 className="text-sm font-medium text-red-800">Lỗi đăng ký</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{registerMutation.error?.message || "Đăng ký thất bại"}</p>
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
          {/* First Name Field */}
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="h-12 lg:h-14 relative rounded-lg">
                    <Input
                      {...field}
                      type="text"
                      placeholder={t("auth.placeholders.firstName")}
                      autoComplete="given-name"
                      className="h-12 lg:h-14 border-[#c6c6c9] text-[#56575d] text-sm lg:text-base font-medium bg-transparent"
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-red-600 text-sm" />
              </FormItem>
            )}
          />

          {/* Last Name Field */}
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="h-12 lg:h-14 relative rounded-lg">
                    <Input
                      {...field}
                      type="text"
                      placeholder={t("auth.placeholders.lastName")}
                      autoComplete="family-name"
                      className="h-12 lg:h-14 border-[#c6c6c9] text-[#56575d] text-sm lg:text-base font-medium bg-transparent"
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-red-600 text-sm" />
              </FormItem>
            )}
          />

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
                      placeholder="Email"
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
                        placeholder="Mật khẩu"
                        autoComplete="new-password"
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

          {/* Confirm Password Field */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="h-12 lg:h-14 relative rounded-lg">
                    <div className="relative">
                      <Input
                        {...field}
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Xác nhận mật khẩu"
                        autoComplete="new-password"
                        className="h-12 lg:h-14 border-[#c6c6c9] text-[#56575d] text-sm lg:text-base font-medium bg-transparent pr-12"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#56575d] hover:text-gray-700"
                      >
                        {showConfirmPassword ? (
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

          {/* Phone Number Field */}
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="h-12 lg:h-14 relative rounded-lg">
                    <Input
                      {...field}
                      type="tel"
                      placeholder={t("auth.placeholders.phoneNumber")}
                      autoComplete="tel"
                      className="h-12 lg:h-14 border-[#c6c6c9] text-[#56575d] text-sm lg:text-base font-medium bg-transparent"
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-red-600 text-sm" />
              </FormItem>
            )}
          />

          {/* Terms Accepted Field */}
          <FormField
            control={form.control}
            name="termsAccepted"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-sm">
                    {t("auth.labels.termsAccepted")}
                  </FormLabel>
                  <FormMessage className="text-red-600 text-sm" />
                </div>
              </FormItem>
            )}
          />

          {/* Marketing Emails Field */}
          <FormField
            control={form.control}
            name="marketingEmails"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-sm">
                    {t("auth.labels.marketingEmails")}
                  </FormLabel>
                  <FormMessage className="text-red-600 text-sm" />
                </div>
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={registerMutation.isPending}
            className="w-full h-12 lg:h-14 bg-[#2971ff] hover:bg-[#1967d2] text-white font-semibold text-sm lg:text-base rounded-lg"
          >
            {registerMutation.isPending ? (
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
                Đang đăng ký...
              </div>
            ) : (
              "Đăng ký"
            )}
          </Button>

          {/* Links */}
          <div className="flex flex-col gap-3 text-center text-sm">
            <div>
              <span className="text-[#56575d]">Đã có tài khoản? </span>
              <Link
                to={paths.auth.login.getHref()}
                className="text-[#2971ff] hover:text-[#1967d2] font-medium"
              >
                Đăng nhập ngay
              </Link>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
