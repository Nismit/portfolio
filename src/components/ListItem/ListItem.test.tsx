import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ListItem from './index';

describe('ListItem', () => {
  it('renders title and description', () => {
    render(<ListItem title="Test Title" description="Test Description" href="/test" />);

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('creates internal link for non-https URLs', () => {
    render(<ListItem title="Internal" description="Internal link" href="/internal" />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/internal');
  });

  it('creates external link for https URLs', () => {
    render(<ListItem title="External" description="External link" href="https://example.com" />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'https://example.com');
  });
});
