import Link from 'next/link';
import type { FC } from 'react';
import Typography from '@/components/Typography';

type Props = {
  categories: string[];
};

const Categories: FC<Props> = ({ categories }) => {
  return (
    <div className="relative">
      <ul className="p-0 m-0 flex flex-col gap-2 list-none fixed ml-[-150px]">
        {categories.map((category, index) => (
          <li key={`${index}-${category}`} className="capitalize">
            <Link href={`/snippets/category/${category}`}>
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
