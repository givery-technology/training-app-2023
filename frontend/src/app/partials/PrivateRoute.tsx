import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../shared/hooks';

export type PrivateRouteProps = {
  children?: React.ReactElement;
};

export function PrivateRoute({ children }: PrivateRouteProps) {
  const { user } = useAppSelector((state) => state.user);

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return children ? children : <Outlet />;
}
