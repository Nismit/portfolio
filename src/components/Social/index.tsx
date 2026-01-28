import type { FC, ReactElement } from 'react';
import { Email, GitHub, LinkedIn, Twitter } from '@/components/Icons';
import SocialData from '@/data/social.json';

const IconMapping: Record<string, ReactElement> = {
  Twitter: <Twitter />,
  GitHub: <GitHub />,
  LinkedIn: <LinkedIn />,
  Email: <Email />,
};

const Social: FC = () => {
  return (
    <div className="flex gap-4 mt-12 pt-4 border-t border-primary-fade/80">
      {SocialData.social.map((data, index: number) => (
        <a
          title={data.title}
          href={data.link}
          key={`${index}-${data.title}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:text-primary/70 no-underline"
        >
          {IconMapping[data.title]}
        </a>
      ))}
    </div>
  );
};

export default Social;
