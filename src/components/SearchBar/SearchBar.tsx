import { useEffect, useState } from 'react';
import type { SearchFilters } from '@/types/filter';
import { useDebounce } from '@/hooks/useDebounce';
import styles from './SearchBar.module.scss';

interface SearchBarProps {
  onSearch: (filters: SearchFilters) => void;
  initialFilters?: Partial<SearchFilters>;
}

export function SearchBar({ onSearch, initialFilters }: SearchBarProps) {
  const [firstName, setFirstName] = useState(initialFilters?.firstName ?? '');
  const [lastName, setLastName] = useState(initialFilters?.lastName ?? '');
  const [age, setAge] = useState(initialFilters?.age ?? '');

  const debouncedFirstName = useDebounce(firstName, 400);
  const debouncedLastName = useDebounce(lastName, 400);
  const debouncedAge = useDebounce(age, 400);

  useEffect(() => {
    onSearch({
      firstName: debouncedFirstName,
      lastName: debouncedLastName,
      age: debouncedAge,
    });
  }, [debouncedFirstName, debouncedLastName, debouncedAge, onSearch]);

  return (
    <form className={styles.searchContainer} onSubmit={(e) => e.preventDefault()}>
      <div className={styles.inputsWrapper}>
        <div className={styles.inputGroup}>
          <label htmlFor="search-first-name" className={styles.label}>
            First Name
          </label>
          <input
            id="search-first-name"
            type="text"
            className={styles.input}
            placeholder="Search first name..."
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="search-last-name" className={styles.label}>
            Last Name
          </label>
          <input
            id="search-last-name"
            type="text"
            className={styles.input}
            placeholder="Search last name..."
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="search-age" className={styles.label}>
            Age
          </label>
          <input
            id="search-age"
            type="number"
            min="0"
            max="120"
            className={styles.input}
            placeholder="Age..."
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
      </div>
    </form>
  );
}
