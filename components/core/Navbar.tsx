import {Avatar, Button, Flex, Link} from '@chakra-ui/react';

import {useAuth} from '../auth/AuthProvider';
import LogoIcon from '../icons/LogoIcon';

export default function Navbar() {
  const {user, signout, signinWithGithub} = useAuth();

  return (
    <Flex backgroundColor="white" mb={16} w="full" as="header">
      <Flex alignItems="center" justifyContent="space-between" px={8} py={4} maxW="1280px" margin="0 auto" w="full">
        <Flex>
          <LogoIcon mr={8} boxSize={8} />
          <Link mr={4}>Sites</Link>
          <Link>Feedback</Link>
        </Flex>
        <Flex justifyContent="center" alignItems="center">
          {user ? (
            <Button variant="ghost" mr={2} onClick={() => signout()}>
              Log Out
            </Button>
          ) : (
            <Button variant="ghost" mr={2} onClick={() => signinWithGithub()}>
              Sign In
            </Button>
          )}
          <Avatar size="sm" src={user?.photoUrl || ''} />
        </Flex>
      </Flex>
    </Flex>
  );
}
