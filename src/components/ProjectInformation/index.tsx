import type { FC } from 'react';
import Typography from '@/components/Typography';

type Props = {
  client: string;
  stack: string;
  projectRole?: string;
};

const ProjectInformation: FC<Props> = ({ client, stack, projectRole = 'Front-end' }) => {
  return (
    <div className="flex gap-6 my-16">
      <div>
        <Typography variant="title" component="p" margin={[0, 0, '0.3rem', 0]}>
          Client
        </Typography>
        <Typography variant="body" component="p" color="rgb(var(--primary-fade))">
          {client}
        </Typography>
      </div>
      <div>
        <Typography variant="title" component="p" margin={[0, 0, '0.3rem', 0]}>
          Tech Stack
        </Typography>
        <Typography variant="body" component="p" color="rgb(var(--primary-fade))">
          {stack}
        </Typography>
      </div>
      <div>
        <Typography variant="title" component="p" margin={[0, 0, '0.3rem', 0]}>
          Role
        </Typography>
        <Typography variant="body" component="p" color="rgb(var(--primary-fade))">
          {projectRole}
        </Typography>
      </div>
    </div>
  );
};

export default ProjectInformation;
