import data from '../data/home';
import ComponentHead from '../components/ComponentHead';

function IndexPage() {
  return (
    <>
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
              display: flex;
              align-items: center;
              height: 100vh;
              padding-left: 1rem;
            }

            .hero__container {
              width: 100%;
            }

            @media (min-width: 45.176em) {
              .hero {
                padding-left: 5rem;
              }

              .hero__container {
                width: 520px;
              }
            }
        `}</style>
        </div>
    </>
  )
}
export default IndexPage;
