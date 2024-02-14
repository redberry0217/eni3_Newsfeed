import Loading from 'components/Loading';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

function AuthLayout() {
  const navigate = useNavigate();

  const currentUser = useSelector((state) => state.users.currentUser);
  const loading = useSelector((state) => state.loading);

  if (loading) return <Loading />;
  if (!currentUser) navigate('/auth');

  return <Outlet />;
}

export default AuthLayout;
