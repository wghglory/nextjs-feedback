import {Box, TableCellProps, TableHeadProps, TableProps, TableRowProps, Text} from '@chakra-ui/react';

export const Table = (props: TableProps) => {
  return (
    <Box
      as="table"
      width="100%"
      textAlign="left"
      backgroundColor="white"
      ml={0}
      mr={0}
      borderRadius={8}
      boxShadow="0px 4px 10px rgba(0, 0, 0, 0.05)"
      {...props}
    />
  );
};

export const Th = (props: TableHeadProps) => (
  <Text as="th" textTransform="uppercase" fontSize="xs" color="gray.500" fontWeight="medium" px={4} {...props} />
);

export const Tr = (props: TableRowProps) => (
  <Box
    as="tr"
    backgroundColor="gray.50"
    borderTopLeftRadius={8}
    borderTopRightRadius={8}
    borderBottom="1px solid"
    borderBottomColor="gray.200"
    height="40px"
    {...props}
  />
);

export const Td = (props: TableCellProps) => (
  <Box as="td" color="gray.900" p={4} borderBottom="1px solid" borderBottomColor="gray.100" {...props} />
);
