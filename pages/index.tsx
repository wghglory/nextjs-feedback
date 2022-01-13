import {Box, Button, Flex, Link, Stack, Text} from '@chakra-ui/react';
import Head from 'next/head';

import {useAuth} from '@/components/auth/AuthProvider';
import GithubIcon from '@/components/icons/GithubIcon';
import GoogleIcon from '@/components/icons/GoogleIcon';
import LogoIcon from '@/components/icons/LogoIcon';
import {cookieName} from '@/const';

export default function Home() {
  const auth = useAuth();

  return (
    <Box bg="gray.100">
      <Flex
        bg="gray.100"
        as="main"
        direction="column"
        align="center"
        justify="center"
        h="100vh"
        maxW="700px"
        margin="0 auto"
        p={[4, 8]}
      >
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: `
              if (document.cookie && document.cookie.includes('${cookieName}')) {
                window.location.href = "/dashboard"
              }
            `,
            }}
          />
          <title>Fast Feedback</title>
        </Head>

        <LogoIcon color="black" name="logo" boxSize={12} />
        <Text mb={4}>
          <Text as="span" fontWeight="bold" display="inline">
            Fast Feedback
          </Text>
          {' is being built as part of '}
          <Link href="https://react2025.com" isExternal textDecoration="underline">
            React 2025
          </Link>
          {`. It's the easiest way to add comments or reviews to your static site. It's still a work-in-progress, but you can try it out by logging in.`}
        </Text>
        {auth.user ? (
          <Button
            as="a"
            href="/dashboard"
            backgroundColor="white"
            color="gray.900"
            variant="outline"
            fontWeight="medium"
            mt={4}
            size="lg"
            _hover={{bg: 'gray.100'}}
            _active={{
              bg: 'gray.100',
              transform: 'scale(0.95)',
            }}
          >
            View Dashboard
          </Button>
        ) : (
          <Stack>
            <Button
              onClick={() => auth.signinWithGithub()}
              backgroundColor="gray.900"
              color="white"
              fontWeight="medium"
              leftIcon={<GithubIcon />}
              mt={4}
              size="lg"
              _hover={{bg: 'gray.700'}}
              _active={{
                bg: 'gray.800',
                transform: 'scale(0.95)',
              }}
            >
              Sign In with GitHub
            </Button>
            <Button
              onClick={() => auth.signinWithGoogle()}
              backgroundColor="white"
              color="gray.900"
              variant="outline"
              fontWeight="medium"
              leftIcon={<GoogleIcon />}
              mt={4}
              size="lg"
              _hover={{bg: 'gray.100'}}
              _active={{
                bg: 'gray.100',
                transform: 'scale(0.95)',
              }}
            >
              Sign In with Google
            </Button>
          </Stack>
        )}
      </Flex>
    </Box>
  );
}
