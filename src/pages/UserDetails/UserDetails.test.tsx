import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { UserDetails } from './UserDetails';
import { useUser } from '@/hooks/useUser';
import React from 'react';

jest.mock('@/hooks/useUser');

describe('UserDetails component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = (initialEntry: string) => {
    return render(
      <MemoryRouter initialEntries={[initialEntry]}>
        <Routes>
          <Route path="/user/:id" element={<UserDetails />} />
          <Route path="*" element={<div>Página Não Encontrada (404)</div>} />
        </Routes>
      </MemoryRouter>
    );
  };

  it('should render loading state initially', () => {
    (useUser as jest.Mock).mockReturnValue({
      user: undefined,
      isLoading: true,
      isError: false,
    });

    renderComponent('/user/123');

    expect(screen.getByText('Carregando perfil...')).toBeInTheDocument();
  });

  it('should render NotFound component if user is not found or error occurs', () => {
    (useUser as jest.Mock).mockReturnValue({
      user: undefined,
      isLoading: false,
      isError: true,
    });

    renderComponent('/user/invalid-id');

    expect(screen.getByText('Página Não Encontrada (404)')).toBeInTheDocument();
  });

  it('should render user details when user is found', () => {
    const mockUser = {
      name: { first: 'John', last: 'Doe', title: 'Mr' },
      email: 'john.doe@example.com',
      picture: { large: 'https://example.com/john.jpg' },
      registered: { date: '2020-01-01T00:00:00.000Z' },
      dob: { age: 34 },
      login: { uuid: '123' },
    };

    (useUser as jest.Mock).mockReturnValue({
      user: mockUser,
      isLoading: false,
      isError: false,
    });

    renderComponent('/user/123');

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getAllByText('Mr')[0]).toBeInTheDocument();
    expect(screen.getByText('34')).toBeInTheDocument();

    const photo = screen.getByAltText('Foto de John Doe');
    expect(photo).toHaveAttribute('src', 'https://example.com/john.jpg');
  });
});
