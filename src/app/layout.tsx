import type { Metadata } from 'next';
import Script from 'next/script';
import Header from '@/components/Header';
import * as gtag from '@/lib/gtag';
import MainContainer from './_components/MainContainer';
import '@/styles.css';
import '@/prism-night-owl.css';

export const metadata: Metadata = {
  title: 'Michinobu Nishimoto | Front End Engineer',
  description: 'Front-end developer based in Vancouver',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
        />
        <Header />
        <MainContainer>{children}</MainContainer>
      </body>
    </html>
  );
}
