import { useQueryClient } from '@tanstack/react-query';
import { useUsers } from '@/hooks/useUsers';
import { getUserById } from '@/services/userService';
import type { User } from '@/types/user';

export function useUser(uuid: string) {
  const queryClient = useQueryClient();
  const { isLoading, isError, error } = useUsers();

  const user: User | undefined = getUserById(queryClient, uuid);

  return {
    user,
    isLoading,
    isError,
    error,
  };
}
