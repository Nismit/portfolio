import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import SmoothScrollbar from 'smooth-scrollbar';
import Scrollbar from 'react-smooth-scrollbar';
import projectData from '../data/projects';
import Footer from '../components/Footer';
import ComponentHead from '../components/ComponentHead';
import ComponentHeadBlock from '../components/ComponentHeadBlock';
import ComponentTextBlock from '../components/ComponentTextBlock';
import ComponentSkillBlock from '../components/ComponentSkillBlock';
import ComponentAlternativeBlock from '../components/ComponentAlternativeBlock';

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});

class Project extends PureComponent {
  constructor(props) {
    super(props);
    this.containerRef = React.createRef();
    this.data = this.props.router.query ? projectData.allProjects[this.props.router.query.id].fields : null;
  }

  componentDidMount() {
    this.containerRef.current.scrollbar.addListener(() => this.onUpdateScroll());
    const visualContainer = document.querySelector('.global-visual');
    this.visualContainer = visualContainer;
  }

  componentWillUnmount() {
    const { scrollbar } = this.containerRef.current;
    scrollbar.scrollTo(0, 0);
  }

  onUpdateScroll() {
    const { scrollbar } = this.containerRef.current;
    this.visualContainer.style.transform = `translate3d(0,-${scrollbar.offset.y}px, 0)`;
  }

  render() {
    return (
      <React.Fragment>
        <ComponentHead headTitle={this.data && this.data.title} />
        <Scrollbar ref={this.containerRef} thumbMinSize={10} className="page project virtual-scroll">
          <div className="project__header">
            <ComponentHeadBlock
              title={this.data && this.data.title}
              subTitle={this.data && this.data.subTitle}
            />
          </div>

          <div className="content project__content">

            {
              this.data && this.data.contentsModule.map((item, i) => {
                if (item.sys.contentType.sys.id === 'contentTextBlock') {
                  return <ComponentTextBlock
                    key={i}
                    fields={item.fields}
                  />
                } else if (item.sys.contentType.sys.id === 'contentSkillsBlock') {
                  return <ComponentSkillBlock
                    key={i}
                    fields={item.fields}
                  />
                } else if (item.sys.contentType.sys.id === 'contentAlternativeBlock') {
                  return <ComponentAlternativeBlock
                    key={i}
                    fields={item.fields}
                  />
                } else {
                  return false;
                }
              })
            }

          </div>

          <Footer />

          <style jsx>{`
            .project__header {
              width: 100%;
              height: 100vh;
              position: relative;
            }
          `}</style>
        </Scrollbar>
      </React.Fragment>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Project));