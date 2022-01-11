import {Box, Link} from '@chakra-ui/react';
import {format, parseISO} from 'date-fns';
import NextLink from 'next/link';

import {Table, Td, Th, Tr} from '@/components/core/AppTable';
import {Site} from '@/models/site';

const SiteTable = ({sites}: {sites: Site[]}) => {
  return (
    <Table>
      <thead>
        <Tr>
          <Th>Name</Th>
          <Th>Site Link</Th>
          <Th>Feedback Link</Th>
          <Th>Date Added</Th>
          <Th>{''}</Th>
        </Tr>
      </thead>
      <tbody>
        {sites.map((site) => (
          <Box as="tr" key={site.id}>
            <Td fontWeight="medium">{site.name}</Td>
            <Td>
              <Link href={site.url} isExternal>
                {site.url}
              </Link>
            </Td>
            <Td>
              <NextLink href="/feedbacks/:siteId" as={`/feedbacks/${site.id}`} passHref>
                <Link>View Feedback</Link>
              </NextLink>
            </Td>
            <Td>{site?.createdAt && format(parseISO(site.createdAt), 'PPpp')}</Td>
          </Box>
        ))}
      </tbody>
    </Table>
  );
};

export default SiteTable;
