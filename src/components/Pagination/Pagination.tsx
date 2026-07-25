import styles from './Pagination.module.scss';

interface PaginationProps {
  currentPage: number;
  totalPages?: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages = 10, onPageChange }: PaginationProps) {
  const getPageNumbers = () => {
    const pages: number[] = [];
    const maxVisible = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    const endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage + 1 < maxVisible) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav className={styles.paginationContainer} aria-label="Navegação de páginas">
      <button
        type="button"
        className={styles.pageButton}
        onClick={handlePrevious}
        disabled={currentPage <= 1}
        aria-label="Página anterior"
      >
        &lt;
      </button>

      {pageNumbers.map((page) => {
        const isActive = page === currentPage;
        return (
          <button
            key={page}
            type="button"
            className={`${styles.pageButton} ${isActive ? styles.activePage : ''}`}
            onClick={() => onPageChange(page)}
            aria-current={isActive ? 'page' : undefined}
            aria-label={`Página ${page}`}
          >
            {page}
          </button>
        );
      })}

      <button
        type="button"
        className={styles.pageButton}
        onClick={handleNext}
        disabled={currentPage >= totalPages}
        aria-label="Próxima página"
      >
        &gt;
      </button>
    </nav>
  );
}
