import {useQuery} from 'react-query';

import {useAuth} from '@/components/auth/AuthProvider';
import TableHeader from '@/components/core/TableHeader';
import DashboardShell from '@/components/features/dashboard/DashboardShell';
import EmptyState from '@/components/features/dashboard/EmptyState';
import FeedbackTable from '@/components/features/feedback/FeedbackTable';
import FeedbackTableSkeleton from '@/components/features/feedback/FeedbackTableSkeletion';
import {Feedback} from '@/models/feedback';

const Feedbacks = () => {
  const {user} = useAuth();
  const {data} = useQuery<{items: Feedback[]}>(
    'getFeedbacks',
    () =>
      fetch('/api/feedbacks', {headers: new Headers({Authorization: `Bearer ${user?.accessToken}`})}).then((res) =>
        res.json(),
      ),
    {
      enabled: !!user?.accessToken,
    },
  );

  if (!data) {
    return (
      <DashboardShell>
        <TableHeader link="feedbacks" head="My Feedbacks"></TableHeader>
        <FeedbackTableSkeleton />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <TableHeader link="feedbacks" head="My Feedbacks"></TableHeader>
      {data.items?.length ? <FeedbackTable feedbacks={data.items} /> : <EmptyState />}
    </DashboardShell>
  );
};

export default Feedbacks;
