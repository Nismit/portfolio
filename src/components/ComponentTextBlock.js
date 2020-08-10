import ReactMarkdown from 'react-markdown';
import styled from "@emotion/styled";

const ComponentTextBlock = (props) => {
    const { title, content } = props.fields;

    if (!title) {
        return false;
    }

    return (
        <_TextBlock>
            <h2>{title}</h2>

            {content ? (
                <ReactMarkdown source={content} />
            ) : null}
        </_TextBlock>
    )
}

const _TextBlock = styled.div`
    padding-top: 4rem;
    padding-bottom: 4rem;
    padding-left: 1.5rem;
    padding-right: 1.5rem;

    @media (min-width: 45.176em) {
        padding-left: 2.5rem;
        padding-right: 2.5rem;
    }
`;

export default ComponentTextBlock;
