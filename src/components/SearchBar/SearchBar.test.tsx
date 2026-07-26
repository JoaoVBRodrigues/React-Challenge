import { render, screen, fireEvent, act } from '@testing-library/react';
import { SearchBar } from './SearchBar';

describe('SearchBar Component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should render search input field correctly', () => {
    render(<SearchBar onSearch={jest.fn()} />);

    const input = screen.getByPlaceholderText('Search people....');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('autocomplete', 'off');
  });

  it('should call onSearch with debounced value after 400ms delay', () => {
    const handleSearch = jest.fn();
    render(<SearchBar onSearch={handleSearch} />);

    const input = screen.getByPlaceholderText('Search people....');

    fireEvent.change(input, { target: { value: 'Mariana' } });

    expect(handleSearch).not.toHaveBeenCalledWith({ query: 'Mariana' });

    act(() => {
      jest.advanceTimersByTime(400);
    });

    expect(handleSearch).toHaveBeenCalledWith({ query: 'Mariana' });
  });
});
