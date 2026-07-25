import { useUsers } from '@/hooks/useUsers';
import { UserList } from '@/components/UserList/UserList';

export function Home() {
  const { data, isLoading, isError } = useUsers(1);

  return (
    <main style={{ padding: '2rem 1rem', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2.25rem' }}>
        Find People
      </h1>
      <UserList users={data?.results} isLoading={isLoading} isError={isError} />
    </main>
  );
}
