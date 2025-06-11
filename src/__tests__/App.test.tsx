import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';

// Mocking fetch globally
beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          { _id: '1', name: 'John Doe', email: 'john@example.com' },
          { _id: '2', name: 'Jane Smith', email: 'jane@example.com' },
        ]),
    })
  ) as jest.Mock;
});

afterEach(() => {
  jest.restoreAllMocks();
});

test('renders user list from API', async () => {
  render(<App />);

  expect(screen.getByText(/Users from Backend/i)).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/Jane Smith/i)).toBeInTheDocument();
  });
});

test('shows loading message when users list is empty', async () => {
  (global.fetch as jest.Mock).mockImplementationOnce(() =>
    Promise.resolve({
      json: () => Promise.resolve([]),
    })
  );

  render(<App />);

  await waitFor(() => {
    expect(screen.getByText(/No users found or loading/i)).toBeInTheDocument();
  });
});
