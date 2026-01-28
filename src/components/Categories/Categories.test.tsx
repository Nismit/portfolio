import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Categories from './index';

describe('Categories', () => {
  it('renders all categories', () => {
    const categories = ['css', 'javascript', 'typescript'];
    render(<Categories categories={categories} />);

    expect(screen.getByText('css')).toBeInTheDocument();
    expect(screen.getByText('javascript')).toBeInTheDocument();
    expect(screen.getByText('typescript')).toBeInTheDocument();
  });

  it('renders correct number of list items', () => {
    const categories = ['css', 'javascript'];
    render(<Categories categories={categories} />);

    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(2);
  });

  it('creates links to category pages', () => {
    const categories = ['css'];
    render(<Categories categories={categories} />);

    const link = screen.getByRole('link', { name: 'css' });
    expect(link).toHaveAttribute('href', '/snippets/category/css');
  });

  it('renders empty list when no categories', () => {
    render(<Categories categories={[]} />);

    const listItems = screen.queryAllByRole('listitem');
    expect(listItems).toHaveLength(0);
  });
});
