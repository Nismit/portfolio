
export default (props) => {
  const { title, content } = props.fields;

  if (!title) {
    return false;
  }

  return (
    <div className="content__text-block">
      <h2>{title}</h2>

      {content ? (
        <p>{content}</p>
      ) : null}

      <style jsx>{`
        .content__text-block {
          padding-top: 4rem;
          padding-bottom: 4rem;
          padding-left: 2.5rem;
          padding-right: 2.5rem;
        }
      `}</style>
    </div>
  )
}
