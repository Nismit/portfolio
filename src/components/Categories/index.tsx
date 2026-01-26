import Link from 'next/link';
import type { FC } from 'react';
import Typography from '@/components/Typography';

type Props = {
  categories: string[];
};

const Categories: FC<Props> = ({ categories }) => {
  return (
    <div className="relative">
      <ul className="p-0 m-0 flex flex-col gap-2 list-none fixed -ml-37.5">
        {categories.map((category, index) => (
          <li key={`${index}-${category}`} className="capitalize">
            <Link
              href={`/snippets/category/${category}`}
              className="text-primary underline underline-offset-[0.3rem] transition-colors duration-300 ease-[cubic-bezier(0.1,1.06,0.87,0.71)] hover:text-primary/70 hover:no-underline"
            >
              <Typography variant="body" component="span">
                {category}
              </Typography>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
