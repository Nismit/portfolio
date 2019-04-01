import React from 'react';
import App, { Container } from 'next/app';
import { PageTransition } from 'next-page-transitions';
import Header from '../components/Header';
import MainVisual from '../components/MainVisual';

export default class CustomApp extends App {
  render() {
    const { Component, pageProps, router } = this.props;

    return (
      <Container>
        <Header />
        <MainVisual />
        <PageTransition timeout={1000} classNames="page page-transition">
          <Component {...pageProps} key={router.route} />
        </PageTransition>
        <style jsx global>{`
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
            background-color #000;
            font-family: 'Open Sans', sans-serif;
          }

          @font-face {
            font-family: 'DIN condensed';
            src:  local('DIN condensed'),
                  url('/static/fonts/din-condensed-bold.woff2') format('woff2'),
                  url('/static/fonts/din-condensed-bold.woff')  format('woff'),
                  url('/static/fonts/din-condensed-bold.ttf')   format('truetype'),
                  url('/static/fonts/din-condensed-bold.eot')   format('embedded-opentype');
            font-weight: 700;
            font-style: normal;
          }

          h1, h2, h3, h4 {
            font-family: 'DIN condensed';
            letter-spacing: 2px;
            text-transform: uppercase;
            margin-top: 0;
            margin-bottom: 1rem;
          }

          h1 {
            letter-spacing: 7px;
            font-size: 7rem;
            line-height: 0.95;
          }

          h2 {
            letter-spacing: 3px;
            font-size: 3rem;
            line-height: 0.95;
            margin-bottom: 2.2rem;
          }

          h3 {
            letter-spacing: 3px;
            font-size: 2rem;
            line-height: 0.95;
          }

          p {
            margin-top: 0;
            margin-bottom: 1rem;
            line-height: 1.53;
          }

          .page {
            position: relative;
            z-index: 10;
          }

          .content {
            max-width: 1200px;
            padding-top: 3rem;
            margin-left: auto;
            margin-right: auto;
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

          .page-transition-enter {
            opacity: 0;
            transform: translate3d(0, 0, 500px);
          }
          .page-transition-enter-active {
            opacity: 1;
            transform: translate3d(0, 0, 0px);
            transition: opacity 1s, transform 1s;
          }
          .page-transition-exit {
            opacity: 1;
          }
          .page-transition-exit-active {
            opacity: 0;
            transform: translate3d(0, 0, 500px);
            transition: opacity 1s, transform 1s;
          }
        `}</style>
      </Container>
    )
  }
}