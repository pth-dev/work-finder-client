import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";
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
import { useCompletePasswordReset } from "../api/complete-password-reset";
import { toast } from "sonner";

const setNewPasswordSchema = z
  .object({
    new_password: z
      .string()
      .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        "Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt"
      ),
    confirm_password: z.string(),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirm_password"],
  });

export function SetNewPasswordForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const reset_token = location.state?.reset_token;

  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Redirect if no email or reset_token provided
  if (!email || !reset_token) {
    navigate("/auth/forgot-password");
    return null;
  }

  const completePasswordResetMutation = useCompletePasswordReset({
    mutationConfig: {
      onSuccess: () => {
        toast.success("Mật khẩu đã được đặt lại thành công!");
        // Navigate to login page after 2 seconds
        setTimeout(() => {
          navigate("/auth/login", {
            state: {
              message:
                "Mật khẩu đã được đặt lại. Vui lòng đăng nhập với mật khẩu mới.",
              email,
            },
          });
        }, 2000);
      },
      onError: (error: any) => {
        const message =
          error?.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại";
        setError(message);
        toast.error(message);
      },
    },
  });

  const form = useForm<z.infer<typeof setNewPasswordSchema>>({
    resolver: zodResolver(setNewPasswordSchema),
    defaultValues: {
      new_password: "",
      confirm_password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof setNewPasswordSchema>) => {
    setError(null);
    completePasswordResetMutation.mutate({
      email,
      reset_token,
      new_password: values.new_password,
    });
  };

  return (
    <div className="box-border flex flex-col gap-5 items-start justify-start p-0 relative shrink-0">
      {/* Header */}
      <div className="text-center w-full">
        <p className="text-sm text-gray-600">
          Nhập mật khẩu mới cho tài khoản: <strong>{email}</strong>
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
          {/* New Password Field */}
          <FormField
            control={form.control}
            name="new_password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="h-[50px] relative rounded-lg">
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      placeholder="Mật khẩu mới"
                      className="h-[50px] border-[#c6c6c9] text-[#56575d] text-[15px] font-medium bg-transparent pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage className="text-red-600 text-sm" />
              </FormItem>
            )}
          />

          {/* Confirm Password Field */}
          <FormField
            control={form.control}
            name="confirm_password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="h-[50px] relative rounded-lg">
                    <Input
                      {...field}
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Xác nhận mật khẩu mới"
                      className="h-[50px] border-[#c6c6c9] text-[#56575d] text-[15px] font-medium bg-transparent pr-12"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage className="text-red-600 text-sm" />
              </FormItem>
            )}
          />

          {/* Password Requirements */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800 text-sm font-medium mb-2">
              Yêu cầu mật khẩu:
            </p>
            <ul className="text-blue-700 text-xs space-y-1">
              <li>• Ít nhất 8 ký tự</li>
              <li>• Ít nhất 1 chữ hoa (A-Z)</li>
              <li>• Ít nhất 1 chữ thường (a-z)</li>
              <li>• Ít nhất 1 số (0-9)</li>
              <li>• Ít nhất 1 ký tự đặc biệt (@$!%*?&)</li>
            </ul>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={completePasswordResetMutation.isPending}
            className="w-full h-[50px] bg-[#2971ff] hover:bg-[#1967d2] text-white font-semibold text-[16px] rounded-lg"
          >
            {completePasswordResetMutation.isPending ? (
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
                Đang cập nhật...
              </div>
            ) : (
              "Đặt mật khẩu mới"
            )}
          </Button>

          {/* Back to login */}
          <div className="text-center">
            <Link
              to={paths.auth.login.getHref()}
              className="text-sm text-[#2971ff] hover:text-[#1967d2] font-medium"
            >
              ← Quay lại đăng nhập
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}
