import { AuthLayout } from "@/components/layouts/auth-layout";
import { LoginForm } from "@/features/authentication/components/LoginForm";

const LoginRoute = () => {
  return (
    <AuthLayout title="Log in to your account">
      <LoginForm />
    </AuthLayout>
  );
};

export default LoginRoute;
