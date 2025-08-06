import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
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
import { paths } from "@/config/paths";
import { useVerifyResetOtp } from "../api/verify-reset-otp";
import { useToast } from "@/services/toast-service";

const verifyResetOtpSchema = z.object({
  otp_code: z.string().length(6, "OTP phải có 6 chữ số"),
});

export function VerifyResetOtpForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const toastService = useToast();

  const [error, setError] = useState<string | null>(null);

  // Redirect if no email provided
  if (!email) {
    navigate("/auth/forgot-password");
    return null;
  }

  const verifyResetOtpMutation = useVerifyResetOtp({
    mutationConfig: {
      onSuccess: (data) => {
        toastService.success("OTP xác thực thành công!");
        // Navigate to set new password page with reset token
        navigate("/auth/set-new-password", {
          state: {
            email,
            reset_token: data.data.reset_token,
          },
        });
      },
      onError: (error: any) => {
        const message =
          error?.response?.data?.message || "OTP không hợp lệ hoặc đã hết hạn";
        setError(message);
        toastService.error(message);
      },
    },
  });

  const form = useForm<z.infer<typeof verifyResetOtpSchema>>({
    resolver: zodResolver(verifyResetOtpSchema),
    defaultValues: {
      otp_code: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof verifyResetOtpSchema>) => {
    setError(null);
    verifyResetOtpMutation.mutate({
      email,
      otp_code: values.otp_code,
    });
  };

  return (
    <div className="box-border flex flex-col gap-5 items-start justify-start p-0 relative shrink-0">
      {/* Header */}
      <div className="text-center w-full">
        <p className="text-sm text-gray-600">
          Nhập mã OTP 6 chữ số đã được gửi đến email: <strong>{email}</strong>
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 w-full">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 w-full max-w-[385px]"
        >
          {/* OTP Field */}
          <FormField
            control={form.control}
            name="otp_code"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="h-[50px] relative rounded-lg">
                    <Input
                      {...field}
                      type="text"
                      placeholder="Nhập mã OTP (6 chữ số)"
                      maxLength={6}
                      className="h-[50px] border-[#c6c6c9] text-[#56575d] text-[15px] font-medium bg-transparent text-center text-2xl tracking-widest"
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
            disabled={verifyResetOtpMutation.isPending}
            className="w-full h-[50px] bg-[#2971ff] hover:bg-[#1967d2] text-white font-semibold text-[16px] rounded-lg"
          >
            {verifyResetOtpMutation.isPending ? (
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

          {/* Back to forgot password */}
          <div className="text-center">
            <Link
              to={paths.auth.forgotPassword.getHref()}
              className="text-sm text-[#2971ff] hover:text-[#1967d2] font-medium"
            >
              ← Quay lại nhập email
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}
