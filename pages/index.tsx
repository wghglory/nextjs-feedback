import {Button, Code, Heading, Text} from '@chakra-ui/react';
import Head from 'next/head';

import {useAuth} from '../components/auth/AuthProvider';
import styles from '../styles/Home.module.css';

export default function Home() {
  const auth = useAuth();

  return (
    <div className={styles.container}>
      <Head>
        <title>Fast Feedback</title>
      </Head>
      <main>
        <Heading>Fast Feedback</Heading>
        <Text>
          Current user: <Code>{auth.user ? auth.user.email : 'None'}</Code>
        </Text>
        {auth.user ? (
          <Button onClick={() => auth.signout()}>Sign Out</Button>
        ) : (
          <Button onClick={() => auth.signinWithGithub()}>Sign In</Button>
        )}
      </main>
    </div>
  );
}
