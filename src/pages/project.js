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
    const nextProject = projectData.allProjects[(props.query.id + 1)]
                        ? projectData.allProjects[(props.query.id + 1)].fields : projectData.allProjects[0].fields;
    const nextProjectUrl = nextProject.title.replace(/\s/g, '-').toLowerCase();
    const nextProjectId = projectData.allProjects[(props.query.id + 1)] ? (props.query.id + 1) : 0;

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
                                <a href={ data.siteUrl } target="_blank" rel="noopener" className="launch__button">Launch</a>
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
                                    <a>Next Project</a>
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
                padding: 0 2.5rem;
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                z-index: 2;

                h1 {
                    font-size: 3.5rem;
                }
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

        &__video {
            max-width: 100%;
            width: 100%;
            height: auto;
        }

        &__content {
            background-color: rgba(23, 23, 23, 0.7);

            div {
                width: 100%;
                padding: 6rem 0;
            }
        }

        &__stats {
            width: 100%;
            padding: 6rem 2.5rem;

            ul {
                margin: 0;
                padding-left: 0;
                display: flex;
                flex-direction: column;

                li {
                    font-size: 13px;
                    margin-right: 0;
                    margin-bottom: 0.8rem;

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
                width: 100%;
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
                position: relative;
                transition: color 300ms ease-in;
                margin-top: 3rem;

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
            }

            @media (hover: hover) and (pointer: fine) {
                .launch__button {
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
                    font-size: 50px;
                    letter-spacing: 1px;
                    position: relative;
                    color: rgba(255, 255, 255, 0.5);
                    transition: color 300ms ease-in;
                }
            }
        }

        @media (min-width: 45.176em) {
            &__hero {
                &--container {
                    padding: 0 16vw;
                }
            }

            &__stats {
                padding: 8rem 16vw;

                ul {
                    flex-direction: row;
                    align-items: center;

                    li {
                        margin-right: 5vw;
                        margin-bottom: 0;
                    }
                }

                .launch__button {
                    width: 320px;
                    margin-top: 0;
                }
            }

            &__content {
                div {
                    width: 70vw;
                    margin: 0 auto;
                    padding: 12rem 0;
                }
            }

            &__next {
                &--container {
                    a {
                        font-size: 70px;

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
    }
`;

export default Project;
