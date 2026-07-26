import { useMemo } from 'react';
import type { User } from '@/types/user';
import type { SearchFilters } from '@/types/filter';

interface UseUserSearchResult {
  filteredUsers: User[];
  paginatedUsers: User[];
  hasActiveFilters: boolean;
  totalPages: number;
}

export function useUserSearch(
  users: User[] | undefined,
  filters: SearchFilters,
  currentPage: number = 1,
  pageSize: number = 10
): UseUserSearchResult {
  return useMemo(() => {
    if (!users || !users.length) {
      return {
        filteredUsers: [],
        paginatedUsers: [],
        hasActiveFilters: false,
        totalPages: 1,
      };
    }

    const trimmedQuery = (filters.query || '').trim().toLowerCase();
    const trimmedFirst = (filters.firstName || '').trim().toLowerCase();
    const trimmedLast = (filters.lastName || '').trim().toLowerCase();
    const trimmedAge = (filters.age || '').trim();
    const parsedAge = trimmedAge !== '' ? Number(trimmedAge) : null;

    const hasActiveFilters =
      trimmedQuery !== '' ||
      trimmedFirst !== '' ||
      trimmedLast !== '' ||
      (parsedAge !== null && !isNaN(parsedAge));

    // Filter across the entire user dataset
    const filteredUsers = users.filter((user) => {
      // 1. Single query search (matches first name, last name, title, age, or full name)
      if (trimmedQuery) {
        const firstName = (user.name?.first || '').toLowerCase();
        const lastName = (user.name?.last || '').toLowerCase();
        const fullName = `${firstName} ${lastName}`;
        const title = (user.name?.title || '').toLowerCase();
        const ageStr = String(user.dob?.age ?? '');

        const matchesQuery =
          fullName.includes(trimmedQuery) ||
          firstName.includes(trimmedQuery) ||
          lastName.includes(trimmedQuery) ||
          title.includes(trimmedQuery) ||
          ageStr === trimmedQuery;

        if (!matchesQuery) return false;
      }

      // 2. Specific field filters (if provided)
      if (trimmedFirst && !user.name.first.toLowerCase().includes(trimmedFirst)) {
        return false;
      }

      if (trimmedLast && !user.name.last.toLowerCase().includes(trimmedLast)) {
        return false;
      }

      if (parsedAge !== null && !isNaN(parsedAge)) {
        if (user.dob?.age !== parsedAge) {
          return false;
        }
      }

      return true;
    });

    const totalPages = Math.max(1, Math.ceil(filteredUsers.length / pageSize));
    const validPage = Math.min(currentPage, totalPages);

    const startIndex = (validPage - 1) * pageSize;
    const paginatedUsers = filteredUsers.slice(startIndex, startIndex + pageSize);

    return {
      filteredUsers,
      paginatedUsers,
      hasActiveFilters,
      totalPages,
    };
  }, [users, filters, currentPage, pageSize]);
}
