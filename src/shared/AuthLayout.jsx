import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

function AuthLayout() {
  const currentUser = useSelector((state) => state.users.currentUser);
  const navigate = useNavigate();
  console.log(currentUser);

  useEffect(() => {
    if (!currentUser) {
      navigate('/auth');
    } else {
    }
  }, [currentUser, navigate]);

  return <Outlet />;
}

export default AuthLayout;
