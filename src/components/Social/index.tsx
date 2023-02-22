import type { FC } from "react";
import { Twitter, GitHub, LinkedIn, Email } from "@/components/Icons";
import SocialData from "@/data/social.json";
import { Container, Link } from "./styledComponents";

const IconMapping: Record<string, JSX.Element> = {
  Twitter: <Twitter />,
  GitHub: <GitHub />,
  LinkedIn: <LinkedIn />,
  Email: <Email />,
};

const Social: FC = () => {
  return (
    <Container>
      {SocialData.social.map((data, index: number) => (
        <Link
          title={data.title}
          href={data.link}
          key={`${index}-${data.title}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {IconMapping[data.title]}
        </Link>
      ))}
    </Container>
  );
};

export default Social;
