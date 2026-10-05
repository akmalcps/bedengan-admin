import { currentAdmin } from '../data/mock/adminMock';

const AUTH_KEY = 'bedengan_xplore_admin_auth';

export const login = (email, password) => {
  if (email === currentAdmin.email && password === 'admin123') {
    localStorage.setItem(AUTH_KEY, JSON.stringify(currentAdmin));
    return true;
  }
  return false;
};

export const logout = () => {
  localStorage.removeItem(AUTH_KEY);
};

export const isAuthenticated = () => {
  return !!localStorage.getItem(AUTH_KEY);
};

export const getUser = () => {
  const user = localStorage.getItem(AUTH_KEY);
  // Always override with currentAdmin to ensure single source of truth for the mock
  return user ? currentAdmin : null;
};
