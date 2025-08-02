import { useMutation } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { ApiResponse } from '../types';

export interface CompletePasswordResetRequest {
  email: string;
  reset_token: string;
  new_password: string;
}

export interface CompletePasswordResetResponse {
  message: string;
}

export const completePasswordReset = (
  data: CompletePasswordResetRequest,
): Promise<ApiResponse<CompletePasswordResetResponse>> => {
  return api.post('/auth/complete-password-reset', data);
};

type UseCompletePasswordResetOptions = {
  mutationConfig?: MutationConfig<typeof completePasswordReset>;
};

export const useCompletePasswordReset = ({ mutationConfig }: UseCompletePasswordResetOptions = {}) => {
  return useMutation({
    mutationFn: completePasswordReset,
    ...mutationConfig,
  });
};
