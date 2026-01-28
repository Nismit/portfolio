import type { FC } from 'react';

type Props = {
  content: string;
};

const Shortcut: FC<Props> = ({ content }) => (
  <span className="inline-flex items-center justify-center w-5 h-5 text-sm leading-none text-primary rounded bg-tertiary">
    {content}
  </span>
);

export default Shortcut;
