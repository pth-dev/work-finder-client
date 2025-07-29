import { AuthGuard } from '@/app/router/guards';
import { LoginForm } from '@/features/authentication/components';

export function LoginPage() {
  return (
    <AuthGuard requireAuth={false}>
      <LoginForm />
    </AuthGuard>
  );
}