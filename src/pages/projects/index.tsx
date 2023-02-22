import type { ReactElement } from "react";
import type { NextPageWithLayout } from "@/pages/_app";
import Layout from "@/components/Layout";
import Typography from "@/components/Typography";
import ListItem from "@/components/ListItem";

const Page: NextPageWithLayout = () => {
  return (
    <>
      <div>
        <Typography variant="headline" component="h1">
          Projects
        </Typography>
        <Typography
          variant="subHeadline"
          component="h2"
          color="rgba(var(--secondary), 1.0)"
          margin={["4rem", 0, "1rem", 0]}
        >
          Active
        </Typography>
        <ListItem
          title="Framed"
          description="GLSL Gallery For Framed* Mono X7"
          href="https://github.com/Nismit/framed"
        />
        <ListItem
          title="Sketch"
          description="WebGL Sketch Template"
          href="https://github.com/Nismit/sketch"
        />
        <ListItem
          title="nisgl-ts"
          description="WebGL Small Wrapper Library With TypeScript"
          href="https://github.com/Nismit/nisgl-ts"
        />
        <ListItem
          title="Nislog"
          description="Personal Blog Written In Japanese"
          href="https://github.com/Nismit/Nislog"
        />
        <ListItem
          title="Formula Visualizer"
          description="Simple Math Formula Visualization With GLSL"
          href="https://github.com/Nismit/fomula-visualizer"
        />

        <Typography
          variant="subHeadline"
          component="h2"
          color="rgba(var(--secondary), 1.0)"
          margin={["3rem", 0, "1rem", 0]}
        >
          Archived Projects
        </Typography>

        <ListItem
          title="Local Public Eatery (Website)"
          description="Tech Stack: WordPress"
          href="/projects/local-public-eatery"
        />
        <ListItem
          title="Eden Empire (Website)"
          description="Tech Stack: WordPress"
          href="/projects/eden-empire"
        />
        <ListItem
          title="The Little Potato Company (Website)"
          description="Tech Stack: WordPress/Vue.js"
          href="/projects/little-potato-company"
        />
        <ListItem
          title="Major Tom (Website)"
          description="Tech Stack: WordPress/Three.js/GSAP"
          href="/projects/major-tom"
        />
      </div>
    </>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;
