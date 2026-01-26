'use client';

import Link from 'next/link';
import type { FC } from 'react';
import { useState } from 'react';
import CommandMenu from '@/components/Command';
import { Logo } from '@/components/Icons';
import Shortcut from '@/components/Shortcut';
import Typography from '@/components/Typography';

const HeaderMenu: FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="all-unset cursor-pointer underline underline-offset-[0.3rem] transition-colors duration-300 hover:text-primary/70 hover:no-underline"
      >
        <Typography variant="body" component="span">
          Menu
        </Typography>
      </button>
      <Typography variant="body" component="span" margin={[0, 5]}>
        &nbsp;|&nbsp;
      </Typography>
      <div className="inline-flex gap-1">
        <Shortcut content="⌘" />
        <Shortcut content="/" />
      </div>
      <CommandMenu open={open} setOpen={setOpen} />
    </div>
  );
};

const Header: FC = () => {
  return (
    <header className="flex justify-between my-16 mx-auto max-w-[1024px] px-4">
      <Link
        href="/"
        title="Home"
        className="[&>svg]:text-primary hover:[&>svg]:text-primary/50 no-underline"
      >
        <Logo />
      </Link>
      <HeaderMenu />
    </header>
  );
};

export default Header;
