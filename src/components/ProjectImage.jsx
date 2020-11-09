function ProjectImage({ props }) {
    let fallback;

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
}

export default ProjectImage;
