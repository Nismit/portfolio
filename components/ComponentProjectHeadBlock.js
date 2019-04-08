import { PureComponent } from 'react';
import Link from 'next/link';

export default class ComponentProjectHeadBlock extends PureComponent {
  constructor(props) {
    super(props);
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
            <a className="project__link">View Project</a>
          </Link>

          <div className="project__nav__container">
            <div className="project__nav prev" onClick={() => { this.props.navigatePrev(); }}>
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M12.707 18.293l-5.293-5.293h11.586c0.552 0 1-0.448 1-1s-0.448-1-1-1h-11.586l5.293-5.293c0.391-0.391 0.391-1.024 0-1.414s-1.024-0.391-1.414 0l-7 7c-0.096 0.096-0.168 0.206-0.217 0.324-0.101 0.245-0.101 0.522 0 0.767 0.048 0.116 0.119 0.224 0.212 0.319 0.002 0.002 0.003 0.003 0.005 0.005l7 7c0.391 0.391 1.024 0.391 1.414 0s0.391-1.024 0-1.414z"></path>
              </svg>
              <span>Prev</span>
            </div>

            <div className="project__nav next" onClick={() => { this.props.navigateNext(); }}>
              <span>Next</span>
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M12.707 18.293l-5.293-5.293h11.586c0.552 0 1-0.448 1-1s-0.448-1-1-1h-11.586l5.293-5.293c0.391-0.391 0.391-1.024 0-1.414s-1.024-0.391-1.414 0l-7 7c-0.096 0.096-0.168 0.206-0.217 0.324-0.101 0.245-0.101 0.522 0 0.767 0.048 0.116 0.119 0.224 0.212 0.319 0.002 0.002 0.003 0.003 0.005 0.005l7 7c0.391 0.391 1.024 0.391 1.414 0s0.391-1.024 0-1.414z"></path>
              </svg>
            </div>
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
          .project__link {
            display: inline-block;
            color: white;
            border: 3px solid #fff;
            padding: .8rem 2.4rem;
            text-decoration: none;
            transition: all 500ms;
          }
          .project__link:hover {
            background-color: white;
            color: #000;
          }
          .project__nav__container {
            display: flex;
          }
          .project__nav {
            cursor: pointer;
            padding: 1rem;
            display: flex;
            align-items: center;
          }
          .project__nav svg {
            fill: #fff;
          }
          .project__nav.next svg {
            transform: rotate(180deg);
          }
        `}</style>
      </div>
    )
  }
}