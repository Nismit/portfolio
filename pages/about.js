import React, { Component } from 'react';
// import Smooth from 'smooth-scrolling';

// export default () => (
//   <MainLayout>
//     <div className="about virtual-scroll">
//       <div className="test">

//       </div>
//       <p>Test</p>
//     </div>
//     <style jsx>{`
//       .test {
//         height: 1000px;
//       }
//     `}</style>
//   </MainLayout>
// )

class About extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // const section = document.querySelector('.virtual-scroll');
    // const smooth = new Smooth({
    //   native: true,
    //   section: section,
    //   ease: 0.1
    // });

    // this.smooth = smooth;
    // this.smooth.init()
  }

  componentWillUnmount() {
    // this.smooth.destroy();
  }

  render() {
    return (
      <div>
        <div className="about virtual-scroll">
          <div className="test">

          </div>
          <p>Test</p>
        </div>
        <style jsx>{`
          .test {
            height: 1000px;
          }
        `}</style>
      </div>
    )
  }
}

export default About