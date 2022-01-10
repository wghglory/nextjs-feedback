import {Flex, Heading, Text} from '@chakra-ui/react';
import React from 'react';

import AddSiteButtonWithModal from './AddSiteButtonWithModal';

const EmptyState = () => (
  <Flex
    width="100%"
    backgroundColor="white"
    borderRadius="8px"
    p={16}
    justify="center"
    align="center"
    direction="column"
  >
    <Heading size="lg" mb={2}>
      You haven’t added any sites.
    </Heading>
    <Text mb={4}>Let’s get started.</Text>

    <AddSiteButtonWithModal>Add Your First Site</AddSiteButtonWithModal>
  </Flex>
);

export default EmptyState;
