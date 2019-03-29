import data from '../data/home';
import ComponentHead from '../components/ComponentHead';

export default () => (
  <React.Fragment>
    <ComponentHead headTitle="Interactive Developer" />
    <div className="page home">
      <div className="hero">
        <div className="hero__container">
          <h1>{data.title}</h1>
          <p>{data.subTitle}</p>
        </div>
      </div>
      <style jsx>{`
        .hero {
          position: relative;
          display: flex;
          align-items: center;
          height: 100vh;
          padding-left: 5rem;
        }

        .hero:after {
          content: '';
          width: 100vw;
          height: 40vh;
          position: absolute;
          left: 0;
          bottom: 0;
          background: -webkit-linear-gradient(top, rgba(0,0,0,0) 0%,rgba(0,0,0,1) 100%);
          background: linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,1) 100%);
        }

        .hero__container {
          width: 520px;
        }
    `}</style>
    </div>
  </React.Fragment>
)