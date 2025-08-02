import { AuthLayout } from "@/components/layouts/auth-layout";
import { SetNewPasswordForm } from "@/features/authentication/components/SetNewPasswordForm";

const SetNewPasswordRoute = () => {
  return (
    <AuthLayout
      title="Đặt mật khẩu mới"
      subtitle="Tạo mật khẩu mới cho tài khoản của bạn"
    >
      <SetNewPasswordForm />
    </AuthLayout>
  );
};

export default SetNewPasswordRoute;
