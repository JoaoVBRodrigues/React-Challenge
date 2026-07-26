import { useEffect, useRef, useState } from 'react';
import type { SearchFilters } from '@/types/filter';
import { useDebounce } from '@/hooks/useDebounce';
import styles from './SearchBar.module.scss';

interface SearchBarProps {
  onSearch: (filters: SearchFilters) => void;
  initialFilters?: Partial<SearchFilters>;
}

export function SearchBar({ onSearch, initialFilters }: SearchBarProps) {
  const [query, setQuery] = useState(initialFilters?.query ?? '');

  const debouncedQuery = useDebounce(query, 400);

  const onSearchRef = useRef(onSearch);
  useEffect(() => {
    onSearchRef.current = onSearch;
  }, [onSearch]);

  useEffect(() => {
    onSearchRef.current({
      query: debouncedQuery,
    });
  }, [debouncedQuery]);

  return (
    <form className={styles.searchContainer} onSubmit={(e) => e.preventDefault()}>
      <div className={styles.inputWrapper}>
        <input
          id="search-people-input"
          type="text"
          className={styles.input}
          placeholder="Search people...."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
        />
      </div>
    </form>
  );
}
