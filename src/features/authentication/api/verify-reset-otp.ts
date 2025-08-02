import { useMutation } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { ApiResponse } from '../types';

export interface VerifyResetOtpRequest {
  email: string;
  otp_code: string;
}

export interface VerifyResetOtpResponse {
  message: string;
  reset_token: string;
}

export const verifyResetOtp = (
  data: VerifyResetOtpRequest,
): Promise<ApiResponse<VerifyResetOtpResponse>> => {
  return api.post('/auth/verify-reset-otp', data);
};

type UseVerifyResetOtpOptions = {
  mutationConfig?: MutationConfig<typeof verifyResetOtp>;
};

export const useVerifyResetOtp = ({ mutationConfig }: UseVerifyResetOtpOptions = {}) => {
  return useMutation({
    mutationFn: verifyResetOtp,
    ...mutationConfig,
  });
};
