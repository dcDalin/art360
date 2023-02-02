import { NhostNextProvider } from '@nhost/nextjs';
import { NhostApolloProvider } from '@nhost/react-apollo';
import { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';

// carousel css files
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// global styles
import '@/styles/globals.css';

import nhost from '@/lib/nhost';

import ImageUploadProvider from '@/context/ImageUploadContext';
import { wrapper } from '@/redux/store';

function MyApp({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <NhostNextProvider nhost={nhost} initial={props.pageProps.nhostSession}>
        <NhostApolloProvider nhost={nhost}>
          <ImageUploadProvider>
            <NextNProgress />
            <Component {...props.pageProps} />
            <Toaster />
          </ImageUploadProvider>
        </NhostApolloProvider>
      </NhostNextProvider>
    </Provider>
  );
}
export default MyApp;
