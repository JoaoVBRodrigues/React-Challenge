import { useCallback, useState } from 'react';
import { useUsers } from '@/hooks/useUsers';
import { useUserSearch } from '@/hooks/useUserSearch';
import { UserList } from '@/components/UserList/UserList';
import { Pagination } from '@/components/Pagination/Pagination';
import { SearchBar } from '@/components/SearchBar/SearchBar';
import type { SearchFilters } from '@/types/filter';

export function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
  });

  const { allUsers, isLoading, isError } = useUsers();

  const handleSearch = useCallback((newFilters: SearchFilters) => {
    setFilters((prev) => {
      if (prev.query === newFilters.query) {
        return prev;
      }
      setCurrentPage(1);
      return newFilters;
    });
  }, []);

  const { paginatedUsers, totalPages } = useUserSearch(allUsers, filters, currentPage, 10);

  return (
    <main style={{ padding: '2rem 1rem', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2.25rem' }}>
        Find People
      </h1>
      <SearchBar onSearch={handleSearch} />
      <UserList users={paginatedUsers} isLoading={isLoading} isError={isError} />
      {!isLoading && !isError && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </main>
  );
}
