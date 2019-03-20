import Header from '../components/Header';
import MainVisual from '../components/MainVisual';

const MainLayout = props => (
  <div>
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
        background-color #000;
      }

      .main__container {
        position: relative;
        z-index: 10;
      }
    `}</style>
  </div>
)

export default MainLayout;