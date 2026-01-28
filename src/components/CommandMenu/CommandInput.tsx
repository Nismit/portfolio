'use client';

import { useCommand } from './context';

export const CommandInput = () => {
  const { search, onSearchChange } = useCommand();

  return (
    <input
      type="text"
      value={search}
      onChange={(e) => onSearchChange(e.target.value)}
      placeholder="Type a command or search keywords"
      className="w-full border-0 border-b border-solid border-primary-fade/80 text-lg p-4 px-6 outline-none bg-transparent text-primary font-medium placeholder:text-secondary"
    />
  );
};
