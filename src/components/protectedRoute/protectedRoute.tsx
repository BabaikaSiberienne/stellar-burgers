import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { selAuthState } from '../slices/userAuthSlice';
import { ProtectedRouteProps } from './type';

export const ProtectedRoute = ({ authorized = false }: ProtectedRouteProps) => {
  const isAuth = useSelector(selAuthState);

  const location = useLocation();
  const from = location.state?.from || '/';

  if (authorized && !isAuth) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  if (!authorized && isAuth) {
    return <Navigate to={from} />;
  }

  return <Outlet />;
};
