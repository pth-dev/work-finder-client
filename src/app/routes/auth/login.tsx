import { AuthLayout } from "@/components/layouts/auth-layout";
import { LoginForm } from "@/features/authentication/components/LoginForm";

const LoginRoute = () => {
  return (
    <AuthLayout
      title="Chào mừng bạn quay lại"
      subtitle="Mỗi ứng viên là một cơ hội – hôm nay bạn chọn tương lai cho doanh nghiệp!"
    >
      <LoginForm />
    </AuthLayout>
  );
};

export default LoginRoute;
