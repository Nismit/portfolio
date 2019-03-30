import React, { Component } from 'react';
import data from '../data/about';
import ComponentHead from '../components/ComponentHead';
import ComponentHeadBlock from '../components/ComponentHeadBlock';

export default class Projects extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projectNumber: 0
    }
  }

  componentDidMount() {

  }

  render() {
    return (
      <React.Fragment>
        <ComponentHead headTitle="Project" />

        <div className="project__header">
          <ComponentHeadBlock
            title={data.title}
            subTitle={data.subTitle}
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