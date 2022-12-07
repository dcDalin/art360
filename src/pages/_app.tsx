import { NhostClient, NhostNextProvider } from '@nhost/nextjs';
import { NhostApolloProvider } from '@nhost/react-apollo';
import { AppProps } from 'next/app';
import Router from 'next/router';
import nProgress from 'nprogress';
import { useEffect } from 'react';

import '@/styles/globals.css';
import '@/styles/nprogress.css';

const nhost = new NhostClient({
  subdomain: process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN || 'hqgvidhnlbykeqlgeglh',
  region: process.env.NEXT_PUBLIC_NHOST_REGION || 'eu-central-1',
});

Router.events.on('routeChangeStart', nProgress.start);
Router.events.on('routeChangeError', nProgress.done);
Router.events.on('routeChangeComplete', nProgress.done);

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    Router.events.on('routeChangeStart', nProgress.start);
    Router.events.on('routeChangeError', nProgress.done);
    Router.events.on('routeChangeComplete', nProgress.done);
  }, []);
  return (
    <NhostNextProvider nhost={nhost} initial={pageProps.nhostSession}>
      <NhostApolloProvider nhost={nhost}>
        <Component {...pageProps} />
      </NhostApolloProvider>
    </NhostNextProvider>
  );
}

export default MyApp;
