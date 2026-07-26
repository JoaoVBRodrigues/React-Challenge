import type { RandomUserResponse } from '@/types/user';

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
