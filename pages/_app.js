import React from 'react';
import App, { Container } from 'next/app';
import { PageTransition } from 'next-page-transitions';
import Header from '../components/Header';
import MainVisual from '../components/MainVisual';

export default class CustomApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render() {
    const { Component, pageProps, router } = this.props;

    return (
      <Container>
        <Header />
        <MainVisual />
        <PageTransition timeout={1000} classNames="page page-transition">
          <Component {...pageProps} key={router.route} />
        </PageTransition>
      </Container>
    )
  }
}