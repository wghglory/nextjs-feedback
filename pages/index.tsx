import {Button, Flex} from '@chakra-ui/react';
import Head from 'next/head';

import {useAuth} from '@/components/auth/AuthProvider';
import LogoIcon from '@/components/icons/LogoIcon';

export default function Home() {
  const auth = useAuth();

  return (
    <Flex as="main" direction="column" align="center" justify="center" h="100%">
      <Head>
        <title>Fast Feedback</title>
      </Head>

      <LogoIcon color="black" name="logo" boxSize={12} />
      {auth.user ? (
        <Button as="a" href="/dashboard">
          View Dashboard
        </Button>
      ) : (
        <Button mt={4} size="sm" onClick={() => auth.signinWithGithub()}>
          Sign In
        </Button>
      )}
    </Flex>
  );
}
