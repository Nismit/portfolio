import fg from 'fast-glob';
import fs from 'fs';
import matter from 'gray-matter';
import { join } from 'path';

export type Post = {
  slug: string;
  date: string;
  title: string;
  category: string;
  content: string;
};

export async function getAllSnippetsPath() {
  return await fg('src/data/snippets/**/*.md');
}

export function getPostBySlug(slug: string): Post {
  const realSlug = slug.replace(/src\/data\//, '').replace(/\.md$/, '');
  const filePath = join(process.cwd(), `src/data/${realSlug}.md`);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug: realSlug,
    date: data.date,
    title: data.title,
    category: data.category,
    content: content,
  };
}

export async function getAllPosts() {
  const allPostPaths = await getAllSnippetsPath();
  const posts = allPostPaths
    .map((path) => getPostBySlug(path))
    .sort((a, b) => (new Date(a.date).getTime() > new Date(b.date).getTime() ? -1 : 1));
  return [...posts];
}

export function getTagsFromPosts(slug: string) {
  const fileContents = fs.readFileSync(slug, 'utf8');
  const { data } = matter(fileContents);
  return data?.category;
}

export async function getAllCategories() {
  const allPostPaths = await getAllSnippetsPath();
  const allCategories: Array<string | undefined> = allPostPaths.map((slug) =>
    getTagsFromPosts(slug)
  );
  const filter = allCategories.filter((category): category is string => !!category);
  const categories = [...new Set(filter.flat())];
  return categories;
}

export async function getPostsFromCategory(category: string) {
  const allPostPaths = await getAllSnippetsPath();
  const posts = allPostPaths
    .map((path) => getPostBySlug(path))
    .sort((a, b) => (new Date(a.date).getTime() > new Date(b.date).getTime() ? -1 : 1));
  const filteredPosts = posts.filter((post) => post.category === category);
  return [...filteredPosts];
}
