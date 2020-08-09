import ReactMarkdown from 'react-markdown';

const ComponentTextBlock = (props) => {
  const { title, content } = props.fields;

  if (!title) {
    return false;
  }

  return (
    <div className="content__text-block">
      <h2>{title}</h2>

      {content ? (
        <ReactMarkdown source={content} />
      ) : null}

      <style jsx>{`
        .content__text-block {
          padding-top: 4rem;
          padding-bottom: 4rem;
          padding-left: 1.5rem;
          padding-right: 1.5rem;
        }

        @media (min-width: 45.176em) {
          .content__text-block {
            padding-left: 2.5rem;
            padding-right: 2.5rem;
          }
        }
      `}</style>
    </div>
  )
}

export default ComponentTextBlock;
