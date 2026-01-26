import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import Header from './index';

// Mock next/navigation for CommandMenu
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe('Header', () => {
  it('renders the logo link', () => {
    render(<Header />);
    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('renders the Menu button', () => {
    render(<Header />);
    expect(screen.getByText('Menu')).toBeInTheDocument();
  });

  it('renders keyboard shortcuts', () => {
    render(<Header />);
    expect(screen.getByText('⌘')).toBeInTheDocument();
    expect(screen.getByText('/')).toBeInTheDocument();
  });

  it('opens command menu when Menu button is clicked', async () => {
    const user = userEvent.setup();
    render(<Header />);

    const menuButton = screen.getByText('Menu');
    await user.click(menuButton);

    // After clicking, the command dialog should be open
    // cmdk renders with role="dialog"
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});
