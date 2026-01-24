import type { FC } from 'react';
import { Command } from './styledComponents';

type Props = {
  content: string;
};

const Shortcut: FC<Props> = ({ content }) => <Command>{content}</Command>;

export default Shortcut;
