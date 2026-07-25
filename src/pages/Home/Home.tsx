import { useUsers } from '@/hooks/useUsers';

export function Home() {
  const { data, isLoading, isError } = useUsers(1);

  if (isLoading) {
    return <p>Carregando usuários...</p>;
  }

  if (isError) {
    return <p>Erro ao carregar usuários.</p>;
  }

  return (
    <div>
      <h1>Home</h1>
      <pre style={{ background: '#f1f5f9', padding: '1rem', borderRadius: '8px', overflow: 'auto' }}>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}
