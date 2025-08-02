import { useMutation } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { ApiResponse } from '../types';

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  message: string;
}

export const forgotPassword = (
  data: ForgotPasswordRequest,
): Promise<ApiResponse<ForgotPasswordResponse>> => {
  return api.post('/auth/forgot-password', data);
};

type UseForgotPasswordOptions = {
  mutationConfig?: MutationConfig<typeof forgotPassword>;
};

export const useForgotPassword = ({ mutationConfig }: UseForgotPasswordOptions = {}) => {
  return useMutation({
    mutationFn: forgotPassword,
    ...mutationConfig,
  });
};
