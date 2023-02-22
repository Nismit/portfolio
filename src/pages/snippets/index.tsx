import type { ReactElement } from "react";
import React, { useId } from "react";
import { unified } from "unified";
import rehypeParse from "rehype-parse";
import rehypeReact, { Options } from "rehype-react";
import type { NextPageWithLayout } from "@/pages/_app";
import Layout from "@/components/Layout";
import Typography from "@/components/Typography";
import Article from "@/components/Article";
import Categories from "@/components/Categories";
import { markdownToHtml } from "@/lib/transpiler";
import { getAllPosts, Post } from "@/lib/api";

const rehypeReactOptions: Options = {
  passNode: true,
  Fragment: React.Fragment,
  createElement: React.createElement,
  components: {},
};

const processor = unified()
  .use(rehypeParse, { fragment: true })
  .use(rehypeReact, rehypeReactOptions);

type Props = {
  categories: string[];
  posts: Post[];
};

const Page: NextPageWithLayout<Props> = ({ categories, posts }) => {
  const postId = useId();
  return (
    <>
      <Typography variant="headline" component="h1" margin={[0, 0, "4rem", 0]}>
        Snippets
      </Typography>
      <Typography variant="body" component="p" margin={[0, 0, "2rem", 0]}>
        I&#39;m putting together some useful snippets that I&#39;ve used in my
        work and personal projects, either because I can&#39;t remember them
        myself or because I&#39;ve left notes in various places.
      </Typography>
      <Categories categories={categories} />
      {posts.map((post) => (
        <Article key={`${postId}-${post.slug}`} post={post}>
          {processor.processSync(post.content).result}
        </Article>
      ))}
    </>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;

export async function getStaticProps() {
  const posts = await getAllPosts();
  const parsedPosts = await Promise.all(
    posts.map(async (post) => {
      return {
        ...post,
        ...{ content: await markdownToHtml(post.content) },
      };
    })
  );
  const allCategories = posts
    .map((post) => post.category)
    .filter((category): category is string => !!category);
  const categories = [...new Set(allCategories)];

  return {
    props: {
      categories,
      posts: parsedPosts,
    },
  };
}
