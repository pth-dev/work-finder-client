import { useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { User } from '../types';

export const getUser = (): Promise<User> => {
  return api.get('/users/me');
};

type UseUserOptions = {
  queryConfig?: QueryConfig<typeof getUserQueryOptions>;
};

export const getUserQueryOptions = () => {
  return {
    queryKey: ['auth-user'],
    queryFn: getUser,
  };
};

export const useUser = ({ queryConfig }: UseUserOptions = {}) => {
  return useQuery({
    ...getUserQueryOptions(),
    ...queryConfig,
  });
};