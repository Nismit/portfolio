import { useEffect, useRef } from 'react';
import styled from "@emotion/styled";
import Link from 'next/link';
import gsap from 'gsap';
import projectData from '../data/projects';
import ComponentHead from '../components/ComponentHead';
import ProjectImage from '../components/ProjectImage';

function Project(props) {
    let scrollBar, smoothScroll;
    const refContainer = useRef(null);
    const data = props.query ? projectData.allProjects[props.query.id].fields : null;
    const nextProject = projectData.allProjects[(props.query.id + 1)].fields
                        ? projectData.allProjects[(props.query.id + 1)].fields : projectData.allProjects[0].fields;
    const nextProjectUrl = nextProject.title.replace(/\s/g, '-').toLowerCase();
    const nextProjectId = projectData.allProjects[(props.query.id + 1)].fields ? (props.query.id + 1) : 0;

    useEffect(() => {
        async function getLocomotive() {
            const Locomotive = (await import('locomotive-scroll')).default;
            new Locomotive({
                el: refContainer.current,
                smooth: true
            });
        }

        // getLocomotive();

        // smoothScroll = new SmoothScroll({ element: refContainer.current });

        return () => {
            // if(scrollBar) {
            //     scrollBar.destroy();
            // }
        }
    }, []);

    return (
        <>
            <ComponentHead headTitle={data && data.title} />
            <main ref={refContainer} className={`project`}>
                <_Project>
                    <section className="project__hero">
                        <ProjectImage props={data.hero} />

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
                        {
                            data.contentsModule.map((modules, i) => {
                                return (
                                    <div key={i}>
                                        <ProjectImage props={modules.fields.images} />
                                    </div>
                                )
                            })
                        }
                    </section>

                    <section className="project__next">
                        <div className="project__next--container">
                            <p>
                                <Link as={`/project/${nextProjectUrl}`} href={`/project?id=${nextProjectId}`}>
                                    Next Project
                                </Link>
                            </p>
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
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;

            &:after {
                content: '';
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
                background-color: rgba(0, 0, 0, .85);
            }

            &--container {
                width: 100%;
                padding: 0 16vw;
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                z-index: 2;
            }

            .project__image {
                width: 100%;
                height: 100vh;
                object-fit: cover;

                img {
                    width: 100%;
                    height: 100vh;
                    object-fit: cover;
                }
            }
        }

        &__image {
            width: 100%;

            img {
                width: 100%;
                display: block;
                object-fit: cover;
            }
        }

        &__content {
            background-color: #171717;

            div {
                width: 70vw;
                margin: 0 auto;
                padding: 12rem 0;
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
            &--container {
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 9rem 0;

                a {
                    color: white;
                    font-weight: 700;
                    font-family: 'DIN condensed';
                    text-transform: uppercase;
                    text-decoration: none;
                    font-size: 70px;
                    letter-spacing: 1px;
                    position: relative;
                    color: rgba(255, 255, 255, 0.5);
                    transition: color 300ms ease-in;

                    &::before,
                    &::after {
                        content: '';
                        width: 50%;
                        height: 5px;
                        background-color: #fff;
                        position: absolute;
                        bottom: -4px;
                        transition: width 300ms ease-in;
                        opacity: 0;
                    }

                    &::before {
                        left: 50%;
                    }

                    &::after {
                        right: 50%;
                    }

                    &:hover {
                        color: rgba(255, 255, 255, 1);

                        &::before,
                        &::after {
                            opacity: 1;
                            width: 25%;
                        }
                    }
                }
            }
        }
    }
`;

export default Project;
