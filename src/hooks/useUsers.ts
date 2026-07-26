import { useQuery } from '@tanstack/react-query';
import { getAllUsers } from '@/services/userService';
import type { RandomUserResponse } from '@/types/user';

export function useUsers() {
  const { data, isLoading, isError, error, refetch } = useQuery<RandomUserResponse>({
    queryKey: ['users', 'all'],
    queryFn: () => getAllUsers(500),
    staleTime: 1000 * 60 * 15, // 15 minutes cache
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
