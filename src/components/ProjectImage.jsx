function ProjectImage({ props }) {
    let fallback;

    if(props.length > 1) {
        return (
            <picture className="project__image">
                {
                    props.map((content, i) => {
                        if(content.fields.file.contentType === 'image/png') {
                            fallback = content.fields.file.url;
                            return false;
                        } else {
                            return <source key={i} srcSet={content.fields.file.url} type={content.fields.file.contentType} />
                        }
                    })
                }
                {
                    <img src={fallback} alt="Hero Image" />
                }
            </picture>
        )
    } else {
        return (
            <video loop autoPlay muted className="project__video">
                <source src={props[0].fields.file.url} />
            </video>
        )
    }
}

export default ProjectImage;
