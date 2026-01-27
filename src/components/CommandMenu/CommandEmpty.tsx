'use client';

import Typography from '@/components/Typography';

export const CommandEmpty = () => {
  return (
    <div className="text-base flex items-center justify-center h-16">
      <Typography variant="body" component="span">
        No results found.
      </Typography>
    </div>
  );
};
