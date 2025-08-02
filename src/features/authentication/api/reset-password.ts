import { useMutation } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { ApiResponse } from '../types';

export interface ResetPasswordRequest {
  email: string;
  otp_code: string;
  new_password: string;
}

export interface ResetPasswordResponse {
  message: string;
}

export const resetPassword = (
  data: ResetPasswordRequest,
): Promise<ApiResponse<ResetPasswordResponse>> => {
  return api.post('/auth/reset-password', data);
};

type UseResetPasswordOptions = {
  mutationConfig?: MutationConfig<typeof resetPassword>;
};

export const useResetPassword = ({ mutationConfig }: UseResetPasswordOptions = {}) => {
  return useMutation({
    mutationFn: resetPassword,
    ...mutationConfig,
  });
};
