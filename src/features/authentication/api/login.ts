import { useMutation } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { LoginCredentials, LoginResponse, ApiResponse } from '../types';

export const loginWithEmailAndPassword = ({
  email,
  password,
}: LoginCredentials): Promise<ApiResponse<LoginResponse>> => {
  return api.post('/auth/login', { email, password });
};

type UseLoginOptions = {
  mutationConfig?: MutationConfig<typeof loginWithEmailAndPassword>;
};

export const useLogin = ({ mutationConfig }: UseLoginOptions = {}) => {
  return useMutation({
    mutationFn: loginWithEmailAndPassword,
    ...mutationConfig,
  });
};