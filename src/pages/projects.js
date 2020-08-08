import { useState } from 'react';
import data from '../data/projects';
import ComponentHead from '../components/ComponentHead';
import ComponentProjectHeadBlock from '../components/ComponentProjectHeadBlock';

function Projects() {
  const [projectNumber, setProjectNumber] = useState(0);

  const navToNextProject = () => {
    const limit = data.allProjects.length - 1;
    const newProjectNumber = projectNumber + 1;

    if(newProjectNumber > limit) {
      setProjectNumber(0);
    } else {
      setProjectNumber(newProjectNumber);
    }
  }

  const navToPrevProject = () => {
    const limit = data.allProjects.length - 1;
    const newProjectNumber = projectNumber - 1;

    if(newProjectNumber < 0) {
      setProjectNumber(limit);
    } else {
      setProjectNumber(newProjectNumber);
    }
  }

  return (
    <>
      <ComponentHead headTitle="Project" />

      <div className="project__header">
        <ComponentProjectHeadBlock
          projectId={projectNumber}
          title={data.allProjects[projectNumber].fields.title}
          subTitle={data.allProjects[projectNumber].fields.subTitle}
          navigateNext={() => { navToNextProject() }}
          navigatePrev={() => { navToPrevProject() }}
        />
      </div>

      <style jsx>{`
          .project__header {
            width: 100%;
            height: 100vh;
            position: relative;
          }
        `}</style>
    </>
  )
}
export default Projects;
