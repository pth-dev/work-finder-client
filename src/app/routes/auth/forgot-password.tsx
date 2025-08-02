import { AuthLayout } from "@/components/layouts/auth-layout";
import { ForgotPasswordForm } from "@/features/authentication/components/ForgotPasswordForm";

const ForgotPasswordRoute = () => {
  return (
    <AuthLayout
      title="Quên mật khẩu?"
      subtitle="Nhập email của bạn và chúng tôi sẽ gửi hướng dẫn đặt lại mật khẩu"
    >
      <ForgotPasswordForm />
    </AuthLayout>
  );
};

export default ForgotPasswordRoute;
