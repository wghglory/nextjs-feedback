import {Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Flex, Heading} from '@chakra-ui/react';
import React from 'react';

import Navbar from '@/components/core/Navbar';

const DashboardShell = ({children}: {children: React.ReactNode}) => {
  return (
    <Box backgroundColor="gray.100" h="100vh">
      <Navbar />

      <Flex margin="0 auto" direction="column" maxW="1280px" px={8}>
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink>Sites</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        {/* Add Site action bar */}
        <Flex justifyContent="space-between" mb={8} as="section">
          <Heading>My Sites</Heading>
          <Button
            backgroundColor="gray.900"
            color="white"
            fontWeight="medium"
            _hover={{bg: 'gray.700'}}
            _active={{
              bg: 'gray.800',
              transform: 'scale(0.95)',
            }}
          >
            + Add Site
          </Button>
        </Flex>

        {/* Card */}
        {children}
      </Flex>
    </Box>
  );
};

export default DashboardShell;
