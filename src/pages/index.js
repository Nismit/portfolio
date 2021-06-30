import { useRef, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import data from '../data/home';
import styled from "@emotion/styled";
import ComponentHead from '../components/ComponentHead';
import Smoke from '../helpers/Smoke';

function IndexPage() {
    let visualManager;
    const refContainer = useRef(null);
    const refDOMContainer = useRef(null);

    useEffect(() => {
        visualManager = new Smoke();
        refContainer.current.appendChild(visualManager.renderer.domElement);
        const tl = gsap.timeline();
        const element = refDOMContainer.current;
        tl.delay(1);
        tl.fromTo(refContainer.current, {opacity: 0}, {duration: 0.8, opacity: 1});
        tl.fromTo(element.getElementsByClassName('home__title'), {y: 40, opacity: 0}, {duration: 0.6, y: 0, opacity: 1});
        tl.fromTo(element.getElementsByClassName('home__link'), {y: 40, opacity: 0}, {duration: 0.6, y: 0, opacity: 1});

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
                <_Hero ref={refDOMContainer}>
                    <div className="container">
                        <h1 className="home__title">Vancouver Based<br />Interactive Developer</h1>
                        <Link href="/projects">
                            <a className="home__link">View Projects</a>
                        </Link>
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

    .container {
        width: 100%;
        text-align: center;
        padding-left: 2.5rem;
        padding-right: 2.5rem;
    }

    h1 {
        font-weight: 700;
        font-family: 'DIN condensed';
        font-size: 37px;
        text-align: center;
        line-height: 1.4;
        letter-spacing: 0.7px;
        text-transform: uppercase;

        margin-top: 0;
        margin-bottom: 1rem;
    }

    a {
        display: inline-block;
        width: 100%;
        border: 1px solid #fff;
        font-family: 'DIN condensed';
        font-weight: 700;
        font-size: 14px;
        text-transform: uppercase;
        margin-top: 1.5rem;
        padding: 1.22rem 1rem;
        letter-spacing: 2px;
        color: #fff;
        text-decoration: none;

        position: relative;
        transition: color 300ms ease-in;

        &::before,
        &::after {
            content: '';
            width: 0%;
            height: 100%;
            background-color: rgba(255, 255, 255, 1);
            position: absolute;
            top: 0;
            transition: width 300ms ease-in;
            opacity: 0;
            z-index: -1;
        }

        &::before {
            left: 0;
        }

        &::after {
            right: 0;
        }

        @media (hover: hover) and (pointer: fine) {
            &:hover {
                color: #121212;

                &::before,
                &::after {
                    opacity: 1;
                    width: 50%;
                }
            }
        }
    }

    @media (min-width: 45.176em) {
        h1 {
            font-size: 5.1vw;
            text-align: center;
            line-height: 1.17;
            letter-spacing: 0.7px;
        }

        a {
            width: 320px;
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
