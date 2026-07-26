import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { UserList } from './UserList';
import type { User } from '@/types/user';

const mockUsers: User[] = [
  {
    login: { uuid: 'uuid-test-123456' },
    name: { first: 'Jennie', last: 'Nicohls', title: 'Miss' },
    email: 'jennie@example.com',
    cell: '123-456-7890',
    picture: { large: '', medium: '', thumbnail: '' },
    dob: { date: '1993-02-11T00:00:00.000Z', age: 30 },
    registered: { date: '2023-02-11T00:00:00.000Z', age: 1 },
    location: { city: 'New York', country: 'USA' },
    nat: 'US',
  },
  {
    login: { uuid: 'uuid-test-789012' },
    name: { first: 'Wade', last: 'Warren', title: 'Mr' },
    email: 'wade@example.com',
    cell: '987-654-3210',
    picture: { large: '', medium: '', thumbnail: '' },
    dob: { date: '1976-05-01T00:00:00.000Z', age: 47 },
    registered: { date: '2023-05-01T00:00:00.000Z', age: 1 },
    location: { city: 'London', country: 'UK' },
    nat: 'GB',
  },
];

const renderUserList = (ui: React.ReactElement) => {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
};

describe('UserList Component', () => {
  it('should render mocked user list correctly', () => {
    renderUserList(<UserList users={mockUsers} />);

    expect(screen.getByText('Jennie')).toBeInTheDocument();
    expect(screen.getByText('Nicohls')).toBeInTheDocument();
    expect(screen.getByText('Miss')).toBeInTheDocument();

    expect(screen.getByText('Wade')).toBeInTheDocument();
    expect(screen.getByText('Warren')).toBeInTheDocument();
    expect(screen.getByText('Mr')).toBeInTheDocument();

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute('href', '/user/uuid-test-123456');
  });

  it('should display loading skeleton when isLoading is true', () => {
    renderUserList(<UserList isLoading={true} />);

    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByText('First Name')).toBeInTheDocument();
  });

  it('should display error message when isError is true', () => {
    renderUserList(
      <UserList isError={true} errorMessage="Não foi possível carregar os usuários." />
    );

    expect(screen.getByText('Não foi possível carregar os usuários.')).toBeInTheDocument();
  });

  it('should display EmptyState component when user list is empty', () => {
    renderUserList(<UserList users={[]} />);

    expect(screen.getByText('Nenhum resultado encontrado')).toBeInTheDocument();
    expect(screen.getByText('Tente novamente utilizando outro termo')).toBeInTheDocument();
  });
});
