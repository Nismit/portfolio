'use client';

import type { FC, ReactElement } from 'react';
import { Email, GitHub, LinkedIn, Twitter } from '@/components/Icons';
import SocialData from '@/data/social.json';
import { Container, Link } from './styledComponents';

const IconMapping: Record<string, ReactElement> = {
  Twitter: <Twitter />,
  GitHub: <GitHub />,
  LinkedIn: <LinkedIn />,
  Email: <Email />,
};

const Social: FC = () => {
  return (
    <Container>
      {SocialData.social.map((data, index: number) => (
        <Link
          title={data.title}
          href={data.link}
          key={`${index}-${data.title}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {IconMapping[data.title]}
        </Link>
      ))}
    </Container>
  );
};

export default Social;
