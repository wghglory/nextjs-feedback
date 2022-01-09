import '../styles/globals.css';

import {ChakraProvider} from '@chakra-ui/react';
import {AppProps} from 'next/app';

import theme from '@/styles/theme';

import {AuthProvider} from '../components/auth/AuthProvider';

function MyApp({Component, pageProps}: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
