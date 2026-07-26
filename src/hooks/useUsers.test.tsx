import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { useUsers } from './useUsers';
import * as userService from '@/services/userService';

jest.mock('@/services/userService');

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useUsers hook', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch and return all users dataset', async () => {
    const mockData = {
      results: [
        {
          name: { first: 'Jane', last: 'Doe' },
          email: 'jane.doe@example.com',
          cell: '987-654-3210',
          picture: { large: 'url', medium: 'url', thumbnail: 'url' },
          dob: { date: '1995-05-05', age: 29 },
          registered: { date: '2021-01-01', age: 3 },
          location: { city: 'London', country: 'UK' },
          login: { uuid: 'uuid-456' },
          nat: 'GB',
        },
      ],
      info: { seed: 'findpeople', results: 500, page: 1, version: '1.4' },
    };

    (userService.getAllUsers as jest.Mock).mockResolvedValue(mockData);

    const { result } = renderHook(() => useUsers(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(userService.getAllUsers).toHaveBeenCalledWith(500);
    expect(result.current.allUsers).toHaveLength(1);
    expect(result.current.allUsers[0].name.first).toBe('Jane');
    expect(result.current.isError).toBe(false);
  });
});
