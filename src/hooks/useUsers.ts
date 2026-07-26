import { useQuery } from '@tanstack/react-query';
import { getAllUsers } from '@/services/userService';
import type { RandomUserResponse } from '@/types/user';

export function useUsers() {
  const { data, isLoading, isError, error, refetch } = useQuery<RandomUserResponse>({
    queryKey: ['users', 'all'],
    queryFn: () => getAllUsers(100),
    staleTime: 1000 * 60 * 10, // 10 minutes cache
  });

  return {
    data,
    allUsers: data?.results ?? [],
    isLoading,
    isError,
    error,
    refetch,
  };
}
