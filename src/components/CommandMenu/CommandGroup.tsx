'use client';

import { CommandItem } from './CommandItem';
import type { CommandItemData } from './types';

type Props = {
  heading: string;
  items: CommandItemData[];
  onSelect: (item: CommandItemData) => void;
};

export const CommandGroup = ({ heading, items, onSelect }: Props) => {
  return (
    <div>
      <div className="select-none text-secondary pt-6 pb-2 px-6 flex items-center">{heading}</div>
      <div>
        {items.map((item) => (
          <CommandItem key={item.id} item={item} onSelect={onSelect} />
        ))}
      </div>
    </div>
  );
};
