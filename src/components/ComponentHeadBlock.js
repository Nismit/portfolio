import styled from "@emotion/styled";

const ComponentHeadBlock = (props) => (
    <_HeadBlock>
        <div>
            {props.title ? (
                <h1>{props.title}</h1>
            ) : null}
            {props.subTitle ? (
                <p>{props.subTitle}</p>
            ) : null}
        </div>
    </_HeadBlock>
)

const _HeadBlock = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    max-width: 1200px;
    padding-left: 1rem;
    padding-right: 1rem;
    margin-left: auto;
    margin-right: auto;

    @media (min-width: 45.176em) {
        max-width: 100%;
        padding-left: 5rem;
    }
`;

export default ComponentHeadBlock;
