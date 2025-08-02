import { useMutation } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { RegisterCredentials, RegisterResponse, ApiResponse } from '../types';

export const registerWithEmailAndPassword = (
  data: RegisterCredentials,
): Promise<ApiResponse<RegisterResponse>> => {
  return api.post('/auth/register', data);
};

type UseRegisterOptions = {
  mutationConfig?: MutationConfig<typeof registerWithEmailAndPassword>;
};

export const useRegister = ({ mutationConfig }: UseRegisterOptions = {}) => {
  return useMutation({
    mutationFn: registerWithEmailAndPassword,
    ...mutationConfig,
  });
};