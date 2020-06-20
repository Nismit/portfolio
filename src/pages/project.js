import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { TweenLite } from 'gsap';
import projectData from '../data/projects';
import Footer from '../components/Footer';
import ComponentHead from '../components/ComponentHead';
import ComponentHeadBlock from '../components/ComponentHeadBlock';
import ComponentTextBlock from '../components/ComponentTextBlock';
import ComponentSkillBlock from '../components/ComponentSkillBlock';
import ComponentMediaBlock from '../components/ComponentMediaBlock';
import ComponentAlternativeBlock from '../components/ComponentAlternativeBlock';

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});

class Project extends PureComponent {
  constructor(props) {
    super(props);
    this.scrollBar = null;
    this.containerRef = React.createRef();
    this.data = this.props.router.query ? projectData.allProjects[this.props.router.query.id].fields : null;
  }

  componentDidMount() {
    const smoothScrollbar = require('smooth-scrollbar').default;
    this.scrollBar = smoothScrollbar.init(this.containerRef.current, {
      thumbMinSize: 10,
      alwaysShowTracks: true
    });

    this.scrollBar.addListener(() => this.onUpdateScroll());
    const visualContainer = document.querySelector('.global-visual');
    this.visualContainer = visualContainer;
  }

  componentDidUpdate() {
    TweenLite.to(this.containerRef.current, 0.8, { scrollTop: 0 });
  }

  onUpdateScroll() {
    this.visualContainer.style.transform = `translate3d(0,-${this.scrollBar.offset.y}px, 0)`;
  }

  render() {
    return (
      <React.Fragment>
        <ComponentHead headTitle={this.data && this.data.title} />
        <div ref={this.containerRef} className={`page project virtual-scroll`}>
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
                } else if (item.sys.contentType.sys.id === 'contentImageBlock') {
                  return <ComponentMediaBlock
                    key={i}
                    fields={item.fields.images}
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
        </div>
      </React.Fragment>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Project));