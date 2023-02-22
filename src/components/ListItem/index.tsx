import type { FC } from "react";
import Link from "next/link";
import { Arrow } from "@/components/Icons/";
import { ExternalArrow } from "@/components/Icons/styledComponents";
import Typography from "@/components/Typography";
import { LinkItem, LinkTextContainer } from "./styledComponents";

type Props = {
  title: string;
  description: string;
  href: string;
};

const ListItem: FC<Props> = ({ title, description, href }) => {
  const isExternal = href.includes("https://");
  return (
    <Link href={href} passHref legacyBehavior>
      <LinkItem>
        <LinkTextContainer>
          <Typography variant="title" color="rgb(var(--primary))">
            {title}
          </Typography>
          <Typography variant="description" color="rgb(var(--primary-fade))">
            {description}
          </Typography>
        </LinkTextContainer>
        {isExternal ? <ExternalArrow /> : <Arrow />}
      </LinkItem>
    </Link>
  );
};

export default ListItem;
