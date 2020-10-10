import data from '../data/home';
import styled from "@emotion/styled";
import ComponentHead from '../components/ComponentHead';

function IndexPage() {
    return (
        <>
            <ComponentHead headTitle="Interactive Developer" />
            <main className="page home">
                <_Hero>
                    <div className="container">
                        <h1>Vancouver Based<br />Interactive Developer</h1>
                    </div>
                </_Hero>
            </main>
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

    h1 {
        font-size: 40px;
        text-align: center;
        line-height: 1.4;
        letter-spacing: 0.7px;
    }

    @media (min-width: 45.176em) {
        h1 {
            font-size: 80px;
            text-align: center;
            line-height: 1.17;
            letter-spacing: 0.7px;
        }
    }
`;

export default IndexPage;
