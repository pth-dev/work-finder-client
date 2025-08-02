import { AuthLayout } from "@/components/layouts/auth-layout";
import { RegisterForm } from "@/features/authentication/components/RegisterForm";

const RegisterRoute = () => {
  return (
    <AuthLayout
      title="Tạo tài khoản mới"
      subtitle="Tham gia cùng hàng nghìn ứng viên và tìm kiếm công việc mơ ước của bạn!"
    >
      <RegisterForm />
    </AuthLayout>
  );
};

export default RegisterRoute;
