import { useRef, useEffect, useState } from 'react';
import styled from "@emotion/styled";
import data from '../data/projects';
import GLSlider from '../helpers/EXGLSlider';
import Slider from '../helpers/Slider';
import ComponentHead from '../components/ComponentHead';
import ComponentProjectHeadBlock from '../components/ComponentProjectHeadBlock';

import Link from 'next/link';

function Projects() {
    let projectsManager, frameId, percentage = 0;
    const _delta = { value: 0 };
    const velocity = 1.0;
    const refContainer = useRef(null);
    const refScrollContainer = useRef(null);
    const [projectNumber, setProjectNumber] = useState(0);

    let absoluteDelta, timeStamp;
    let sleep = 150;
    let isFired = false;
    let cacheDelta = 0;
    let cacheTimestamp = 0;

    const lerp = (a, b, t) => {
        return ((1 - t) * a + t * b);
    }

    const throttle = (func, delay) => {
        // Previously called time of the function
        let prev = 0;
        return (...args) => {
            let now = new Date().getTime();
            if(now - prev > delay) {
                prev = now;
                return func(...args);
            }
        }
    }

    const onWheel = (e) => {
        e.preventDefault();
        if(!e) { e = window.event }

        let coefficient = 1;
        const internalDelta = e.wheelDelta || -e.deltaY;
        if(!internalDelta) { return; }

        absoluteDelta = Math.abs(internalDelta);

        if(absoluteDelta - cacheDelta > 0) {
            timeStamp = e.timeStamp;

            if(!isFired && (timeStamp - cacheTimestamp) > sleep) {
                coefficient = 1;
                isFired = true;
            }

            cacheTimestamp = timeStamp;
        } else {
            coefficient = 0;
            isFired = false;
        }
        cacheDelta = absoluteDelta;

        // console.log('delta', cacheDelta);

        // Chrome/Safari has wheelDelta on wheel event
        // Firefox does not implement wheelDelta, so deltaY can be used the value
        const delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.deltaY)));

        if((_delta.value + (delta * velocity) > 0)) {
            _delta.value = 0;
        } else {
            _delta.value += (delta * velocity * coefficient);
        }

        if((_delta.value + delta > 0)) {
            _delta.value = 0;
        } else {
            _delta.value += delta;
        }
    }

    const smooth = () => {
        frameId = requestAnimationFrame(smooth);
        percentage = lerp(percentage, -_delta.value, .12);
        // projectsManager.update(Math.round(percentage * 100) / 100);
    }

    useEffect(() => {
        // async function getLocomotive() {
        //     const Locomotive = (await import('locomotive-scroll')).default;
        //     new Locomotive({
        //         el: refScrollContainer.current,
        //         smooth: true
        //     });
        // }

        // getLocomotive();
        // refScrollContainer.current.addEventListener('scroll', e => onScroll(e) );
        // projectsManager = new GLSlider();

        // custom options
        var options = {
            easing: 0.075,
            duration: 500,
            dragSpeed: 1.75,
            offset: 'padding'
        }

        // let's go!
        var slider = new Slider(options);

        // const effect = new GridToFullscreenEffect(refContainer.current,
        //     Array.from(document.getElementsByClassName("slider__item"))
        // );
        // effect.init();

        smooth();
        // refContainer.current.appendChild(projectsManager.renderer.domElement);
        refScrollContainer.current.addEventListener("wheel", onWheel);

        return () => {
            if(refContainer.current.firstChild) {
                refContainer.current.removeChild(projectsManager.renderer.domElement);
            }
            refScrollContainer.current.removeEventListener("wheel", onWheel);
            cancelAnimationFrame(frameId);
            // projectsManager.destroy();
        }
    }, []);

    return (
        <>
            <ComponentHead headTitle="Project" />

            <main>
                <_Projects ref={refContainer} />
                <_Scroll ref={refScrollContainer}>
                    <div className="slider">
                        <div id="planes">

                            <div className="plane-wrapper">
                                <span className="plane-title">Bahamas</span>
                                <Link as={`/project/major-tom`} href={`/project?id=0`}>
                                    <div className="plane">
                                        <img src="https://source.unsplash.com/2fFd7SIVpz8/1280x720" alt="Photo by Gregory Culmer on Unsplash" crossOrigin="true" />
                                    </div>
                                </Link>
                            </div>

                            <div className="plane-wrapper">
                                <span className="plane-title">Philippines</span>
                                <div className="plane">
                                    <img src="https://source.unsplash.com/SDaJRmZYMDA/1280x720" alt="Photo by James Connolly on Unsplash" crossOrigin="true" />
                                </div>
                            </div>

                            <div className="plane-wrapper">
                                <span className="plane-title">Indonesia</span>
                                <div className="plane">
                                    <img src="https://source.unsplash.com/DxmBSgUYKis/1600x900" alt="Photo by sutirta budiman on Unsplash" crossOrigin="true" />
                                </div>
                            </div>

                            <div className="plane-wrapper">
                                <span className="plane-title">Maldives</span>
                                <div className="plane">
                                    <img src="https://source.unsplash.com/lT9rqfG7lcQ/1280x720" alt="Photo by Jailam Rashad on Unsplash" crossOrigin="true" />
                                </div>
                            </div>

                            <div className="plane-wrapper">
                                <span className="plane-title">Greece</span>
                                <div className="plane">
                                    <img src="https://source.unsplash.com/QXW1YEMhq_4/1280x720" alt="Photo by Chris Karidis on Unsplash" crossOrigin="true" />
                                </div>
                            </div>

                            <div className="plane-wrapper">
                                <span className="plane-title">Fiji</span>
                                <div className="plane">
                                    <img src="https://source.unsplash.com/3jtm7BMsaPA/1280x720" alt="Photo by Lili Ortiz on Unsplash" crossOrigin="true" />
                                </div>
                            </div>

                            <div className="plane-wrapper">
                                <span className="plane-title">Thailand</span>
                                <div className="plane">
                                    <img src="https://source.unsplash.com/Mwg_MdX-Jx4/1280x720" alt="Photo by Samule Sun on Unsplash" crossOrigin="true" />
                                </div>
                            </div>

                        </div>

                        <div className="slider__inner">
                            <div className="slider__item">
                                <Link as={`/project/major-tom`} href={`/project?id=0`}>
                                    <div className="slider__content"></div>
                                </Link>
                            </div>
                            <div className="slider__item" style={{left: '120%'}}>
                                <div className="slider__content"></div>
                            </div>
                            <div className="slider__item" style={{left: '240%'}}>
                                <div className="slider__content"></div>
                            </div>
                            <div className="slider__item" style={{left: '360%'}}>
                                <div className="slider__content"></div>
                            </div>
                            <div className="slider__item" style={{left: '480%'}}>
                                <div className="slider__content"></div>
                            </div>
                        </div>
                    </div>
                </_Scroll>
            </main>
        </>
    )
}

const _Projects = styled.div`
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
`;

const _Scroll = styled.div`
    /* width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1; */

    position: relative;
    z-index: 2;
    overflow: hidden;

    .slider {
        position: relative;
        height: 100%;
        display: flex;
        align-items: center;
        overflow: hidden;
        padding: 0 14vw;

        &__inner {
            display: flex;
            position: relative;
            display: none;
        }

        &__item {
            overflow: hidden;

            &:first-of-type {
                position: relative;
            }

            &:not(:first-of-type) {
                position: absolute;
                top: 0;
                height: 100%;
            }
        }

        &__content {
            position: relative;
            overflow: hidden;
            width: 76vw;
            padding-bottom: calc(100% / (2/1));
            background-color: rgba(255, 255, 255, 0.1);
        }
    }

    #planes {
        /* width of items * number of items */
        width: calc(((100vw / 1.75) + 10vw) * 7);

        /* padding: 0 2.5vw; */
        height: 100vh;
        display: flex;
        align-items: center;
        cursor: grab;

        transition: background-color 0.5s;
    }

    .plane-wrapper {
        position: relative;

        width: calc(100vw / 1.75);
        height: 50vh;
        margin: auto 5vw;
        text-align: center;

        &:first-of-type {
            margin-left: 0;
        }

        &:hover {
            cursor: pointer;
        }
    }

    /* disable pointer events and text selection during drag */
    #planes.dragged .plane-wrapper {
        pointer-events: none;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        user-select: none;
    }

    .plane-title {
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 1;
        transform: translate3D(-50%, -50%, 0);
        font-size: 4vw;
        font-weight: 700;
        line-height: 1.2;
        text-transform: uppercase;
        color: #032f4d;
        -webkit-text-stroke: 1px white;

        transition: color 0.5s;
    }

    #planes.dragged .plane-title {
        color: transparent;
    }

    .plane {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        display: flex;
        overflow: hidden;
        transition: filter 0.5s;
        filter: grayscale(1);
    }

    #planes.dragged .plane {
        filter: grayscale(0);
    }

    .plane img {
        display: block;
        min-width: 100%;
        min-height: 100%;
        object-fit: cover;
        pointer-events: none;
    }
`;

export default Projects;
