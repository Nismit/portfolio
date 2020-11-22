import { useEffect, useRef } from 'react';
import styled from "@emotion/styled";
import gsap from 'gsap';
import data from '../data/about';
import ComponentHead from '../components/ComponentHead';

function AboutPage() {
    const refContainer = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline();
        const element = refContainer.current;
        // tl.set(element.getElementsByClassName('about__title'), {y: 80, opacity: 0});
        // tl.set(element.getElementsByClassName('about__title'), {y: 80, opacity: 0});
        tl.delay(1);
        tl.fromTo(element.getElementsByClassName('about__title'), {y: 80, opacity: 0}, {duration: 0.6, y: 0, opacity: 1});
        tl.fromTo(element.getElementsByClassName('social'), {y: 80, opacity: 0}, {duration: 0.6, y: 0, opacity: 1});
        tl.fromTo(element.getElementsByClassName('about__content'), {x: -60, opacity: 0}, {duration: 0.6, x: 0, opacity: 1});
        tl.fromTo(element.getElementsByClassName('mail'), {y: 80, opacity: 0}, {duration: 0.6, y: 0, opacity: 1});

    }, []);

    return (
        <>
            <ComponentHead headTitle="About" />
            <_Main ref={refContainer} className="page about virtual-scroll">
                <div>
                    <div className="about__title--section">
                        <h1 className="about__title">About</h1>

                        <div className="social">
                            <a className="icon github" href="https://github.com/Nismit" target="_blank" rel="noopener noreferrer">
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="28" viewBox="0 0 24 28">
                                    <path d="M12 2c6.625 0 12 5.375 12 12 0 5.297-3.437 9.797-8.203 11.391-0.609 0.109-0.828-0.266-0.828-0.578 0-0.391 0.016-1.687 0.016-3.297 0-1.125-0.375-1.844-0.812-2.219 2.672-0.297 5.484-1.313 5.484-5.922 0-1.313-0.469-2.375-1.234-3.219 0.125-0.313 0.531-1.531-0.125-3.187-1-0.313-3.297 1.234-3.297 1.234-0.953-0.266-1.984-0.406-3-0.406s-2.047 0.141-3 0.406c0 0-2.297-1.547-3.297-1.234-0.656 1.656-0.25 2.875-0.125 3.187-0.766 0.844-1.234 1.906-1.234 3.219 0 4.594 2.797 5.625 5.469 5.922-0.344 0.313-0.656 0.844-0.766 1.609-0.688 0.313-2.438 0.844-3.484-1-0.656-1.141-1.844-1.234-1.844-1.234-1.172-0.016-0.078 0.734-0.078 0.734 0.781 0.359 1.328 1.75 1.328 1.75 0.703 2.141 4.047 1.422 4.047 1.422 0 1 0.016 1.937 0.016 2.234 0 0.313-0.219 0.688-0.828 0.578-4.766-1.594-8.203-6.094-8.203-11.391 0-6.625 5.375-12 12-12zM4.547 19.234c0.031-0.063-0.016-0.141-0.109-0.187-0.094-0.031-0.172-0.016-0.203 0.031-0.031 0.063 0.016 0.141 0.109 0.187 0.078 0.047 0.172 0.031 0.203-0.031zM5.031 19.766c0.063-0.047 0.047-0.156-0.031-0.25-0.078-0.078-0.187-0.109-0.25-0.047-0.063 0.047-0.047 0.156 0.031 0.25 0.078 0.078 0.187 0.109 0.25 0.047zM5.5 20.469c0.078-0.063 0.078-0.187 0-0.297-0.063-0.109-0.187-0.156-0.266-0.094-0.078 0.047-0.078 0.172 0 0.281s0.203 0.156 0.266 0.109zM6.156 21.125c0.063-0.063 0.031-0.203-0.063-0.297-0.109-0.109-0.25-0.125-0.313-0.047-0.078 0.063-0.047 0.203 0.063 0.297 0.109 0.109 0.25 0.125 0.313 0.047zM7.047 21.516c0.031-0.094-0.063-0.203-0.203-0.25-0.125-0.031-0.266 0.016-0.297 0.109s0.063 0.203 0.203 0.234c0.125 0.047 0.266 0 0.297-0.094zM8.031 21.594c0-0.109-0.125-0.187-0.266-0.172-0.141 0-0.25 0.078-0.25 0.172 0 0.109 0.109 0.187 0.266 0.172 0.141 0 0.25-0.078 0.25-0.172zM8.937 21.438c-0.016-0.094-0.141-0.156-0.281-0.141-0.141 0.031-0.234 0.125-0.219 0.234 0.016 0.094 0.141 0.156 0.281 0.125s0.234-0.125 0.219-0.219z"></path>
                                </svg>
                            </a>
                            <a className="icon linkedin" href="https://www.linkedin.com/in/nismit/" target="_blank" rel="noopener noreferrer">
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="28" viewBox="0 0 24 28">
                                    <path d="M5.453 9.766v15.484h-5.156v-15.484h5.156zM5.781 4.984c0.016 1.484-1.109 2.672-2.906 2.672v0h-0.031c-1.734 0-2.844-1.188-2.844-2.672 0-1.516 1.156-2.672 2.906-2.672 1.766 0 2.859 1.156 2.875 2.672zM24 16.375v8.875h-5.141v-8.281c0-2.078-0.75-3.5-2.609-3.5-1.422 0-2.266 0.953-2.641 1.875-0.125 0.344-0.172 0.797-0.172 1.266v8.641h-5.141c0.063-14.031 0-15.484 0-15.484h5.141v2.25h-0.031c0.672-1.062 1.891-2.609 4.672-2.609 3.391 0 5.922 2.219 5.922 6.969z"></path>
                                </svg>
                            </a>
                            <a className="icon twitter" href="https://twitter.com/nismit_" target="_blank" rel="noopener noreferrer">
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="26" height="28" viewBox="0 0 26 28">
                                    <path d="M25.312 6.375c-0.688 1-1.547 1.891-2.531 2.609 0.016 0.219 0.016 0.438 0.016 0.656 0 6.672-5.078 14.359-14.359 14.359-2.859 0-5.516-0.828-7.75-2.266 0.406 0.047 0.797 0.063 1.219 0.063 2.359 0 4.531-0.797 6.266-2.156-2.219-0.047-4.078-1.5-4.719-3.5 0.313 0.047 0.625 0.078 0.953 0.078 0.453 0 0.906-0.063 1.328-0.172-2.312-0.469-4.047-2.5-4.047-4.953v-0.063c0.672 0.375 1.453 0.609 2.281 0.641-1.359-0.906-2.25-2.453-2.25-4.203 0-0.938 0.25-1.797 0.688-2.547 2.484 3.062 6.219 5.063 10.406 5.281-0.078-0.375-0.125-0.766-0.125-1.156 0-2.781 2.25-5.047 5.047-5.047 1.453 0 2.766 0.609 3.687 1.594 1.141-0.219 2.234-0.641 3.203-1.219-0.375 1.172-1.172 2.156-2.219 2.781 1.016-0.109 2-0.391 2.906-0.781z"></path>
                                </svg>
                            </a>
                        </div>
                    </div>

                    <div className="about__content">
                        <p>I have over 7 years of experience as a front end developer.
                        I'm passionate about coding and performance. Also, I want the whole team to be better than now. On a daily basis,
                        I'm learning and increasing my knowledge of new technologies, even if it's not in my field such as back end,
                        because there might be some new approaches. I should have a good eye for design, so I look at a lot of websites and apps to learn.
                        Personally, I'd love to WebGL stuff because it has a ton of visual expressions on the Web, so I keep to make something with WebGL.</p>
                    </div>

                    <p className="mail"><a href="mailto:nismit.dev@gmail.com" className="mail__button">Drop Me Line</a></p>
                </div>
            </_Main>
        </>
    )
}

const _Main = styled.main`
    width: 796px;
    max-width: 100%;
    height: 100vh;
    margin: 0 auto;
    display: flex;
    align-items: center;
    padding-left: 32px;
    padding-right: 32px;

    .about {
        &__title {
            margin-bottom: 0;

            font-family: 'DIN condensed';
            font-weight: 700;
            letter-spacing: 2px;
            text-transform: uppercase;

            &--section {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 4rem;
            }
        }
    }

    .social {
        display: flex;
        justify-content: space-between;

        a:last-child {
            margin-right: 0;
        }
    }

    .icon {
        display: inline-block;
        margin: 0 1.5rem;

        svg {
            fill: white;
            transition: fill 500ms;
        }

        &.github svg {
            width: 22px;
        }

        &.linkedin svg {
            width: 20px;
        }

        &.twitter svg {
            width: 22px;
        }

        &.github:hover svg {
            fill: #4078c0;
        }

        &.linkedin:hover svg {
            fill: #0077b5;
        }

        &.twitter:hover svg {
            fill: #1da1f2;
        }
    }

    .mail {
        margin-top: 4rem;
        text-align: right;

        &__button {
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
    }
`;

export default AboutPage;
