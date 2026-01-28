import Image from 'next/image';
import type { FC } from 'react';

type Props = {
  images: string[];
};

const ProjectImages: FC<Props> = ({ images }) => {
  const contentImages = images.slice(1);
  return (
    <div className="full-bleed flex flex-col justify-center gap-24 pb-12 [&_img]:max-w-275 [&_img]:mx-auto">
      {contentImages.length > 0 &&
        contentImages.map((image, index) => (
          <Image
            key={`${index}-${image}`}
            alt={`Image`}
            src={image}
            width={1100}
            height={598}
            style={{ width: '100%', height: 'auto' }}
          />
        ))}
    </div>
  );
};

export default ProjectImages;
