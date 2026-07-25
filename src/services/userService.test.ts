import { getUsers } from './userService';

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
});
