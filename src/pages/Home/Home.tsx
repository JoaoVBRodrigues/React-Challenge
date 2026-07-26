import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useUsers } from '@/hooks/useUsers';
import { useUserSearch } from '@/hooks/useUserSearch';
import { UserList } from '@/components/UserList/UserList';
import { Pagination } from '@/components/Pagination/Pagination';
import { SearchBar } from '@/components/SearchBar/SearchBar';
import type { SearchFilters } from '@/types/filter';

export function Home() {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const filters: SearchFilters = {
    query: searchParams.get('q') || '',
  };

  const { allUsers, isLoading, isError } = useUsers();

  const handleSearch = useCallback(
    (newFilters: SearchFilters) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        if (newFilters.query) {
          next.set('q', newFilters.query);
        } else {
          next.delete('q');
        }

        if (newFilters.query !== filters.query) {
          next.delete('page');
        }

        return next;
      });
    },
    [setSearchParams, filters.query]
  );

  const handlePageChange = useCallback(
    (page: number) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        if (page > 1) {
          next.set('page', page.toString());
        } else {
          next.delete('page');
        }
        return next;
      });
    },
    [setSearchParams]
  );

  const { paginatedUsers, totalPages } = useUserSearch(allUsers, filters, currentPage, 10);

  return (
    <main style={{ padding: '2rem 1rem', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2.25rem' }}>
        Find People
      </h1>
      <SearchBar onSearch={handleSearch} initialFilters={filters} />
      <UserList users={paginatedUsers} isLoading={isLoading} isError={isError} />
      {!isLoading && !isError && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </main>
  );
}
