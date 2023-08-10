import { useAppSelector } from '../hooks';
import { RootState } from '../redux/config/configStore';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = () => {
  const { user } = useAppSelector((state: RootState) => state.user);

  return user ? <Outlet /> : <Navigate to="/" />
}

export default PrivateRoute;