import { Outlet, Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks';
import { RootState } from '../redux/config/configStore';

const PrivateRoute = () => {
  const { user } = useAppSelector((state: RootState) => state.user);
  return user ? <Outlet /> : <Navigate to="/" />
};

export default PrivateRoute;
