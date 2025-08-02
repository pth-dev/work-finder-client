import { useLocation, Navigate } from "react-router-dom";
import { AuthLayout } from "@/components/layouts/auth-layout";
import { OTPVerificationForm } from "@/features/authentication/components/OTPVerificationForm";
import { paths } from "@/config/paths";

const VerifyOTPRoute = () => {
  const location = useLocation();
  const email = location.state?.email;

  // Redirect to register if no email is provided
  if (!email) {
    return <Navigate to={paths.auth.register.getHref()} replace />;
  }

  return (
    <AuthLayout
      title="Xác thực tài khoản"
      subtitle="Nhập mã OTP được gửi đến email của bạn để hoàn tất việc đăng ký"
    >
      <OTPVerificationForm email={email} />
    </AuthLayout>
  );
};

export default VerifyOTPRoute;