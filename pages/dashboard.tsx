import {useQuery} from 'react-query';

import {useAuth} from '@/components/auth/AuthProvider';
import TableHeader from '@/components/core/TableHeader';
import AddSiteButtonWithModal from '@/components/features/dashboard/AddSiteButtonWithModal';
import DashboardShell from '@/components/features/dashboard/DashboardShell';
import EmptyState from '@/components/features/dashboard/EmptyState';
import SiteTable from '@/components/features/site/SiteTable';
import SiteTableSkeleton from '@/components/features/site/SiteTableSkeletion';
import {Site} from '@/models/site';

const Dashboard = () => {
  const {user} = useAuth();
  const {data = {items: []}, isLoading} = useQuery<{items: Site[]}>(
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
        <TableHeader link="sites" head="My Sites">
          <AddSiteButtonWithModal>+ Add Site</AddSiteButtonWithModal>
        </TableHeader>
        <SiteTableSkeleton />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <TableHeader link="sites" head="My Sites">
        <AddSiteButtonWithModal>+ Add Site</AddSiteButtonWithModal>
      </TableHeader>
      {data.items?.length > 0 ? <SiteTable sites={data.items} /> : <EmptyState />}
    </DashboardShell>
  );
};

export default Dashboard;
