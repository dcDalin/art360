import { NhostNextProvider } from '@nhost/nextjs';
import { NhostApolloProvider } from '@nhost/react-apollo';
import { AppProps } from 'next/app';
import Router from 'next/router';
import nProgress from 'nprogress';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';

import '@/styles/globals.css';
import '@/styles/nprogress.css';

import nhost from '@/lib/nhost';

import AdminCRUDModal from '@/components/modals/AdminCRUDModal';

import ImageUploadProvider from '@/context/ImageUploadContext';
import { wrapper } from '@/redux/store';

function MyApp({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);

  useEffect(() => {
    Router.events.on('routeChangeStart', nProgress.start);
    Router.events.on('routeChangeError', nProgress.done);
    Router.events.on('routeChangeComplete', nProgress.done);
  }, []);
  return (
    <Provider store={store}>
      <NhostNextProvider nhost={nhost} initial={props.pageProps.nhostSession}>
        <NhostApolloProvider nhost={nhost}>
          <ImageUploadProvider>
            <Component {...props.pageProps} />
            <Toaster />
            <AdminCRUDModal />
          </ImageUploadProvider>
        </NhostApolloProvider>
      </NhostNextProvider>
    </Provider>
  );
}
export default MyApp;
