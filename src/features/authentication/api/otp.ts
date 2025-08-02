import { useMutation } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { 
  OTPVerificationRequest, 
  OTPVerificationResponse, 
  ResendOTPRequest,
  ApiResponse
} from '../types';

export const verifyOTP = (
  data: OTPVerificationRequest,
): Promise<ApiResponse<OTPVerificationResponse>> => {
  return api.post('/auth/verify-otp', data);
};

export const resendOTP = (
  data: ResendOTPRequest,
): Promise<ApiResponse<{ message: string }>> => {
  return api.post('/auth/resend-otp', data);
};

type UseVerifyOTPOptions = {
  mutationConfig?: MutationConfig<typeof verifyOTP>;
};

type UseResendOTPOptions = {
  mutationConfig?: MutationConfig<typeof resendOTP>;
};

export const useVerifyOTP = ({ mutationConfig }: UseVerifyOTPOptions = {}) => {
  return useMutation({
    mutationFn: verifyOTP,
    ...mutationConfig,
  });
};

export const useResendOTP = ({ mutationConfig }: UseResendOTPOptions = {}) => {
  return useMutation({
    mutationFn: resendOTP,
    ...mutationConfig,
  });
};