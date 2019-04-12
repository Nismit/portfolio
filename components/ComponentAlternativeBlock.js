
export default (props) => {
  const { title, contentLeft, contentRight } = props.fields;

  if (!title) {
    return false;
  }

  return (
    <div className="content__alternative-block">
      <h2>{title}</h2>

      <div className="content__alternative--wrapper">

        <div className="content__left">
          {
            contentLeft.content.map((content, i) => {
              if (content.nodeType === 'hr') {
                return <hr key={i} />
              }

              if (content.nodeType === 'heading-3') {
                return <h3 key={i}>{content.content[0].value}</h3>
              }

              if (content.nodeType === 'paragraph') {
                return <p key={i}>{content.content[0].value}</p>
              }
            })
          }
        </div>

        <div className="content__right">
          {
            contentRight.content.map((content, i) => {
              if (content.nodeType === 'hr') {
                return <hr key={i} />
              }

              if (content.nodeType === 'heading-3') {
                return <h3 key={i}>{content.content[0].value}</h3>
              }

              if (content.nodeType === 'paragraph') {
                return <p key={i}>{content.content[0].value}</p>
              }
            })
          }
        </div>

      </div>

      <style jsx>{`
        .content__alternative-block {
          padding-top: 4rem;
          padding-bottom: 4rem;
          padding-left: 2.5rem;
          padding-right: 2.5rem;
        }

        .content__alternative--wrapper {
          display: flex;
          flex-wrap: wrap;
          padding-top: 1.5rem;
          padding-bottom: 1.5rem;
        }

        .content__alternative--wrapper h3 {
          margin-bottom: 1.5rem;
        }

        .content__alternative--wrapper hr {
          margin: 1rem 0;
        }

        .content__left, .content__right {
          width: 100%; 
        }

        @media (min-width: 45.176em) {
          .content__left {
            width: 50%;
            padding-right: 2rem;
          }

          .content__right {
            width: 50%;
            padding-left: 2rem;
          }
        }
      `}</style>
    </div>
  )
}
