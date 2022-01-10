import {useAuth} from '@/components/auth/AuthProvider';
import EmptyState from '@/components/features/dashboard/EmptyState';

const Dashboard = () => {
  const auth = useAuth();

  if (!auth.user) {
    return 'Loading...';
  }

  return <EmptyState />;
};

export default Dashboard;
