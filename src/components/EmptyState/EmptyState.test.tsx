import { render, screen } from '@testing-library/react';
import { EmptyState } from './EmptyState';

describe('EmptyState Component', () => {
  it('should render default title and subtitle', () => {
    render(<EmptyState />);

    expect(screen.getByText('Nenhum resultado encontrado')).toBeInTheDocument();
    expect(screen.getByText('Tente novamente utilizando outro termo')).toBeInTheDocument();
  });

  it('should render custom title and subtitle when passed as props', () => {
    render(<EmptyState title="Custom Title" subtitle="Custom Subtitle" />);

    expect(screen.getByText('Custom Title')).toBeInTheDocument();
    expect(screen.getByText('Custom Subtitle')).toBeInTheDocument();
  });
});
