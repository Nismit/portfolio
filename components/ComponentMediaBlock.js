const Content = ({ file }) => {
  if (file.contentType.includes('image')) {
    return (
      <img src={file.url} />
    );
  } else if (file.contentType.includes('video')) {
    return (
      <video loop autoPlay muted>
        <source src={file.url} />
      </video>
    )
  }
}

export default (props) => {

  if (!props.fields) {
    return false;
  }

  return (
    <div className="content__media-block">

      <Content file={props.fields[0].fields.file} />

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
