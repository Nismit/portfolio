'use client';

import { useEffect, useMemo } from 'react';
import { CommandEmpty } from './CommandEmpty';
import { CommandGroup } from './CommandGroup';
import { useCommand } from './context';
import type { CommandItemData } from './types';

type Props = {
  onSelect: (item: CommandItemData) => void;
};

export const CommandList = ({ onSelect }: Props) => {
  const { filteredItems, activeId, setActiveId } = useCommand();

  const groups = useMemo(() => {
    const map = new Map<string, CommandItemData[]>();
    for (const item of filteredItems) {
      const existing = map.get(item.group) || [];
      map.set(item.group, [...existing, item]);
    }
    return Array.from(map.entries());
  }, [filteredItems]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.isComposing) return;

      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const currentIndex = filteredItems.findIndex((item) => item.id === activeId);
        let nextIndex: number;

        if (e.key === 'ArrowDown') {
          nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % filteredItems.length;
        } else {
          nextIndex = currentIndex <= 0 ? filteredItems.length - 1 : currentIndex - 1;
        }

        setActiveId(filteredItems[nextIndex]?.id ?? null);
      }

      if (e.key === 'Enter') {
        e.preventDefault();
        const selected = filteredItems.find((item) => item.id === activeId);
        if (selected) onSelect(selected);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [filteredItems, activeId, setActiveId, onSelect]);

  if (filteredItems.length === 0) {
    return <CommandEmpty />;
  }

  return (
    <div className="max-h-75 overflow-auto overscroll-contain">
      {groups.map(([heading, items]) => (
        <CommandGroup key={heading} heading={heading} items={items} onSelect={onSelect} />
      ))}
    </div>
  );
};
