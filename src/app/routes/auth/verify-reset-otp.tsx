import { AuthLayout } from "@/components/layouts/auth-layout";
import { VerifyResetOtpForm } from "@/features/authentication/components/VerifyResetOtpForm";

const VerifyResetOtpRoute = () => {
  return (
    <AuthLayout
      title="Xác thực OTP"
      subtitle="Nhập mã OTP để xác thực yêu cầu đặt lại mật khẩu"
    >
      <VerifyResetOtpForm />
    </AuthLayout>
  );
};

export default VerifyResetOtpRoute;
