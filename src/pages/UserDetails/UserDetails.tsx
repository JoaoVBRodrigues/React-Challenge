import { useParams } from 'react-router-dom';

export function UserDetails() {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h1>UserDetails</h1>
      {id && <p>ID do usuário: {id}</p>}
    </div>
  );
}
