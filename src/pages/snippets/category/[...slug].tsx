import type { ReactElement } from "react";
import React, { useId } from "react";
import * as production from "react/jsx-runtime";
import { GetStaticProps } from "next";
import { unified } from "unified";
import rehypeParse from "rehype-parse";
import rehypeReact, { Options } from "rehype-react";
import type { NextPageWithLayout } from "@/pages/_app";
import Layout from "@/components/Layout";
import Typography from "@/components/Typography";
import Article from "@/components/Article";
import { markdownToHtml } from "@/lib/transpiler";
import { getPostsFromCategory, getAllCategories, Post } from "@/lib/api";

const SNIPPETS_CATEGORY_PATH_PREFIX = "/snippets/category/";

const rehypeReactOptions: Options = {
  passNode: true,
  Fragment: production.Fragment,
  // @ts-expect-error: the react types are missing.
  jsx: production.jsx,
  // @ts-expect-error: the react types are missing.
  jsxs: production.jsxs,
  components: {},
};

const processor = unified()
  .use(rehypeParse, { fragment: true })
  .use(rehypeReact, rehypeReactOptions);

type Props = {
  tag: string;
  posts: Post[];
};

const Page: NextPageWithLayout<Props> = ({ tag, posts }) => {
  const postId = useId();
  return (
    <>
      <Typography variant="headline" component="h1" margin={[0, 0, "4rem", 0]}>
        Snippets
      </Typography>
      <Typography variant="body" component="p" margin={[0, 0, "2rem", 0]}>
        Tag: {tag}
      </Typography>
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

export const getStaticProps: GetStaticProps<{
  tag: string;
  posts: Post[];
}> = async (context) => {
  const slug = context.params?.slug;
  const tag = slug && typeof slug !== "string" ? slug?.[0] : "";

  const posts = await getPostsFromCategory(tag);
  const parsedPosts = await Promise.all(
    posts.map(async (post) => {
      return {
        ...post,
        ...{ content: await markdownToHtml(post.content) },
      };
    })
  );

  return {
    props: {
      tag,
      posts: parsedPosts,
    },
  };
};

export async function getStaticPaths() {
  const allCategories = await getAllCategories();
  const categoriesWithPrefix = allCategories.map(
    (category) => `${SNIPPETS_CATEGORY_PATH_PREFIX}${category}`
  );

  return {
    fallback: false,
    paths: categoriesWithPrefix,
  };
}
