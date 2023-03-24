import { NhostProvider } from '@nhost/nextjs';
import { NhostApolloProvider } from '@nhost/react-apollo';
import { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';

// global styles
import '@/styles/globals.css';

import nhost from '@/lib/nhost';

import ImageUploadProvider from '@/context/ImageUploadContext';
import { wrapper } from '@/redux/store';

function MyApp({ Component, pageProps, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <NhostProvider nhost={nhost} initial={pageProps.nhostSession}>
        <NhostApolloProvider nhost={nhost}>
          <ImageUploadProvider>
            <NextNProgress />
            <Component {...props.pageProps} />
            <Toaster />
          </ImageUploadProvider>
        </NhostApolloProvider>
      </NhostProvider>
    </Provider>
  );
}
export default MyApp;
