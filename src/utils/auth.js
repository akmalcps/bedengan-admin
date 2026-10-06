import { currentAdmin } from '../data/mock/adminMock';

// dynamic import to avoid circular dependency issues if any
const logAuthActivity = async (type, title) => {
  try {
    const { createActivity } = await import('../services/mock/activityService');
    await createActivity({
      type,
      module: 'auth',
      title,
      description: 'Sistem Bedengan Admin'
    });
  } catch (error) {
    console.error('Failed to log auth activity:', error);
  }
};

const AUTH_KEY = 'bedengan_xplore_admin_auth';

export const login = (email, password) => {
  if (email === currentAdmin.email && password === 'admin123') {
    localStorage.setItem(AUTH_KEY, JSON.stringify(currentAdmin));
    logAuthActivity('LOGIN', 'Admin login');
    return true;
  }
  return false;
};

export const logout = () => {
  logAuthActivity('LOGOUT', 'Admin logout');
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
