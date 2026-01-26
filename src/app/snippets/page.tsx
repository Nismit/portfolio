import * as production from 'react/jsx-runtime';
import rehypeParse from 'rehype-parse';
import rehypeReact, { type Options } from 'rehype-react';
import { unified } from 'unified';
import Article from '@/components/Article';
import Categories from '@/components/Categories';
import Typography from '@/components/Typography';
import { getAllPosts } from '@/lib/api';
import { markdownToHtml } from '@/lib/transpiler';

const rehypeReactOptions: Options = {
  passNode: true,
  Fragment: production.Fragment,
  jsx: production.jsx,
  jsxs: production.jsxs,
  components: {},
};

const processor = unified()
  .use(rehypeParse, { fragment: true })
  .use(rehypeReact, rehypeReactOptions);

export default async function SnippetsPage() {
  const posts = await getAllPosts();
  const parsedPosts = await Promise.all(
    posts.map(async (post) => ({
      ...post,
      content: await markdownToHtml(post.content),
    }))
  );

  const allCategories = posts
    .map((post) => post.category)
    .filter((category): category is string => !!category);
  const categories = [...new Set(allCategories)];

  return (
    <>
      <Typography variant="headline" component="h1" margin={[0, 0, '4rem', 0]}>
        Snippets
      </Typography>
      <Typography variant="body" component="p" margin={[0, 0, '2rem', 0]}>
        I&#39;m putting together some useful snippets that I&#39;ve used in my work and personal
        projects, either because I can&#39;t remember them myself or because I&#39;ve left notes in
        various places.
      </Typography>
      <Categories categories={categories} />
      {parsedPosts.map((post) => (
        <Article key={post.slug} post={post}>
          {processor.processSync(post.content).result}
        </Article>
      ))}
    </>
  );
}
