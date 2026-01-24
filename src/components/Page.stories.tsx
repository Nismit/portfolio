import type { Meta, StoryObj } from '@storybook/react';
import Layout from './Layout';
import Typography from './Typography';

const meta = {
  title: 'Page',
  component: Layout,
} satisfies Meta<typeof Layout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Page: Story = {
  args: {
    children: (
      <>
        <Typography variant="headline" component="h1" margin={[0, 0, '4rem', 0]}>
          About
        </Typography>
        <Typography variant="body" component="p">
          Hello 👋
          <br />
          My portfolio site never get updated every time after I create it, so I want to make
          something functional and something useful.
        </Typography>
        <Typography variant="body" component="p">
          I am Michinobu Nishimoto, a front-end developer based in Vancouver. I had worked in
          several design agencies for several years. I currently work at AgentsOnly. I am interested
          in software engineering as well as creative coding and new ways of expressing the web
          using WebGL.
        </Typography>
      </>
    ),
  },
};
