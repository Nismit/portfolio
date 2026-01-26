import Image from 'next/image';
import ProjectImages from '@/components/ProjectImages';
import ProjectInformation from '@/components/ProjectInformation';
import Typography from '@/components/Typography';
import Projects from '@/data/projects.json';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return Projects.projects.map((project) => ({
    id: project.id,
  }));
}

export default async function ProjectPage({ params }: Props) {
  const { id } = await params;
  const project = Projects.projects.find((p) => p.id === id);

  if (!project) {
    return <div>Project not found</div>;
  }

  const { title, stack, images } = project;
  const heroImagePath = images?.[0];

  return (
    <>
      <Typography variant="headline" component="h1" margin={[0, 0, '4rem', 0]}>
        {title}
      </Typography>
      {heroImagePath && (
        <Image
          alt={`Image of ${title}`}
          src={heroImagePath}
          width={700}
          height={392}
          style={{
            maxWidth: '100%',
            height: 'auto',
          }}
        />
      )}
      <ProjectInformation client={title} stack={stack} />
      <ProjectImages images={images} />
    </>
  );
}
