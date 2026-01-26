import Link from 'next/link';
import type { FC, ReactNode } from 'react';
import Typography from '@/components/Typography';
import type { Post } from '@/lib/api';

type Props = {
  post: Post;
  children: ReactNode;
};

const Article: FC<Props> = ({ post, children }) => {
  return (
    <article className="mb-12 [&_p]:text-primary-fade [&_ul]:text-primary-fade">
      <Typography variant="title" component="h2" margin={[0, 0, '1.5rem', 0]}>
        {post.title}
      </Typography>
      {children}
      <Typography variant="body" component="p">
        <Link
          href={`/snippets/category/${post.category}`}
          title={`Snippet Category of ${post.category}`}
        >
          <span className="inline-block py-0.5 px-5 bg-tertiary/80 rounded-3xl mt-4 before:content-['#']">
            {post.category}
          </span>
        </Link>
      </Typography>
      <Typography variant="body" component="p" color="rgb(var(--tertiary))">
        Last Updated: {post.date}
      </Typography>
    </article>
  );
};

export default Article;
