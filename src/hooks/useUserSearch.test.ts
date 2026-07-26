import { renderHook } from '@testing-library/react';
import { useUserSearch } from './useUserSearch';
import type { User } from '@/types/user';
import type { SearchFilters } from '@/types/filter';

const mockUsers: User[] = Array.from({ length: 25 }, (_, i) => ({
  login: { uuid: `uuid-${i + 1}` },
  name: {
    first: i === 14 ? 'Mariana' : `First${i + 1}`,
    last: i === 14 ? 'Narváez' : `Last${i + 1}`,
    title: i % 2 === 0 ? 'Mr' : 'Miss',
  },
  email: `user${i + 1}@example.com`,
  cell: '123456789',
  picture: { large: '', medium: '', thumbnail: '' },
  dob: { date: '1990-01-01', age: 20 + i },
  registered: { date: '2020-01-01', age: 4 },
  location: { street: { number: 123, name: 'Main St' }, city: 'City', country: 'Country' },
  nat: 'US',
}));

describe('useUserSearch hook', () => {
  const emptyFilters: SearchFilters = { query: '' };

  it('should return paginated users for empty search filters', () => {
    const { result } = renderHook(() => useUserSearch(mockUsers, emptyFilters, 1, 10));

    expect(result.current.filteredUsers).toHaveLength(25);
    expect(result.current.paginatedUsers).toHaveLength(10);
    expect(result.current.totalPages).toBe(3);
    expect(result.current.hasActiveFilters).toBe(false);
  });

  it('should find user with single query matching first name', () => {
    const filters: SearchFilters = { query: 'Mariana' };
    const { result } = renderHook(() => useUserSearch(mockUsers, filters, 1, 10));

    expect(result.current.hasActiveFilters).toBe(true);
    expect(result.current.filteredUsers).toHaveLength(1);
    expect(result.current.paginatedUsers[0].name.first).toBe('Mariana');
    expect(result.current.totalPages).toBe(1);
  });

  it('should find user with query matching last name or age', () => {
    const filters: SearchFilters = { query: 'Narváez' };
    const { result } = renderHook(() => useUserSearch(mockUsers, filters, 1, 10));

    expect(result.current.filteredUsers).toHaveLength(1);
    expect(result.current.paginatedUsers[0].login.uuid).toBe('uuid-15');
  });

  it('should return empty results when search query does not match any user', () => {
    const filters: SearchFilters = { query: 'NonExistentName' };
    const { result } = renderHook(() => useUserSearch(mockUsers, filters, 1, 10));

    expect(result.current.filteredUsers).toHaveLength(0);
    expect(result.current.paginatedUsers).toHaveLength(0);
    expect(result.current.totalPages).toBe(1);
  });
});
