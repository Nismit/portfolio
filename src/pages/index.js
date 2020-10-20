import { useRef, useEffect } from 'react';
import data from '../data/home';
import styled from "@emotion/styled";
import ComponentHead from '../components/ComponentHead';
import Smoke from '../helpers/Smoke';

function IndexPage() {
    let visualManager;
    const refContainer = useRef(null);

    useEffect(() => {
        visualManager = new Smoke();
        refContainer.current.appendChild(visualManager.renderer.domElement);

        return () => {
            if(refContainer.current.firstChild) {
                refContainer.current.removeChild(visualManager.renderer.domElement);
            }
            visualManager.destroy();
        }
    }, []);

    return (
        <>
            <ComponentHead headTitle="Interactive Developer" />
            <main className="page home">
                <_HomeVisual ref={refContainer} />
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
        font-weight: 700;
        font-family: 'DIN condensed';
        font-size: 40px;
        text-align: center;
        line-height: 1.4;
        letter-spacing: 0.7px;
        text-transform: uppercase;

        margin-top: 0;
        margin-bottom: 1rem;
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

const _HomeVisual = styled.div`
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
`;

export default IndexPage;
