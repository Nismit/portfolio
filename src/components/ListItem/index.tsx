import Link from 'next/link';
import type { FC } from 'react';
import { Arrow, ExternalArrow } from '@/components/Icons/';
import Typography from '@/components/Typography';

type Props = {
  title: string;
  description: string;
  href: string;
};

const ListItem: FC<Props> = ({ title, description, href }) => {
  const isExternal = href.includes('https://');
  return (
    <Link
      href={href}
      className="flex items-center justify-between w-full py-4 no-underline [&:hover_span]:opacity-70 [&:hover_svg]:opacity-70 [&_span]:transition-opacity [&_span]:duration-300 [&_svg]:transition-opacity [&_svg]:duration-300 [&+a]:border-t [&+a]:border-primary-fade"
    >
      <div className="flex flex-col">
        <Typography variant="title" color="rgb(var(--primary))">
          {title}
        </Typography>
        <Typography variant="description" color="rgb(var(--primary-fade))">
          {description}
        </Typography>
      </div>
      {isExternal ? <ExternalArrow /> : <Arrow />}
    </Link>
  );
};

export default ListItem;
