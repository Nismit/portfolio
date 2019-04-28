
export default (props) => (
  <div className="head-block">
    <div>
      {props.title ? (
        <h1>{props.title}</h1>
      ) : null}
      {props.subTitle ? (
        <p>{props.subTitle}</p>
      ) : null}
    </div>

    <style jsx>{`
      .head-block {
        height: 100vh;
        display: flex;
        align-items: center;
        max-width: 1200px;
        padding-left: 1rem;
        padding-right: 1rem;
        margin-left: auto;
        margin-right: auto;
      }

      @media (min-width: 45.176em) {
        .head-block {
          max-width: 100%;
          padding-left: 5rem;
        } 
      }  
    `}</style>
  </div>
)