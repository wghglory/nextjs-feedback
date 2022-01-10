import {Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, Heading} from '@chakra-ui/react';

import Navbar from '@/components/core/Navbar';

import AddSiteButtonWithModal from './AddSiteButtonWithModal';

const DashboardShell = ({children}: {children: React.ReactNode}) => {
  return (
    <Box backgroundColor="gray.100" h="100%">
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
          <AddSiteButtonWithModal>+ Add Site</AddSiteButtonWithModal>
        </Flex>

        {/* Card */}
        <Box mb="12">{children}</Box>
      </Flex>
    </Box>
  );
};

export default DashboardShell;
