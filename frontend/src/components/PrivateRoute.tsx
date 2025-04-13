import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import React from 'react';

interface PrivateRouteProps {
  children: JSX.Element;
  allowedRoles?: ('student' | 'teacher' | 'admin')[];
}

export default function PrivateRoute({ children, allowedRoles = [] }: PrivateRouteProps) {
  const token = useAuthStore((s) => s.token);
  const user = useAuthStore((s) => s.user);
  const location = useLocation();

  if (!token || !user) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  if (allowedRoles.length && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
