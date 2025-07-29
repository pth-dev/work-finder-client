import { AuthGuard } from '@/app/router/guards';
import { RegisterForm } from '@/features/authentication/components';

export function RegisterPage() {
  return (
    <AuthGuard requireAuth={false}>
      <RegisterForm />
    </AuthGuard>
  );
}