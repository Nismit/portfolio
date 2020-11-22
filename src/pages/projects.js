import { useRef, useEffect, useState } from 'react';
import styled from "@emotion/styled";
import gsap from 'gsap';
import data from '../data/projects';
import Slider from '../helpers/Slider';
import ComponentHead from '../components/ComponentHead';
import Link from 'next/link';

function Projects() {
    let slider;
    const refScrollContainer = useRef(null);

    useEffect(() => {
        const options = {
            easing: 0.075,
            duration: 500,
            dragSpeed: 1.75,
            offset: 'padding'
        }

        slider = new Slider(options);

        const tl = gsap.timeline();
        const element = refScrollContainer.current;
        tl.set(element, {opacity: 0});

        refScrollContainer.current.querySelector('img').onload = () => {
            console.log('Image loaded');
            tl.fromTo(element, {opacity: 0}, {duration: 0.6, opacity: 1});
        }

        return () => {
            if(slider) {
                slider.destroy();
            }
        }
    }, []);

    return (
        <>
            <ComponentHead headTitle="Projects" />

            <main>
                <_Scroll ref={refScrollContainer}>
                    <div className="slider">
                        <div id="planes">
                        {
                            data && data.allProjects.map((item, i) => {
                                const url = item.fields.title.replace(/\s/g, '-').toLowerCase();
                                return (
                                    <div className="plane-wrapper" key={i}>
                                        <Link as={`/project/${url}`} href={`/project?id=${i}`}>
                                            <a>
                                                <picture className="plane">
                                                    {
                                                        item.fields.hero.map((content, j) => {
                                                            if(content.fields.file.contentType === 'image/png') {
                                                                return <img key={j} src={content.fields.file.url} />
                                                            } else {
                                                                return <source key={j} srcSet={content.fields.file.url} type={content.fields.file.contentType} />
                                                            }
                                                        })
                                                    }
                                                </picture>
                                                <span className="plane-title">{item.fields.title}</span>
                                            </a>
                                        </Link>
                                    </div>
                                )
                            })
                        }
                        </div>
                    </div>
                </_Scroll>
            </main>
        </>
    )
}

const _Scroll = styled.div`
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
    }

    #planes {
        /* width of items * number of items */
        width: calc(((100vw / 1.75) + 10vw) * 7);

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
        font-weight: 700;
        font-family: 'DIN condensed';
        transform: translate3D(-50%, -50%, 0);
        font-size: 4vw;
        font-weight: 700;
        line-height: 1.2;
        text-transform: uppercase;
        color: #fff;
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

        &:after {
            content: '';
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, .7);
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1;
            transition: opacity 0.5s;
        }
    }

    @media (hover: hover) and (pointer: fine) {
        .plane-wrapper:hover {
            .plane {
                filter: grayscale(0);

                &:after {
                    opacity: 0.5;
                }
            }
        }
    }

    #planes.dragged .plane {
        filter: grayscale(0);

        &:after {
            opacity: 0;
        }
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
