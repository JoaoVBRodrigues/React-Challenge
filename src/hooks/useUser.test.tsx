import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { useUser } from './useUser';
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

describe('useUser hook', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return user from cache when available', async () => {
    const mockUser = {
      name: { first: 'John', last: 'Doe' },
      email: 'john.doe@example.com',
      cell: '123-456-7890',
      picture: { large: 'url', medium: 'url', thumbnail: 'url' },
      dob: { date: '1990-01-01', age: 34 },
      registered: { date: '2020-01-01', age: 4 },
      location: { city: 'New York', country: 'USA' },
      login: { uuid: 'uuid-123' },
      nat: 'US',
    };

    const mockResponse = {
      results: [mockUser],
      info: { seed: 'findpeople', results: 1, page: 1, version: '1.4' },
    };

    (userService.getAllUsers as jest.Mock).mockResolvedValue(mockResponse);
    (userService.getUserById as jest.Mock).mockImplementation((_qc, uuid) =>
      uuid === 'uuid-123' ? mockUser : undefined
    );

    const { result } = renderHook(() => useUser('uuid-123'), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.user).toEqual(mockUser);
    expect(result.current.isError).toBe(false);
  });

  it('should return undefined user when uuid does not exist in cached data', async () => {
    const mockResponse = {
      results: [],
      info: { seed: 'findpeople', results: 0, page: 1, version: '1.4' },
    };

    (userService.getAllUsers as jest.Mock).mockResolvedValue(mockResponse);
    (userService.getUserById as jest.Mock).mockReturnValue(undefined);

    const { result } = renderHook(() => useUser('invalid-uuid'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.user).toBeUndefined();
  });
});
