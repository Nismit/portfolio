import { Global, css } from '@emotion/core';

export default function GlobalStyle() {
    const GLOBAL_STYLE = css`
    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    html {
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
        -ms-overflow-style: scrollbar;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }

    body {
        margin: 0;
        color: #fff;
        font-size: 17px;
        background-color: #000;
        font-family: 'Roboto', sans-serif;
    }

    @font-face {
        font-family: 'DIN condensed';
        src:  url('/fonts/din-condensed-medium.woff2') format('woff2'),
                url('/fonts/din-condensed-medium.woff')  format('woff');
        font-weight: 500;
        font-style: normal;
    }

    @font-face {
        font-family: 'DIN condensed';
        src:  url('/fonts/din-condensed-bold.woff2') format('woff2'),
                url('/fonts/din-condensed-bold.woff')  format('woff');
        font-weight: 700;
        font-style: normal;
    }

    h1, h2, h3, h4 {
        font-family: 'DIN condensed';
        font-weight: 700;
        letter-spacing: 2px;
        text-transform: uppercase;
        margin-top: 0;
        margin-bottom: 1rem;
    }

    h1 {
        letter-spacing: 7px;
        font-size: 4.3rem;
        line-height: 0.95;
    }

    h2 {
        letter-spacing: 3px;
        font-size: 2.5rem;
        line-height: 0.95;
        margin-bottom: 2.2rem;
    }

    h3 {
        letter-spacing: 3px;
        font-size: 1.8rem;
        line-height: 0.95;
    }

    @media (min-width: 45.176em) {
        h1 {
        font-size: 7rem;
        }

        h2 {
        font-size: 3rem;
        line-height: 0.95;
        margin-bottom: 2.2rem;
        }

        h3 {
        font-size: 2rem;
        line-height: 0.95;
        }
    }

    p {
        margin-top: 0;
        margin-bottom: 1rem;
        line-height: 1.53;
    }

    ul {
        list-style: none;
        padding-left: 0;
    }

    .page {
        width: 100%;
        height: 100vh;
        overflow: hidden;
        position: relative;
        z-index: 10;
    }

    .page a {
        display: inline-block;
        position: relative;
        text-decoration: none;
        color: #fff;
        transition: color .5s;
    }

    .page a:hover {
        color: #2678bf;
    }

    .project__header, .about__header {
        width: 100%;
        height: 100vh;
        position: relative;
    }

    .content {
        max-width: 1200px;
        padding-top: 3rem;
        margin-left: auto;
        margin-right: auto;
    }

    .content p {
        color: rgba(255, 255, 255, .7);
    }

    .global-visual:after {
        content: '';
        width: 100vw;
        height: 40vh;
        position: absolute;
        left: 0;
        bottom: 0;
        background: -webkit-linear-gradient(top, rgba(0,0,0,0) 0%,rgba(0,0,0,1) 100%);
        background: linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,1) 100%);
    }

    .virtual-scroll {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 100vh;
        margin: 0;
        will-change: transform;
    }

    .scrollbar-track-y {
        width: 5px !important;
    }

    .scrollbar-thumb {
        width: 5px !important;
        background: rgba(255, 255, 255, .95) !important;
    }

    .page-transition-enter {
        opacity: 0;
        transform: translate3d(0, 600px, 0);
    }
    .page-transition-enter-active {
        opacity: 1;
        transform: translate3d(0, 0px, 0);
        transition: opacity 1s ease-out 600ms, transform 0.6s ease-out 1000ms;
    }
    .page-transition-exit {
        opacity: 1;
    }
    .page-transition-exit-active {
        opacity: 0;
        transition: opacity 1.6s;
    }
    `;
    return <Global styles={GLOBAL_STYLE} />;
}
