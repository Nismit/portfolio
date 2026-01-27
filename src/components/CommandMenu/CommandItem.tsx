'use client';

import { ExternalArrow } from '@/components/Icons';
import Shortcut from '@/components/Shortcut';
import Typography from '@/components/Typography';
import { useCommand } from './context';
import type { CommandItemData } from './types';

type Props = {
  item: CommandItemData;
  onSelect: (item: CommandItemData) => void;
};

export const CommandItem = ({ item, onSelect }: Props) => {
  const { activeId, setActiveId } = useCommand();
  const isActive = activeId === item.id;

  return (
    <button
      type="button"
      data-active={isActive}
      className={`w-full cursor-pointer text-base flex items-center justify-between gap-3 py-3 px-6 select-none transition-colors ${
        isActive ? 'bg-cmdk-selected' : ''
      }`}
      onClick={() => onSelect(item)}
      onMouseEnter={() => setActiveId(item.id)}
    >
      <div className="flex items-center gap-4">
        {item.icon}
        <Typography variant="body" component="span">
          {item.label}
        </Typography>
      </div>
      <div className="flex items-center gap-2">
        {item.shortcut && <Shortcut content={item.shortcut} />}
        {item.type === 'external' && <ExternalArrow isSmall />}
      </div>
    </button>
  );
};
