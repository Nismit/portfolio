import React from 'react';
import App, { Container } from 'next/app';
import MainLayout from '../layouts/MainLayout';

export default class CustomApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </Container>
    )
  }
}