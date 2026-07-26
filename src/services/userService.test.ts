import { QueryClient } from '@tanstack/react-query';
import { getUsers, getUserById } from './userService';

describe('userService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch users with correct URL parameters including fixed seed', async () => {
    const mockResponse = {
      results: [
        {
          name: { first: 'John', last: 'Doe' },
          email: 'john.doe@example.com',
          cell: '123-456-7890',
          picture: { large: 'url', medium: 'url', thumbnail: 'url' },
          dob: { date: '1990-01-01', age: 34 },
          registered: { date: '2020-01-01', age: 4 },
          location: { city: 'New York', country: 'USA' },
          login: { uuid: 'uuid-123' },
          nat: 'US',
        },
      ],
      info: { seed: 'findpeople', results: 10, page: 1, version: '1.4' },
    };

    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockResponse),
    } as unknown as Response);

    const data = await getUsers(1, 10);

    expect(globalThis.fetch).toHaveBeenCalledWith(
      'https://randomuser.me/api/?page=1&results=10&seed=findpeople'
    );
    expect(data.results).toHaveLength(1);
    expect(data.results[0].name.first).toBe('John');
    expect(data.info.seed).toBe('findpeople');
  });

  it('should throw an error when API response is not ok', async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 500,
    } as unknown as Response);

    await expect(getUsers(1, 10)).rejects.toThrow('Falha ao buscar usuários da API (status 500)');
  });

  describe('getUserById', () => {
    it('should find and return user by uuid from queryClient cache', () => {
      const queryClient = new QueryClient();
      const mockUser = {
        name: { first: 'Alice', last: 'Smith' },
        email: 'alice@example.com',
        cell: '111-222-3333',
        picture: { large: 'url', medium: 'url', thumbnail: 'url' },
        dob: { date: '1992-02-02', age: 32 },
        registered: { date: '2019-01-01', age: 5 },
        location: { city: 'Paris', country: 'France' },
        login: { uuid: 'target-uuid-123' },
        nat: 'FR',
      };

      queryClient.setQueryData(['users', 'all'], {
        results: [mockUser],
        info: { seed: 'findpeople', results: 1, page: 1, version: '1.4' },
      });

      const user = getUserById(queryClient, 'target-uuid-123');
      expect(user).toEqual(mockUser);
    });

    it('should return undefined if user uuid is not found in cache', () => {
      const queryClient = new QueryClient();
      queryClient.setQueryData(['users', 'all'], {
        results: [],
        info: { seed: 'findpeople', results: 0, page: 1, version: '1.4' },
      });

      const user = getUserById(queryClient, 'non-existent-uuid');
      expect(user).toBeUndefined();
    });

    it('should return undefined if queryClient cache is empty', () => {
      const queryClient = new QueryClient();
      const user = getUserById(queryClient, 'any-uuid');
      expect(user).toBeUndefined();
    });
  });
});
