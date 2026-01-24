import type { FC } from 'react';
import Typography from '@/components/Typography';
import { Container } from './styledComponents';

type Props = {
  client: string;
  stack: string;
  role?: string;
};

const ProjectInformation: FC<Props> = ({ client, stack, role = 'Front-end' }) => {
  return (
    <Container>
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
          {role}
        </Typography>
      </div>
    </Container>
  );
};

export default ProjectInformation;
