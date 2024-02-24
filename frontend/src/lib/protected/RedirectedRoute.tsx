import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { ReactNode } from 'react';

 const RedirectRoute = ({ children }:{children:ReactNode}) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    // Redirect to the home page
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RedirectRoute