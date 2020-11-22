import { useState } from 'react';
import Link from 'next/link';
import styled from "@emotion/styled";

const Header = () => {
    const [aboutActive, setAboutActive] = useState(false);
    const [projectsActive, setProjectsActive] = useState(false);

    const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    return (
        <_Header>
            <div className="header__container">
                <Link scroll={false} href="/">
                    <a className="logo" onClick={() => sleep(200).then(() =>{ setAboutActive(false); setProjectsActive(false); })}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="80.839" height="24.692" viewBox="0 0 81 25">
                            <path d="M80.839 0v24.692h-7.307v-.008l-.007.008L44.099 0h11.367l18.066 15.16V0h7.307zm-26.77 24.692h11.366L36.026.014 36.014 0l-.002.002L36.009 0l-.012.014-17.992 15.098L0 .003v9.538L18.006 24.65l.006-.008L36.011 9.541l18.058 15.151z" />
                        </svg>
                    </a>
                </Link>

                <nav role="navigation" className="menu">
                    <ul>
                        <li>
                            <Link scroll={false} href="/projects" >
                                <a onClick={() => sleep(200).then(() =>{ setProjectsActive(projectsActive ? projectsActive : !projectsActive); setAboutActive(false); })} className={`${projectsActive ? 'isActive' : ''} menu__link`}>Projects</a>
                            </Link>
                        </li>
                        <li>
                            <Link scroll={false} href="/about">
                                <a onClick={() => sleep(200).then(() =>{ setAboutActive(!aboutActive); setProjectsActive(false); })} className={`${aboutActive ? 'isActive' : ''} menu__link`}>About</a>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </_Header>
    )
}

const _Header = styled.header`
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 15;

    .header__container {
        display: flex;
        width: 100%;
        padding: 1rem;
        justify-content: space-between;
    }

    .menu {
        &__link {
            color: #fff;
            text-decoration: none;
            font-size: 0.9rem;
            text-transform: uppercase;
            font-family: 'DIN condensed';
            letter-spacing: 1px;
            position: relative;
            color: rgba(255, 255, 255, 0.5);
            transition: color 300ms ease-in;

            &::before,
            &::after {
                content: '';
                width: 50%;
                height: 1px;
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

            &:hover,
            &.isActive {
                color: rgba(255, 255, 255, 1);

                &::before,
                &::after {
                    opacity: 1;
                    width: 25%;
                }
            }
        }

        ul {
            margin-bottom: 0;

            li {
                display: inline-block;
                padding-left: 3rem;

                &:first-of-type {
                    padding-left: 0;
                }
            }
        }
    }

    @keyframes fadein {
        from {
            opacity: 0;
            transform: translateX(0%);
        }
        to {
            opacity: 1;
            transform: translateX(0%);
        }
    }

    @keyframes fadeout {
        0% {
            opacity: 1;
            transform: translateX(0%);
        }
        89% {
            transform: translateX(0%);
        }
        90% {
            transform: translateX(100%);
        }
        100% {
            opacity: 0;
        }
    }

    .logo {
        svg {
            width: 60px;

            /* transition: fill 3s ease-out */

            path {
                fill: #fff;
                /* stroke-dasharray: 30; */
                stroke-dasharray: 5;
                /* stroke-dashoffset: 20; */
                /* animation: dash 1s linear infinite; */
            }
        }

        /* &:hover {
            svg {
                fill: #fff;
            }
        } */
    }

    @keyframes dash {
        from {
            stroke-dashoffset: 20;
        }
        to {
            stroke-dashoffset: 0;
        }
    }

    @media (min-width: 45.176em) {
        top: 60px;

        .header__container {
            padding: 0 5.3rem;
        }

        .menu__link {
            font-size: 1rem;
        }

        .logo svg {
            width: 65px;
            position: static;
        }
    }
`;

export default Header;
