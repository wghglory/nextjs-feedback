import {useQuery} from 'react-query';

import {useAuth} from '@/components/auth/AuthProvider';
import DashboardShell from '@/components/features/dashboard/DashboardShell';
import EmptyState from '@/components/features/dashboard/EmptyState';
import SiteTable from '@/components/features/site-table/SiteTable';
import SiteTableSkeleton from '@/components/features/site-table/SiteTableSkeletion';
import {Site} from '@/models/site';

const Dashboard = () => {
  const {user} = useAuth();
  const {data = {sites: []}, isLoading} = useQuery<{sites: Site[]}>(
    'getSites',
    () =>
      fetch('/api/sites', {
        headers: new Headers({Authorization: `Bearer ${user?.accessToken}`}),
      }).then((res) => res.json()),
    {
      enabled: !!user?.accessToken,
    },
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
