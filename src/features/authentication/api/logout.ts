import { useMutation } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';

export const logoutUser = (_?: void): Promise<void> => {
  return api.post('/auth/logout');
};

type UseLogoutOptions = {
  mutationConfig?: MutationConfig<typeof logoutUser>;
};

export const useLogout = ({ mutationConfig }: UseLogoutOptions = {}) => {
  return useMutation({
    mutationFn: logoutUser,
    ...mutationConfig,
  });
};