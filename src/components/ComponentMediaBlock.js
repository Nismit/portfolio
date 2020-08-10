import styled from "@emotion/styled";

const Content = ({ file }) => {
    if (file.contentType.includes('image')) {
        return (
            <_MediaImage>
                <img src={file.url} />
            </_MediaImage>
        );
    } else if (file.contentType.includes('video')) {
        return (
            <_MediaVideo>
                <video loop autoPlay muted>
                    <source src={file.url} />
                </video>
            </_MediaVideo>
        )
    }
}

const _MediaImage = styled.div`
    img {
        max-width: 100%;
        height: auto;
    }
`;

const _MediaVideo = styled.div`
    video {
        max-width: 100%;
        width: 100%;
        height: auto;
    }
`;

const ComponentMediaBlock = (props) => {

    if (!props.fields) {
        return false;
    }

    return (
        <_ContentMediaBlock>
            <Content file={props.fields[0].fields.file} />
        </_ContentMediaBlock>
    )
}

const _ContentMediaBlock = styled.div`
    padding-top: 4rem;
    padding-bottom: 4rem;
`;

export default ComponentMediaBlock;
