import { describe, expect, it } from 'vitest';
import {
  getAllCategories,
  getAllPosts,
  getAllSnippetsPath,
  getPostBySlug,
  getPostsFromCategory,
} from './api';

describe('getAllSnippetsPath', () => {
  it('should return array of markdown file paths', async () => {
    const paths = await getAllSnippetsPath();
    expect(Array.isArray(paths)).toBe(true);
    expect(paths.length).toBeGreaterThan(0);
    expect(paths.every((path) => path.endsWith('.md'))).toBe(true);
  });

  it('should return paths from snippets directory', async () => {
    const paths = await getAllSnippetsPath();
    expect(paths.every((path) => path.includes('snippets'))).toBe(true);
  });
});

describe('getPostBySlug', () => {
  it('should return post object with correct properties', () => {
    const post = getPostBySlug('src/data/snippets/css-2lines-center.md');
    expect(post).toHaveProperty('slug');
    expect(post).toHaveProperty('date');
    expect(post).toHaveProperty('title');
    expect(post).toHaveProperty('category');
    expect(post).toHaveProperty('content');
  });

  it('should parse frontmatter correctly', () => {
    const post = getPostBySlug('src/data/snippets/css-2lines-center.md');
    expect(post.slug).toBe('snippets/css-2lines-center');
    expect(post.title).toBe('Centering item with 2 lines of CSS code');
    expect(post.category).toBe('css');
  });

  it('should include markdown content', () => {
    const post = getPostBySlug('src/data/snippets/css-2lines-center.md');
    expect(post.content).toContain('Codepen');
  });
});

describe('getAllPosts', () => {
  it('should return array of posts', async () => {
    const posts = await getAllPosts();
    expect(Array.isArray(posts)).toBe(true);
    expect(posts.length).toBeGreaterThan(0);
  });

  it('should sort posts by date descending', async () => {
    const posts = await getAllPosts();
    if (posts.length > 1) {
      const firstDate = new Date(posts[0].date).getTime();
      const secondDate = new Date(posts[1].date).getTime();
      expect(firstDate).toBeGreaterThanOrEqual(secondDate);
    }
  });
});

describe('getAllCategories', () => {
  it('should return array of unique categories', async () => {
    const categories = await getAllCategories();
    expect(Array.isArray(categories)).toBe(true);
    const uniqueCategories = [...new Set(categories)];
    expect(categories.length).toBe(uniqueCategories.length);
  });

  it('should include css category', async () => {
    const categories = await getAllCategories();
    expect(categories).toContain('css');
  });
});

describe('getPostsFromCategory', () => {
  it('should return posts filtered by category', async () => {
    const posts = await getPostsFromCategory('css');
    expect(Array.isArray(posts)).toBe(true);
    expect(posts.every((post) => post.category === 'css')).toBe(true);
  });

  it('should return empty array for non-existent category', async () => {
    const posts = await getPostsFromCategory('nonexistent');
    expect(posts).toEqual([]);
  });
});
