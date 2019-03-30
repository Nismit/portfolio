import { PureComponent } from 'react';
import Link from 'next/link';

export default class ComponentProjectHeadBlock extends PureComponent {
  constructor(props) {
    super(props);
  }

  childNextProject() {
    return this.props.navigateNext();
  }

  render() {
    const url = this.props.title.replace(' ', '-').toLowerCase();

    return (
      <div className="head-block">
        <div>
          {this.props.title ? (
            <h1>{this.props.title}</h1>
          ) : null}
          {this.props.subTitle ? (
            <p>{this.props.subTitle}</p>
          ) : null}

          <Link as={`/project/${url}`} href={`/project?id=${this.props.projectId}`}>
            <a className="menu__link">View Project</a>
          </Link>

          <div onClick={() => { this.childNextProject(); }}>
            <span>Next</span>
          </div>
        </div>

        <style jsx>{`
          .head-block {
            height: 100vh;
            display: flex;
            align-items: center;
            max-width: 1200px;
            padding-left: 1rem;
            padding-right: 1rem;
            margin-left: auto;
            margin-right: auto;
          }
        `}</style>
      </div>
    )
  }
}