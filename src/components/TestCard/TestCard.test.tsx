import { render, screen } from '@testing-library/react';
import { TestCard } from './TestCard';

describe('TestCard Component', () => {
  it('should render the title and badge correctly', () => {
    render(<TestCard />);

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'Arquitetura Sass Configurada!'
    );
    expect(screen.getByText('CSS Modules + Variáveis Globais')).toBeInTheDocument();
  });
});
