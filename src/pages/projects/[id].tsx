import type { ReactElement } from "react";
import { GetStaticProps } from "next";
import Image from "next/image";
import type { NextPageWithLayout } from "@/pages/_app";
import Layout from "@/components/Layout";
import Typography from "@/components/Typography";
import ProjectInformation from "@/components/ProjectInformation";
import ProjectImages from "@/components/ProjectImages";
import Projects from "@/data/projects.json";

type Props = {
  id: string;
  title: string;
  stack: string;
  images: string[];
};

const Page: NextPageWithLayout<Props> = ({ id, title, stack, images }) => {
  const heroImagePath = images?.[0];
  return (
    <>
      <Typography variant="headline" component="h1" margin={[0, 0, "4rem", 0]}>
        {title}
      </Typography>
      {heroImagePath && (
        <Image
          alt={`Image of ${title}`}
          src={heroImagePath}
          width={700}
          height={392}
          style={{
            maxWidth: "100%",
            height: "auto",
          }}
        />
      )}
      <ProjectInformation client={title} stack={stack} />
      <ProjectImages images={images} />
    </>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const data = Projects.projects.filter(
    (data) => data.id === context.params?.id
  )[0];

  return {
    props: {
      ...data,
    },
  };
};

export async function getStaticPaths() {
  const propjects = Projects.projects;
  const paths = propjects.map((project) => {
    return {
      params: {
        id: project.id,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}
