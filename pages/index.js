import { PureComponent } from 'react';
import { connect } from 'react-redux';
import data from '../data/home';
import ComponentHead from '../components/ComponentHead';

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});

class Index extends PureComponent {
  render() {
    return (
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
              display: flex;
              align-items: center;
              height: 100vh;
              padding-left: 5rem;
            }
    
            .hero__container {
              width: 520px;
            }
        `}</style>
        </div>
      </React.Fragment>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);