import data from '../data/home';
import styled from "@emotion/styled";
import ComponentHead from '../components/ComponentHead';

function IndexPage() {
    return (
        <>
            <ComponentHead headTitle="Interactive Developer" />
            <div className="page home">
                <_Hero>
                    <div className="container">
                        <h1>{data.title}</h1>
                        <p>{data.subTitle}</p>
                    </div>
                </_Hero>
            </div>
        </>
    )
}

const _Hero = styled.div`
    display: flex;
    align-items: center;
    height: 100vh;
    padding-left: 1rem;

    .container {
        width: 100%;
    }

    @media (min-width: 45.176em) {
        padding-left: 5rem;

        .container {
            width: 520px;
        }
    }
`;

export default IndexPage;
