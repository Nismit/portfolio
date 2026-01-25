import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Social from './index';

describe('Social', () => {
  it('renders all social links', () => {
    render(<Social />);

    expect(screen.getByTitle('Twitter')).toBeInTheDocument();
    expect(screen.getByTitle('GitHub')).toBeInTheDocument();
    expect(screen.getByTitle('LinkedIn')).toBeInTheDocument();
    expect(screen.getByTitle('Email')).toBeInTheDocument();
  });

  it('renders correct number of links', () => {
    render(<Social />);

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(4);
  });

  it('links open in new tab for external links', () => {
    render(<Social />);

    const twitterLink = screen.getByTitle('Twitter');
    expect(twitterLink).toHaveAttribute('target', '_blank');
    expect(twitterLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('has correct href for GitHub link', () => {
    render(<Social />);

    const githubLink = screen.getByTitle('GitHub');
    expect(githubLink).toHaveAttribute('href', 'https://github.com/Nismit');
  });
});
