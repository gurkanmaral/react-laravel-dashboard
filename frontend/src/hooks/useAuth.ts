import Cookies from 'js-cookie';

export const useAuth = () => {
  const token = Cookies.get('dashboard_token');
  const isAuthenticated = !!token;

  return {
    isAuthenticated,
  };
};

