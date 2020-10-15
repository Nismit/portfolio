import { useEffect, useRef } from 'react';
import styled from "@emotion/styled";
import gsap from 'gsap';
import projectData from '../data/projects';
import Footer from '../components/Footer';
import ComponentHead from '../components/ComponentHead';
import ComponentHeadBlock from '../components/ComponentHeadBlock';
import ComponentProjectDescription from '../components/ComponentProjectDescription';
import ComponentTextBlock from '../components/ComponentTextBlock';
import ComponentSkillBlock from '../components/ComponentSkillBlock';
import ComponentMediaBlock from '../components/ComponentMediaBlock';
import ComponentAlternativeBlock from '../components/ComponentAlternativeBlock';

function Project(props) {
    let visualContainer, scrollBar;
    const refContainer = useRef(null);
    const data = props.query ? projectData.allProjects[props.query.id].fields : null;

    // useEffect(() => {
    //     const smoothScrollbar = require('smooth-scrollbar').default;
    //     scrollBar = smoothScrollbar.init(refContainer.current, {
    //         thumbMinSize: 10,
    //         alwaysShowTracks: true
    //     });

    //     scrollBar.addListener(() => onUpdateScroll());
    //     visualContainer = document.querySelector('.global-visual');

    //     return () => {
    //         if(visualContainer !== undefined) {
    //             visualContainer.style.transform = `translate3d(0, 0, 0)`;
    //         }
    //     }
    // }, []);

    // useEffect(() => {
    //     gsap.to(refContainer.current, { scrollTop: 0, duration: 0.8 });
    // });

    // const onUpdateScroll = () => {
    //     visualContainer.style.transform = `translate3d(0,-${scrollBar.offset.y}px, 0)`;
    // }

    return (
        <>
            <ComponentHead headTitle={data && data.title} />
            <main ref={refContainer} className={`project`}>
                <_Project>
                    <section className="project__hero">
                        <div className="project__hero--container">
                            <h1>{data.title}</h1>
                        </div>
                    </section>

                    <section className="project__stats">
                        <ul>
                            <li>
                                <span className="label">Client</span>
                                <span>{ data.client }</span>
                            </li>
                            <li>
                                <span className="label">Tech Stack</span>
                                <span>{ data.techStack }</span>
                            </li>
                            <li>
                                <span className="label">Role</span>
                                <span>{ data.role }</span>
                            </li>
                            <li>
                                <a href="#" className="launch__button">Launch</a>
                            </li>
                        </ul>
                    </section>

                    <section className="project__content">
                        <div style={{ margin: '8rem auto', width: '70vw', height: '600px', backgroundColor: 'rgba(255, 255, 255, 0.4)' }}></div>

                        <div style={{ margin: '8rem auto', width: '70vw', height: '600px', backgroundColor: 'rgba(255, 255, 255, 0.4)' }}></div>

                        <div style={{ margin: '8rem auto', width: '70vw', height: '600px', backgroundColor: 'rgba(255, 255, 255, 0.4)' }}></div>

                        <div style={{ width: '100%', height: '600px', backgroundColor: 'rgba(255, 255, 255, 0.4)' }}></div>

                        <div style={{ margin: '8rem auto', width: '70vw', height: '600px', backgroundColor: 'rgba(255, 255, 255, 0.4)' }}></div>
                    </section>

                    <section className="project__next">
                        <div className="project__next--container">

                        </div>
                    </section>

                </_Project>
            </main>
        </>
    )
}

Project.getInitialProps = async ({ query }) => {
    return { query }
}

const _Project = styled.div`
    .project {
        &__hero {
            width: 100%;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;

            &--container {
                width: 100%;
                padding: 0 16vw;

            }
        }

        &__stats {
            width: 100%;
            padding: 8rem 16vw;

            ul {
                margin: 0;
                padding-left: 0;
                display: flex;
                align-items: center;

                li {
                    font-size: 13px;
                    margin-right: 5vw;

                    &:last-child {
                        flex-grow: 2;
                        margin-right: 0;
                        text-align: right;
                    }
                }
            }

            .label {
                display: block;
                margin-bottom: 0.5rem;
                font-weight: 700;
                text-transform: uppercase;
            }

            .launch__button {
                display: inline-block;
                width: 320px;
                border: 1px solid #fff;
                font-family: 'DIN condensed';
                font-weight: 700;
                font-size: 14px;
                text-transform: uppercase;
                text-align: center;
                padding: 1.22rem 1rem;
                letter-spacing: 2px;
                color: #fff;
                text-decoration: none;
                /* background: repeating-linear-gradient(45deg, rgb(0, 0, 0), rgb(0, 0, 0) 5px, rgb(255, 255, 255) 5px, rgb(255, 255, 255) 10px); */
                /* background: repeating-linear-gradient(-70deg,rgb(0,0,0),rgb(0,0,0) 15px,rgba(255,255,255, 0.4) 10px,rgba(255,255,255, 0.4) 20px); */
                background-image:
                    repeating-linear-gradient(
                    45deg,
                    transparent,
                    transparent 1rem,
                    #ccc 1rem,
                    #ccc 2rem
                    );
                background-size: 200% 200%;
                animation: barberpole 10s linear infinite;
            }

            @keyframes barberpole {
                100% {
                    background-position: 100% 100%;
                }
            }
        }

        &__next {
            margin-top: 8rem;

            &--container {
                height: 600px;
                background-color: rgba(255, 255, 255, 0.4);
            }
        }
    }
`;

export default Project;
