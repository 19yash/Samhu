import { useAuth } from '../auth/hooks/useAuth';

const Dashboard = () => {
  const { user } = useAuth();
  console.log('🚀 ~ Dashboard ~ user:', user);
  return <div></div>;
};

export default Dashboard;
