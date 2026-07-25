import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from './Pagination';

describe('Pagination Component', () => {
  it('should render page numbers and navigation buttons', () => {
    const handlePageChange = jest.fn();
    render(<Pagination currentPage={1} totalPages={5} onPageChange={handlePageChange} />);

    expect(screen.getByRole('button', { name: /página anterior/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /próxima página/i })).toBeEnabled();

    expect(screen.getByRole('button', { name: 'Página 1' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Página 2' })).toBeInTheDocument();
  });

  it('should highlight the active current page', () => {
    render(<Pagination currentPage={3} totalPages={5} onPageChange={jest.fn()} />);

    const activeBtn = screen.getByRole('button', { name: 'Página 3' });
    expect(activeBtn).toHaveAttribute('aria-current', 'page');
  });

  it('should trigger onPageChange when clicking a page number', () => {
    const handlePageChange = jest.fn();
    render(<Pagination currentPage={1} totalPages={5} onPageChange={handlePageChange} />);

    fireEvent.click(screen.getByRole('button', { name: 'Página 2' }));
    expect(handlePageChange).toHaveBeenCalledWith(2);
  });

  it('should trigger onPageChange when clicking next and previous buttons', () => {
    const handlePageChange = jest.fn();
    render(<Pagination currentPage={2} totalPages={5} onPageChange={handlePageChange} />);

    fireEvent.click(screen.getByRole('button', { name: /próxima página/i }));
    expect(handlePageChange).toHaveBeenCalledWith(3);

    fireEvent.click(screen.getByRole('button', { name: /página anterior/i }));
    expect(handlePageChange).toHaveBeenCalledWith(1);
  });
});
