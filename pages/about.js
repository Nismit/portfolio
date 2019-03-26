import { PureComponent } from 'react';
import SmoothScrollbar from 'smooth-scrollbar';
import Scrollbar from 'react-smooth-scrollbar';
import data from '../data/about';
import ComponentHead from '../components/ComponentHead';
import ComponentHeadBlock from '../components/ComponentHeadBlock';
import ComponentTextBlock from '../components/ComponentTextBlock';
import ComponentSkillBlock from '../components/ComponentSkillBlock';

export default class About extends PureComponent {
  constructor(props) {
    super(props);
    this.containerRef = React.createRef();
  }

  componentDidMount() {
    this.containerRef.current.scrollbar.addListener(() => this.onUpdateScroll());
    const visualContainer = document.querySelector('.global-visual');
    this.visualContainer = visualContainer;
  }

  onUpdateScroll() {
    const { scrollbar } = this.containerRef.current;
    this.visualContainer.style.transform = `translate3d(0,-${scrollbar.offset.y}px, 0)`;
  }

  render() {
    return (
      <React.Fragment>
        <ComponentHead headTitle="About" />
        <Scrollbar ref={this.containerRef} thumbMinSize={10} className="page about virtual-scroll">
          <div className="about__header">
            <ComponentHeadBlock />
          </div>

          <div className="about__content">

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
                } else {
                  return false;
                }
              })
            }

          </div>
          <style jsx>{`
            .about__head {
              position: fixed;
              width: 100%;
              height: 100vh:
            }
          `}</style>
        </Scrollbar>
      </React.Fragment>
    )
  }
}