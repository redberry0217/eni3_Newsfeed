import Loading from 'components/Loading';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

function AuthLayout() {
  const currentUser = useSelector((state) => state.users.currentUser);
  const loading = useSelector((state) => state.loading);

  if (loading) return <Loading />;
  if (!currentUser) {
    return <Navigate to="/auth" />;
  }

  return <Outlet />;
}

export default AuthLayout;
