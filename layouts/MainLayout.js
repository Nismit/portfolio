import Header from '../components/Header';
import MainVisual from '../components/MainVisual';

const MainLayout = props => (
  <div className="wrapper">
    <Header />
    <div>
      <div className="main__container">
        {props.children}
      </div>
    </div>
    <MainVisual />
    <style jsx global>{`
      *::before,
      *::after {
        box-sizing: border-box;
      }

      html {
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
        -ms-overflow-style: scrollbar;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      }

      body {
        margin: 0;
        color: #fff;
        font-size: 16px;
        background-color #000;
      }

      @font-face {
        font-family: 'DIN condensed';
        src:  local('DIN condensed'),
              url('/static/fonts/din-condensed-bold.woff2') format('woff2'),
              url('/static/fonts/din-condensed-bold.woff')  format('woff'),
              url('/static/fonts/din-condensed-bold.ttf')   format('truetype'),
              url('/static/fonts/din-condensed-bold.eot')   format('embedded-opentype');
        font-weight: 700;
        font-style: normal;
      }

      h1, h2, h3, h4 {
        font-family: 'DIN condensed';
        letter-spacing: 2px;
        text-transform: uppercase;
        margin-top: 0;
        margin-bottom: 0;
      }

      h1 {
        letter-spacing: 7px;
        font-size: 7rem;
        line-height: 0.95;
      }

      .wrapper {
        padding-left: 1.5rem;
        padding-right: 1.5rem;
      }

      .main__container {
        position: relative;
        z-index: 10;
      }
    `}</style>
  </div>
)

export default MainLayout;