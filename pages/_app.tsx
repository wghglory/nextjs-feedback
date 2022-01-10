import '../styles/globals.css';
import '@/lib/firebase';

import {ChakraProvider} from '@chakra-ui/react';
import {AppProps} from 'next/app';
import {QueryClient, QueryClientProvider} from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools';

import theme from '@/styles/theme';

import {AuthProvider} from '../components/auth/AuthProvider';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // useErrorBoundary: true,
      refetchOnWindowFocus: true,
      retry(failureCount, error: any) {
        if (error.status === 404) return false;
        // retry once
        else if (failureCount < 1) return true;
        else return false;
      },
    },
  },
});

function MyApp({Component, pageProps}: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </ChakraProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default MyApp;
