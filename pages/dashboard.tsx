import {useQuery} from 'react-query';

import DashboardShell from '@/components/features/dashboard/DashboardShell';
import EmptyState from '@/components/features/dashboard/EmptyState';
import SiteTable from '@/components/features/site-table/SiteTable';
import SiteTableSkeleton from '@/components/features/site-table/SiteTableSkeletion';

const Dashboard = () => {
  const {data: sites, isLoading} = useQuery('getSites', () => fetch('/api/sites').then((res) => res.json()));

  if (isLoading) {
    return (
      <DashboardShell>
        <SiteTableSkeleton />
      </DashboardShell>
    );
  }

  return <DashboardShell>{sites?.length > 0 ? <SiteTable sites={sites} /> : <EmptyState />}</DashboardShell>;
};

export default Dashboard;
