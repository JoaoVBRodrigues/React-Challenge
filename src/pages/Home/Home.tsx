import { useState } from 'react';
import { useUsers } from '@/hooks/useUsers';
import { UserList } from '@/components/UserList/UserList';
import { Pagination } from '@/components/Pagination/Pagination';

export function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isError } = useUsers(currentPage);

  return (
    <main style={{ padding: '2rem 1rem', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2.25rem' }}>
        Find People
      </h1>
      <UserList users={data?.results} isLoading={isLoading} isError={isError} />
      <Pagination currentPage={currentPage} totalPages={10} onPageChange={setCurrentPage} />
    </main>
  );
}
