import '../styles/globals.css';

import {AppProps} from 'next/app';

import {AuthProvider} from '../components/auth/AuthProvider';

function MyApp({Component, pageProps}: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
