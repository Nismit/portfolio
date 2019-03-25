import React from 'react';
import App, { Container } from 'next/app';
import Header from '../components/Header';
import MainVisual from '../components/MainVisual';

export default class CustomApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Header />
        <MainVisual />
        <Component {...pageProps} />
        <style jsx global>{`
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
            font-size: 16px;
            background-color #000;
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
            margin-bottom: 0;
          }

          h1 {
            letter-spacing: 7px;
            font-size: 7rem;
            line-height: 0.95;
          }

          p {
            margin-top: 0;
          }

          .page {
            position: relative;
            z-index: 10;
          }

          .page > div {
            max-width: 1200px;
            margin-left: auto;
            margin-right: auto;
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
        `}</style>
      </Container>
    )
  }
}