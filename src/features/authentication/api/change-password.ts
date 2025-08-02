import { useMutation } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { ApiResponse } from '../types';

export interface ChangePasswordRequest {
  current_password: string;
  new_password: string;
}

export interface ChangePasswordResponse {
  message: string;
}

export const changePassword = (
  data: ChangePasswordRequest,
): Promise<ApiResponse<ChangePasswordResponse>> => {
  return api.post('/auth/change-password', data);
};

type UseChangePasswordOptions = {
  mutationConfig?: MutationConfig<typeof changePassword>;
};

export const useChangePassword = ({ mutationConfig }: UseChangePasswordOptions = {}) => {
  return useMutation({
    mutationFn: changePassword,
    ...mutationConfig,
  });
};
