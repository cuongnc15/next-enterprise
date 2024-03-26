import { useNProgress } from '@/hooks/useNProgress';
import { AppLayout } from '@/layouts/app';
import Auth from '@/layouts/Auth/Auth';
import { isBrowser } from '@/shared/helpers';
import { asyncProcessAuth } from '@/store';
import store from '@/store/configureStore';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import '../assets/styles/app.scss';
import { ConfigProvider } from 'antd';

if (isBrowser()) {
  store.dispatch(asyncProcessAuth());
}
function MyApp({ Component, pageProps, router }: AppProps) {
  useNProgress();
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "'Lexend Deca', sans-serif",
        },
      }}
    >
      <Provider store={store}>
        {router.pathname.includes('admin') ? (
          <Auth>
            <AppLayout>
              <Component {...pageProps} />
            </AppLayout>
          </Auth>
        ) : (
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        )}
      </Provider>
    </ConfigProvider>
  );
}

export default MyApp;
