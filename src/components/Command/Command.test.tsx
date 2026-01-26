import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import CommandMenu from './index';

const mockPush = vi.fn();
const mockWindowOpen = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('CommandMenu', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock window.open
    vi.stubGlobal('open', mockWindowOpen);
  });

  it('renders nothing when closed', () => {
    const setOpen = vi.fn();
    render(<CommandMenu open={false} setOpen={setOpen} />);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders dialog when open', () => {
    const setOpen = vi.fn();
    render(<CommandMenu open={true} setOpen={setOpen} />);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('renders search input placeholder', () => {
    const setOpen = vi.fn();
    render(<CommandMenu open={true} setOpen={setOpen} />);

    expect(screen.getByPlaceholderText('Type a command or search keywords')).toBeInTheDocument();
  });

  it('renders Pages group with navigation items', () => {
    const setOpen = vi.fn();
    render(<CommandMenu open={true} setOpen={setOpen} />);

    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Uses')).toBeInTheDocument();
    expect(screen.getByText('Snippets')).toBeInTheDocument();
  });

  it('renders Social group with external links', () => {
    const setOpen = vi.fn();
    render(<CommandMenu open={true} setOpen={setOpen} />);

    expect(screen.getByText('Twitter')).toBeInTheDocument();
    expect(screen.getByText('GitHub')).toBeInTheDocument();
    expect(screen.getByText('LinkedIn')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('navigates to home when About is selected', async () => {
    const user = userEvent.setup();
    const setOpen = vi.fn();
    render(<CommandMenu open={true} setOpen={setOpen} />);

    const aboutItem = screen.getByText('About');
    await user.click(aboutItem);

    expect(setOpen).toHaveBeenCalledWith(false);
    expect(mockPush).toHaveBeenCalledWith('/');
  });

  it('navigates to projects when Projects is selected', async () => {
    const user = userEvent.setup();
    const setOpen = vi.fn();
    render(<CommandMenu open={true} setOpen={setOpen} />);

    const projectsItem = screen.getByText('Projects');
    await user.click(projectsItem);

    expect(setOpen).toHaveBeenCalledWith(false);
    expect(mockPush).toHaveBeenCalledWith('/projects');
  });

  it('opens external link when Twitter is selected', async () => {
    const user = userEvent.setup();
    const setOpen = vi.fn();
    render(<CommandMenu open={true} setOpen={setOpen} />);

    const twitterItem = screen.getByText('Twitter');
    await user.click(twitterItem);

    expect(mockWindowOpen).toHaveBeenCalledWith(
      'https://twitter.com/nismit_',
      '_blank',
      'noopener'
    );
  });

  it('toggles menu with keyboard shortcut cmd+k', () => {
    const setOpen = vi.fn();
    render(<CommandMenu open={false} setOpen={setOpen} />);

    fireEvent.keyDown(document, { key: 'k', metaKey: true });

    expect(setOpen).toHaveBeenCalled();
  });

  it('toggles menu with keyboard shortcut cmd+/', () => {
    const setOpen = vi.fn();
    render(<CommandMenu open={false} setOpen={setOpen} />);

    fireEvent.keyDown(document, { key: '/', metaKey: true });

    expect(setOpen).toHaveBeenCalled();
  });
});
