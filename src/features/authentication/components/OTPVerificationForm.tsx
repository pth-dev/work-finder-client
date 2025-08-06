import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { useVerifyOTP, useResendOTP } from "../api/otp";
import { useMutationLoading } from "@/hooks/use-loading";
import { useToast } from "@/services/toast-service";

const otpSchema = z.object({
  otp: z.string().length(6, "OTP phải có 6 số"),
});

interface OTPVerificationFormProps {
  email: string;
}

export function OTPVerificationForm({ email }: OTPVerificationFormProps) {
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const { setUser, isAuthenticated, user } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const toastService = useToast();
  const shouldNavigateRef = useRef(false);

  // Get appropriate redirect path based on user role and 'from' state
  const getRedirectPath = (user: any) => {
    const from = (location.state as any)?.from;

    // If there's a specific 'from' path, use it
    if (from && from !== "/" && from !== paths.home.getHref()) {
      return from;
    }

    // Default redirect based on user role
    if (user?.role === "job_seeker") {
      return paths.home.getHref();
    } else {
      return paths.app.dashboard.getHref();
    }
  };

  // Watch for authentication state changes and navigate when ready
  useEffect(() => {
    if (shouldNavigateRef.current && isAuthenticated && user) {
      shouldNavigateRef.current = false;
      const redirectPath = getRedirectPath(user);
      navigate(redirectPath, { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  const verifyOTPMutation = useMutationLoading(
    useVerifyOTP({
      mutationConfig: {
        onSuccess: (response) => {
          // Show success toast using message from response or fallback
          const messageKey =
            response.message || "auth.messages.otp.verifySuccess";
          toastService.success(messageKey);

          // Set user and flag for navigation
          setUser(response.data.user);
          shouldNavigateRef.current = true;
        },
        onError: (error: any) => {
          // Show error toast based on error message/key from backend
          const messageKey =
            error?.response?.data?.message || "auth.messages.otp.verifyFailed";
          toastService.error(messageKey);
        },
      },
    }),
    "verify-otp",
    {
      globalLoading: true,
    }
  );

  const resendOTPMutation = useMutationLoading(
    useResendOTP({
      mutationConfig: {
        onSuccess: () => {
          // Show success toast
          toastService.success("auth.messages.otp.resendSuccess");

          setCountdown(60);
          setCanResend(false);
        },
        onError: (error: any) => {
          // Show error toast
          const messageKey =
            error?.response?.data?.message || "auth.messages.otp.resendFailed";
          toastService.error(messageKey);
        },
      },
    }),
    "resend-otp",
    {}
  );

  const form = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const onSubmit = async (values: z.infer<typeof otpSchema>) => {
    verifyOTPMutation.mutate({
      email,
      otp_code: values.otp,
    });
  };

  const handleResendOTP = () => {
    resendOTPMutation.mutate({ email });
  };

  return (
    <div className="box-border flex flex-col gap-5 items-start justify-start p-0 relative shrink-0">
      {verifyOTPMutation.error && (
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
                Lỗi xác thực OTP
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{verifyOTPMutation.error?.message || "OTP không hợp lệ"}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="w-full text-center mb-4">
        <p className="text-gray-600 text-sm">
          Chúng tôi đã gửi mã OTP 6 số đến email:
        </p>
        <p className="font-semibold text-gray-800 mt-1">{email}</p>
        <p className="text-gray-500 text-xs mt-2">
          Vui lòng kiểm tra hộp thư đến và thư mục spam
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 w-full"
        >
          {/* OTP Field */}
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="h-12 lg:h-14 relative rounded-lg">
                    <Input
                      {...field}
                      type="text"
                      placeholder="Nhập mã OTP 6 số"
                      maxLength={6}
                      className="h-12 lg:h-14 border-[#c6c6c9] text-[#56575d] font-medium bg-transparent text-center text-2xl tracking-widest"
                      onChange={(e) => {
                        // Only allow numbers
                        const value = e.target.value.replace(/\D/g, "");
                        field.onChange(value);
                      }}
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
            disabled={verifyOTPMutation.isPending}
            className="w-full h-12 lg:h-14 bg-[#2971ff] hover:bg-[#1967d2] text-white font-semibold text-sm lg:text-base rounded-lg"
          >
            {verifyOTPMutation.isPending ? (
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
                Đang xác thực...
              </div>
            ) : (
              "Xác thực OTP"
            )}
          </Button>

          {/* Resend OTP */}
          <div className="text-center text-sm">
            {canResend ? (
              <button
                type="button"
                onClick={handleResendOTP}
                disabled={resendOTPMutation.isPending}
                className="text-[#2971ff] hover:text-[#1967d2] font-medium"
              >
                {resendOTPMutation.isPending ? "Đang gửi..." : "Gửi lại mã OTP"}
              </button>
            ) : (
              <p className="text-gray-500">Gửi lại mã OTP sau {countdown}s</p>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
