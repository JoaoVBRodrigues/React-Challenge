import type { QueryClient } from '@tanstack/react-query';
import type { RandomUserResponse, User } from '@/types/user';

const BASE_URL = 'https://randomuser.me/api/';
const DEFAULT_SEED = 'findpeople';

export async function getUsers(
  page: number = 1,
  resultsPerPage: number = 10
): Promise<RandomUserResponse> {
  const url = `${BASE_URL}?page=${page}&results=${resultsPerPage}&seed=${DEFAULT_SEED}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Falha ao buscar usuários da API (status ${response.status})`);
  }

  const data: RandomUserResponse = await response.json();
  return data;
}

export async function getAllUsers(totalCount: number = 500): Promise<RandomUserResponse> {
  const url = `${BASE_URL}?page=1&results=${totalCount}&seed=${DEFAULT_SEED}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Falha ao buscar usuários da API (status ${response.status})`);
  }

  const data: RandomUserResponse = await response.json();
  return data;
}

export function getUserById(queryClient: QueryClient, uuid: string): User | undefined;
export function getUserById(uuid: string, queryClient: QueryClient): User | undefined;
export function getUserById(
  arg1: QueryClient | string,
  arg2: QueryClient | string
): User | undefined {
  let queryClient: QueryClient;
  let uuid: string;

  if (typeof arg1 === 'string') {
    uuid = arg1;
    queryClient = arg2 as QueryClient;
  } else {
    queryClient = arg1;
    uuid = arg2 as string;
  }

  const cachedData = queryClient.getQueryData<RandomUserResponse>(['users', 'all']);
  return cachedData?.results?.find((user) => user.login.uuid === uuid);
}
