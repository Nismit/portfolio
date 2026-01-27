'use client';

import { createContext, useContext } from 'react';
import type { CommandItemData } from './types';

type CommandContextValue = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  search: string;
  onSearchChange: (value: string) => void;
  activeId: string | null;
  setActiveId: (id: string | null) => void;
  filteredItems: CommandItemData[];
};

export const CommandContext = createContext<CommandContextValue | null>(null);

export const useCommand = () => {
  const ctx = useContext(CommandContext);
  if (!ctx) throw new Error('Missing CommandMenu provider');
  return ctx;
};
