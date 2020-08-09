const Content = ({ file }) => {
  if (file.contentType.includes('image')) {
    return (
      <React.Fragment>
        <img className="media-image" src={file.url} />
        <style jsx>{`
          .media-image {
            max-width: 100%;
            height: auto;
          }
        `}</style>
      </React.Fragment>
    );
  } else if (file.contentType.includes('video')) {
    return (
      <video className="media-video" loop autoPlay muted>
        <source src={file.url} />
        <style jsx>{`
          .media-video {
            max-width: 100%;
            width: 100%;
            height: auto;
          }
        `}</style>
      </video>
    )
  }
}

const ComponentMediaBlock = (props) => {

  if (!props.fields) {
    return false;
  }

  return (
    <div className="content__media-block">

      <Content file={props.fields[0].fields.file} />

      <style jsx>{`
        .content__media-block {
          padding-top: 4rem;
          padding-bottom: 4rem;
        }
      `}</style>
    </div>
  )
}

export default ComponentMediaBlock;
