import { PureComponent } from 'react';
import { connect } from 'react-redux';
// import SmoothScrollbar from 'smooth-scrollbar';
// import Scrollbar from 'react-smooth-scrollbar';
import { TweenLite } from 'gsap';
import data from '../data/about';
import Footer from '../components/Footer';
import ComponentHead from '../components/ComponentHead';
import ComponentHeadBlock from '../components/ComponentHeadBlock';
import ComponentTextBlock from '../components/ComponentTextBlock';
import ComponentSkillBlock from '../components/ComponentSkillBlock';
import ComponentAlternativeBlock from '../components/ComponentAlternativeBlock';

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});

class About extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { loaded: false }
    this.scrollBar = null;
    this.containerRef = React.createRef();
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
        <ComponentHead headTitle="About" />
        <div ref={this.containerRef} className={`page about virtual-scroll`}>
          <div className="about__header">
            <ComponentHeadBlock
              title={data.title}
              subTitle={data.subTitle}
            />
          </div>

          <div className="content about__content">

            {
              data.contentsModule.map((item, i) => {
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
            .about__header {
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

export default connect(mapStateToProps, mapDispatchToProps)(About);