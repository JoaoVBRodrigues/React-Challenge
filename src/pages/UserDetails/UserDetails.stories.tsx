import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserDetails } from './UserDetails';
import type { User } from '@/types/user';

const mockUser: User = {
  login: { uuid: '12345-mock-id' },
  name: { first: 'Jennie', last: 'Nichols', title: 'Miss' },
  email: 'jennie.nichols@example.com',
  cell: '123-456-7890',
  picture: {
    large: 'https://randomuser.me/api/portraits/women/75.jpg',
    medium: 'https://randomuser.me/api/portraits/med/women/75.jpg',
    thumbnail: 'https://randomuser.me/api/portraits/thumb/women/75.jpg',
  },
  dob: { date: '1993-02-11T00:00:00.000Z', age: 30 },
  registered: { date: '2023-02-11T00:00:00.000Z', age: 1 },
  location: { street: { number: 123, name: 'Main St' }, city: 'Billings', country: 'United States' },
  nat: 'US',
};

const createQueryClient = (users: User[]) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: Infinity, // Prevent React Query from re-fetching
      },
    },
  });

  queryClient.setQueryData(['users', 'all'], {
    results: users,
    info: { seed: 'findpeople', results: users.length, page: 1, version: '1.4' },
  });

  return queryClient;
};

const meta: Meta<typeof UserDetails> = {
  title: 'Pages/UserDetails',
  component: UserDetails,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof UserDetails>;

export const Default: Story = {
  decorators: [
    (Story) => (
      <QueryClientProvider client={createQueryClient([mockUser])}>
        <MemoryRouter initialEntries={['/user/12345-mock-id']}>
          <Routes>
            <Route path="/user/:id" element={<Story />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    ),
  ],
};

export const NotFound: Story = {
  decorators: [
    (Story) => (
      <QueryClientProvider client={createQueryClient([])}>
        <MemoryRouter initialEntries={['/user/invalid-id']}>
          <Routes>
            <Route path="/user/:id" element={<Story />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    ),
  ],
};
