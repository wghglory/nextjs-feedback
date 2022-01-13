import {Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, Heading} from '@chakra-ui/react';

import Navbar from '@/components/core/Navbar';

const DashboardShell = ({children}: {children: React.ReactNode}) => {
  return (
    <Box backgroundColor="gray.100">
      <Navbar />

      <Flex margin="0 auto" direction="column" maxW="1280px" px={8} mb={12}>
        {children}
      </Flex>
    </Box>
  );
};

export default DashboardShell;
