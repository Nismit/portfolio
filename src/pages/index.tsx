import type { ReactElement } from "react";
import type { NextPageWithLayout } from "@/pages/_app";
import Layout from "@/components/Layout";
import Typography from "@/components/Typography";
import Social from "@/components/Social";

const Page: NextPageWithLayout = () => {
  return (
    <>
      <Typography variant="headline" component="h1" margin={[0, 0, "4rem", 0]}>
        About
      </Typography>
      <Typography variant="body" component="p">
        Hello 👋
        <br />
        My portfolio site never get updated every time after I create it, so I
        want to make something functional and something useful.
      </Typography>
      <Typography variant="body" component="p">
        I am Michinobu Nishimoto, a front-end developer based in Vancouver. I
        had worked in several design agencies for several years. I currently
        work at AgentsOnly. I am interested in software engineering as well as
        creative coding and new ways of expressing the web using WebGL.
      </Typography>

      <Typography variant="body" component="p">
        <a href="/resume-v1.0.1.pdf" target="_blank" rel="noopener noreferrer">
          Resume
        </a>
      </Typography>

      <Typography
        variant="subHeadline"
        component="h2"
        color="rgba(var(--secondary), 1.0)"
        margin={["2rem", 0, "1rem", 0]}
      >
        Spare Time/Personality
      </Typography>

      <Typography variant="body" component="p">
        I watch movies and dramas on Netflix and play video games like FPS,
        action genre on my PC on my days off or when I have time. I also love
        coffee ☕. I wish I had an espresso machine. (Not enough space in the
        kitchen)
      </Typography>

      <Typography variant="body" component="p">
        HipHop culture is my starting point, and I have experience with
        breakdancing, graffiti, DJing, and beatboxing. I have no experience in
        making HipHop music (yet!), so I would love to make HipHop music using
        sampling techniques, then drop the music one day.
      </Typography>

      <Social />
    </>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;
