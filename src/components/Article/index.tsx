import Link from 'next/link';
import type { FC, ReactNode } from 'react';
import Typography from '@/components/Typography';
import type { Post } from '@/lib/api';
import { _Article, CategoryLink } from './styledComponents';

type Props = {
  post: Post;
  children: ReactNode;
};

const Article: FC<Props> = ({ post, children }) => {
  return (
    <_Article>
      <Typography variant="title" component="h2" margin={[0, 0, '1.5rem', 0]}>
        {post.title}
      </Typography>
      {children}
      <Typography variant="body" component="p">
        <Link
          href={`/snippets/category/${post.category}`}
          passHref
          title={`Snippet Category of ${post.category}`}
        >
          <CategoryLink>{post.category}</CategoryLink>
        </Link>
      </Typography>
      <Typography variant="body" component="p" color="rgb(var(--tertiary))">
        Last Updated: {post.date}
      </Typography>
    </_Article>
  );
};

export default Article;
