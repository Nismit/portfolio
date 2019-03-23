import SmoothScrollbar from 'smooth-scrollbar';
import Scrollbar from 'react-smooth-scrollbar';

const aboutHead = {
  height: '100vh'
}

export default () => (
  <Scrollbar className="page about virtual-scroll">
    <div className="about__header" style={aboutHead}>
      <p>Header</p>
    </div>

    <div className="about__content">
      <p>content</p>
    </div>
    <style jsx>{`
      .about__head {
        position: fixed;
        width: 100%;
        height: 100vh:
      }
    `}</style>
  </Scrollbar>
)