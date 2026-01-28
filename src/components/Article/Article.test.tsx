import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { Post } from '@/lib/api';
import Article from './index';

describe('Article', () => {
  const mockPost: Post = {
    slug: 'test-post',
    date: '2024-01-15',
    title: 'Test Post Title',
    category: 'css',
    content: 'Test content',
  };

  it('renders post title', () => {
    render(<Article post={mockPost}>Content</Article>);

    expect(screen.getByRole('heading', { name: 'Test Post Title' })).toBeInTheDocument();
  });

  it('renders children content', () => {
    render(<Article post={mockPost}>Article Content Here</Article>);

    expect(screen.getByText('Article Content Here')).toBeInTheDocument();
  });

  it('renders category link', () => {
    render(<Article post={mockPost}>Content</Article>);

    const categoryLink = screen.getByRole('link', { name: 'css' });
    expect(categoryLink).toHaveAttribute('href', '/snippets/category/css');
  });

  it('renders last updated date', () => {
    render(<Article post={mockPost}>Content</Article>);

    expect(screen.getByText(/Last Updated: 2024-01-15/)).toBeInTheDocument();
  });
});
