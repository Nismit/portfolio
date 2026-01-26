'use client';

import { Command } from 'cmdk';
import { useRouter } from 'next/navigation';
import type { Dispatch, FC, ReactElement, SetStateAction } from 'react';
import { useCallback, useEffect } from 'react';
import { Email, ExternalArrow, GitHub, LinkedIn, Twitter } from '@/components/Icons';
import Shortcut from '@/components/Shortcut';
import Typography from '@/components/Typography';

const CommandItem = ({
  content,
  command,
  isExternalLink,
  icon,
}: {
  content: string;
  command?: string;
  isExternalLink?: boolean;
  icon?: ReactElement;
}) => (
  <>
    <div className="flex items-center justify-between gap-4">
      {icon}
      <Typography variant="body" component="span">
        {content}
      </Typography>
    </div>
    {command && <Shortcut content={command} />}
    {isExternalLink && <ExternalArrow isSmall />}
  </>
);

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const CommandMenu: FC<Props> = ({ open, setOpen }) => {
  const router = useRouter();

  const keyDown = useCallback(
    (e: KeyboardEvent) => {
      if ((e.key === 'k' && e.metaKey) || (e.key === '/' && e.metaKey)) {
        setOpen((open) => !open);
      }
    },
    [setOpen]
  );

  useEffect(() => {
    document.addEventListener('keydown', keyDown);
    return () => document.removeEventListener('keydown', keyDown);
  }, [keyDown]);

  return (
    <Command.Dialog open={open} onOpenChange={setOpen} label="Command Menu">
      <Command.Input placeholder="Type a command or search keywords" />

      <Command.List>
        <Command.Empty>
          <Typography variant="body" component="span">
            No results found.
          </Typography>
        </Command.Empty>

        <Command.Group heading="Pages">
          <Command.Item
            onSelect={() => {
              setOpen(false);
              router.push('/');
            }}
          >
            <CommandItem content="About" command="A" />
          </Command.Item>
          <Command.Item
            onSelect={() => {
              setOpen(false);
              router.push('/projects');
            }}
          >
            <CommandItem content="Projects" command="P" />
          </Command.Item>
          <Command.Item
            onSelect={() => {
              setOpen(false);
              router.push('/uses');
            }}
          >
            <CommandItem content="Uses" command="U" />
          </Command.Item>
          <Command.Item
            onSelect={() => {
              setOpen(false);
              router.push('/snippets');
            }}
          >
            <CommandItem content="Snippets" command="S" />
          </Command.Item>
        </Command.Group>

        <Command.Group heading="Social">
          <Command.Item
            onSelect={() => window.open('https://twitter.com/nismit_', '_blank', 'noopener')}
          >
            <CommandItem content="Twitter" isExternalLink icon={<Twitter />} />
          </Command.Item>
          <Command.Item
            onSelect={() => window.open('https://github.com/Nismit', '_blank', 'noopener')}
          >
            <CommandItem content="GitHub" isExternalLink icon={<GitHub />} />
          </Command.Item>
          <Command.Item
            onSelect={() =>
              window.open('https://www.linkedin.com/in/nismit/', '_blank', 'noopener')
            }
          >
            <CommandItem content="LinkedIn" isExternalLink icon={<LinkedIn />} />
          </Command.Item>
          <Command.Item
            onSelect={() =>
              window.open('mailto:nismit.dev@gmail.com?subject=Hello%20Mitch', '_blank', 'noopener')
            }
          >
            <CommandItem content="Email" isExternalLink icon={<Email />} />
          </Command.Item>
        </Command.Group>
      </Command.List>
    </Command.Dialog>
  );
};

export default CommandMenu;
