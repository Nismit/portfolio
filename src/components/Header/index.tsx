import Link from "next/link";
import { useState } from "react";
import type { FC } from "react";
import { Logo } from "@/components/Icons";
import Typography from "@/components/Typography";
import Shortcut from "@/components/Shortcut";
import CommandMenu from "@/components/Command";
import { _Header, Commands, TextButton } from "./styledComponents";

const HeaderMenu: FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <TextButton onClick={() => setOpen(true)}>
        <Typography variant="body" component="span">
          Menu
        </Typography>
      </TextButton>
      <Typography variant="body" component="span" margin={[0, 5]}>
        &nbsp;|&nbsp;
      </Typography>
      <Commands>
        <Shortcut content="⌘" />
        <Shortcut content="/" />
      </Commands>
      <CommandMenu open={open} setOpen={setOpen} />
    </div>
  );
};

const Header: FC = () => {
  return (
    <_Header>
      <Link href="/" title="Home" className="home">
        <Logo />
      </Link>
      <HeaderMenu />
    </_Header>
  );
};

export default Header;
