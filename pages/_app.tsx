import {AppProps} from 'next/app';
import {AuthProvider} from '../components/auth/AuthProvider';
import '../styles/globals.css';

function MyApp({Component, pageProps}: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
