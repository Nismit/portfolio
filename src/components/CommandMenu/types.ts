import type { ReactElement } from 'react';

export type CommandItemData = {
  id: string;
  label: string;
  shortcut?: string;
  icon?: ReactElement;
  group: string;
} & ({ type: 'navigate'; href: string } | { type: 'external'; href: string });
