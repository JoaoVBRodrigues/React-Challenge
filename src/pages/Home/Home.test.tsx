import { render, screen, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Home } from './Home';
import { useUsers } from '@/hooks/useUsers';
import { useUserSearch } from '@/hooks/useUserSearch';
import React from 'react';

jest.mock('@/hooks/useUsers');
jest.mock('@/hooks/useUserSearch');

const mockUseUsers = useUsers as jest.MockedFunction<typeof useUsers>;
const mockUseUserSearch = useUserSearch as jest.MockedFunction<typeof useUserSearch>;

describe('Home component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = () => {
    return render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
  };

  it('should render the layout with SearchBar and UserList', () => {
    mockUseUsers.mockReturnValue({
      allUsers: [],
      isLoading: false,
      isError: false,
      refetch: jest.fn(),
      isFetching: false,
    } as any);

    mockUseUserSearch.mockReturnValue({
      paginatedUsers: [],
      totalPages: 0,
      totalUsers: 0,
    });

    renderComponent();

    expect(screen.getByText('Find People')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search people....')).toBeInTheDocument();
  });

  it('should render Pagination when there are results and not loading', () => {
    mockUseUsers.mockReturnValue({
      allUsers: [],
      isLoading: false,
      isError: false,
    } as any);

    mockUseUserSearch.mockReturnValue({
      paginatedUsers: [],
      totalPages: 3,
      totalUsers: 30,
    });

    renderComponent();
    // Verify that a pagination element is present. E.g., the page "1" button.
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('should not render Pagination when loading', () => {
    mockUseUsers.mockReturnValue({
      allUsers: [],
      isLoading: true,
      isError: false,
    } as any);

    mockUseUserSearch.mockReturnValue({
      paginatedUsers: [],
      totalPages: 3,
      totalUsers: 30,
    });

    renderComponent();

    // Using queryByRole for navigation, which is used in Pagination component
    const nav = screen.queryByRole('navigation');
    expect(nav).not.toBeInTheDocument();
  });

  it('should not render Pagination when there is an error', () => {
    mockUseUsers.mockReturnValue({
      allUsers: [],
      isLoading: false,
      isError: true,
    } as any);

    mockUseUserSearch.mockReturnValue({
      paginatedUsers: [],
      totalPages: 3,
      totalUsers: 30,
    });

    renderComponent();

    const nav = screen.queryByRole('navigation');
    expect(nav).not.toBeInTheDocument();
  });
});
