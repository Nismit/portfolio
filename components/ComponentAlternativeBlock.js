
export default (props) => {
  const { title, contentLeft, contentRight } = props.fields;

  if (!title) {
    return false;
  }

  return (
    <div className="content__alternative-block">
      <h2>{title}</h2>

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

      <style jsx>{`
        .content__alternative-block {
          padding-top: 4rem;
          padding-bottom: 4rem;
          padding-left: 1rem;
          padding-right: 1rem;
        }
      `}</style>
    </div>
  )
}
