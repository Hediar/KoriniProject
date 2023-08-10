import { useAppSelector } from '../hooks';
import { RootState } from '../redux/config/configStore';

interface PrivateRouteProps {
  path: string;
  element: React.ReactElement;
}

const PrivateRoute = () => {
  const { user } = useAppSelector((state: RootState) => state.user);
  return (
    <div>PrivateRoute</div>
  )
}

export default PrivateRoute;