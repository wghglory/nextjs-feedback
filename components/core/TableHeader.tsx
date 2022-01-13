import {Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, Heading} from '@chakra-ui/react';

export default function TableHeader({link, head, children}: {link: string; head: string; children?: React.ReactNode}) {
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink>{link}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      {/* action bar */}
      <Flex justifyContent="space-between" mb={8} as="section">
        <Heading>{head}</Heading>
        {children}
      </Flex>
    </div>
  );
}
