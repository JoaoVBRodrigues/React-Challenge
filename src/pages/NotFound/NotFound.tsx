import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div>
      <h1>Página Não Encontrada (404)</h1>
      <Link to="/">Voltar para a Home</Link>
    </div>
  );
}
