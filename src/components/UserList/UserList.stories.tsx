import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { UserList } from './UserList';
import type { User } from '@/types/user';

const mockUsers: User[] = [
  {
    login: { uuid: 'gdc456dfvdfb' },
    name: { first: 'Jennie', last: 'Nicohls', title: 'Miss' },
    email: 'jennie.nicohls@example.com',
    cell: '123-456-7890',
    picture: { large: '', medium: '', thumbnail: '' },
    dob: { date: '1993-02-11T00:00:00.000Z', age: 30 },
    registered: { date: '2023-02-11T00:00:00.000Z', age: 1 },
    location: { street: { number: 123, name: 'Main St' }, city: 'New York', country: 'USA' },
    nat: 'US',
  },
  {
    login: { uuid: 'ywdd56edfvda' },
    name: { first: 'Wade', last: 'Warren', title: 'Mr' },
    email: 'wade.warren@example.com',
    cell: '987-654-3210',
    picture: { large: '', medium: '', thumbnail: '' },
    dob: { date: '1976-05-01T00:00:00.000Z', age: 47 },
    registered: { date: '2023-05-01T00:00:00.000Z', age: 1 },
    location: { street: { number: 123, name: 'Main St' }, city: 'London', country: 'UK' },
    nat: 'GB',
  },
  {
    login: { uuid: '19dayx0qfvdfz' },
    name: { first: 'Brooklyn', last: 'Simmons', title: 'Miss' },
    email: 'brooklyn.s@example.com',
    cell: '555-019-2831',
    picture: { large: '', medium: '', thumbnail: '' },
    dob: { date: '2005-05-05T00:00:00.000Z', age: 18 },
    registered: { date: '2015-05-05T00:00:00.000Z', age: 9 },
    location: { street: { number: 123, name: 'Main St' }, city: 'Sydney', country: 'Australia' },
    nat: 'AU',
  },
];

const meta: Meta<typeof UserList> = {
  title: 'Components/UserList',
  component: UserList,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem' }}>
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof UserList>;

export const Default: Story = {
  args: {
    users: mockUsers,
    isLoading: false,
    isError: false,
  },
};

export const Loading: Story = {
  args: {
    users: [],
    isLoading: true,
    isError: false,
  },
};

export const Empty: Story = {
  args: {
    users: [],
    isLoading: false,
    isError: false,
  },
};

export const ErrorState: Story = {
  args: {
    users: [],
    isLoading: false,
    isError: true,
    errorMessage: 'Não foi possível carregar os usuários.',
  },
};
