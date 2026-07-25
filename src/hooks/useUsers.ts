import { useQuery } from '@tanstack/react-query';
import { getUsers } from '@/services/userService';
import type { RandomUserResponse } from '@/types/user';

export function useUsers(page: number = 1) {
  const { data, isLoading, isError, error, refetch } = useQuery<RandomUserResponse>({
    queryKey: ['users', page],
    queryFn: () => getUsers(page, 10),
  });

  return {
    data,
    isLoading,
    isError,
    error,
    refetch,
  };
}
