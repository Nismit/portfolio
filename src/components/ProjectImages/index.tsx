import type { FC } from "react";
import Image from "next/image";
import { Container } from "./styledComponents";

type Props = {
  images: string[];
};

const ProjectImages: FC<Props> = ({ images }) => {
  const contentImages = images.slice(1);
  return (
    <Container className="full-bleed">
      {contentImages.length > 0 &&
        contentImages.map((image, index) => (
          <Image
            key={`${index}-${image}`}
            alt={`Image`}
            src={image}
            width={1100}
            height={598}
            style={{ width: "100%", height: "auto" }}
          />
        ))}
    </Container>
  );
};

export default ProjectImages;
