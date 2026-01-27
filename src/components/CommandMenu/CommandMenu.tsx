'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { useRouter } from 'next/navigation';
import type { Dispatch, SetStateAction } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Email, GitHub, LinkedIn, Twitter } from '@/components/Icons';
import { CommandInput } from './CommandInput';
import { CommandList } from './CommandList';
import { CommandContext } from './context';
import type { CommandItemData } from './types';

const ITEMS: CommandItemData[] = [
  // Pages
  { id: 'about', label: 'About', shortcut: 'A', group: 'Pages', type: 'navigate', href: '/' },
  {
    id: 'projects',
    label: 'Projects',
    shortcut: 'P',
    group: 'Pages',
    type: 'navigate',
    href: '/projects',
  },
  { id: 'uses', label: 'Uses', shortcut: 'U', group: 'Pages', type: 'navigate', href: '/uses' },
  {
    id: 'snippets',
    label: 'Snippets',
    shortcut: 'S',
    group: 'Pages',
    type: 'navigate',
    href: '/snippets',
  },
  // Social
  {
    id: 'twitter',
    label: 'Twitter',
    group: 'Social',
    type: 'external',
    href: 'https://twitter.com/nismit_',
    icon: <Twitter />,
  },
  {
    id: 'github',
    label: 'GitHub',
    group: 'Social',
    type: 'external',
    href: 'https://github.com/Nismit',
    icon: <GitHub />,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    group: 'Social',
    type: 'external',
    href: 'https://www.linkedin.com/in/nismit/',
    icon: <LinkedIn />,
  },
  {
    id: 'email',
    label: 'Email',
    group: 'Social',
    type: 'external',
    href: 'mailto:nismit.dev@gmail.com?subject=Hello%20Mitch',
    icon: <Email />,
  },
];

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export const CommandMenu = ({ open, setOpen }: Props) => {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [activeId, setActiveId] = useState<string | null>(null);

  const filteredItems = useMemo(() => {
    if (!search.trim()) return ITEMS;
    const query = search.toLowerCase();
    return ITEMS.filter((item) => item.label.toLowerCase().includes(query));
  }, [search]);

  useEffect(() => {
    if (!open) {
      setSearch('');
      setActiveId(null);
    }
  }, [open]);

  useEffect(() => {
    if (open && filteredItems.length > 0 && !activeId) {
      setActiveId(filteredItems[0].id);
    }
  }, [open, filteredItems, activeId]);

  const handleSelect = useCallback(
    (item: CommandItemData) => {
      setOpen(false);
      if (item.type === 'navigate') {
        router.push(item.href);
      } else {
        window.open(item.href, '_blank', 'noopener');
      }
    },
    [router, setOpen]
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.key === 'k' && e.metaKey) || (e.key === '/' && e.metaKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [setOpen]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-background/70 backdrop-blur-[3px] data-[state=open]:animate-overlay-show" />
        <Dialog.Content
          className="fixed top-1/2 left-1/2 w-[90vw] max-w-160 rounded-lg overflow-hidden shadow-[0_0_1px_1px_rgba(255,255,255,0.1)] bg-cmdk-bg translate-x-[-50%] translate-y-[-50%] data-[state=open]:animate-content-show"
          aria-describedby={undefined}
        >
          <Dialog.Title className="sr-only">Command Menu</Dialog.Title>
          <CommandContext.Provider
            value={{
              open,
              onOpenChange: setOpen,
              search,
              onSearchChange: setSearch,
              activeId,
              setActiveId,
              filteredItems,
            }}
          >
            <CommandInput />
            <CommandList onSelect={handleSelect} />
          </CommandContext.Provider>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
