import * as production from 'react/jsx-runtime';
import rehypeParse from 'rehype-parse';
import rehypeReact, { type Options } from 'rehype-react';
import { unified } from 'unified';
import Article from '@/components/Article';
import Typography from '@/components/Typography';
import { getAllCategories, getPostsFromCategory } from '@/lib/api';
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

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateStaticParams() {
  const allCategories = await getAllCategories();
  return allCategories.map((category) => ({
    slug: [category],
  }));
}

export default async function SnippetsCategoryPage({ params }: Props) {
  const { slug } = await params;
  const tag = slug?.[0] ?? '';

  const posts = await getPostsFromCategory(tag);
  const parsedPosts = await Promise.all(
    posts.map(async (post) => ({
      ...post,
      content: await markdownToHtml(post.content),
    }))
  );

  return (
    <>
      <Typography variant="headline" component="h1" margin={[0, 0, '4rem', 0]}>
        Snippets
      </Typography>
      <Typography variant="body" component="p" margin={[0, 0, '2rem', 0]}>
        Tag: {tag}
      </Typography>
      {parsedPosts.map((post) => (
        <Article key={post.slug} post={post}>
          {processor.processSync(post.content).result}
        </Article>
      ))}
    </>
  );
}
