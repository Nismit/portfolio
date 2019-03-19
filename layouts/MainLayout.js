import Header from '../components/Header';

const MainLayout = props => (
  <div>
    <Header />
    {props.children}
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
    `}</style>
  </div>
)

export default MainLayout;