import React, { Component } from 'react';
import data from '../data/projects';
import ComponentHead from '../components/ComponentHead';
import ComponentProjectHeadBlock from '../components/ComponentProjectHeadBlock';

export default class Projects extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projectNumber: 0
    }
  }

  nextProject() {
    const limit = data.allProjects.length - 1;
    this.setState((prevState) => ({
      projectNumber: (prevState.projectNumber !== limit) ? prevState.projectNumber + 1 : 0
    }));
  }

  render() {
    return (
      <React.Fragment>
        <ComponentHead headTitle="Project" />

        <div className="project__header">
          <ComponentProjectHeadBlock
            projectId={this.state.projectNumber}
            title={data.allProjects[this.state.projectNumber].fields.title}
            subTitle={data.allProjects[this.state.projectNumber].fields.subTitle}
            navigateNext={() => { this.nextProject(); }}
          />
        </div>

        <style jsx>{`
            .project__header {
              width: 100%;
              height: 100vh;
              position: relative;
            }
          `}</style>
      </React.Fragment>
    )
  }
}