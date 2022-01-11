import {useQuery} from 'react-query';

import DashboardShell from '@/components/features/dashboard/DashboardShell';
import EmptyState from '@/components/features/dashboard/EmptyState';
import SiteTable from '@/components/features/site-table/SiteTable';
import SiteTableSkeleton from '@/components/features/site-table/SiteTableSkeletion';
import {Site} from '@/models/site';

const Dashboard = () => {
  const {data = {sites: []}, isLoading} = useQuery<{sites: Site[]}>('getSites', () =>
    fetch('/api/sites').then((res) => res.json()),
  );

  if (isLoading) {
    return (
      <DashboardShell>
        <SiteTableSkeleton />
      </DashboardShell>
    );
  }

  return <DashboardShell>{data.sites?.length > 0 ? <SiteTable sites={data.sites} /> : <EmptyState />}</DashboardShell>;
};

export default Dashboard;
