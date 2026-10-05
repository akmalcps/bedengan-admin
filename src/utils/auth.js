const AUTH_KEY = 'bedengan_xplore_admin_auth';

export const login = (email, password) => {
  if (email === 'admin@bedenganxplore.test' && password === 'admin123') {
    const user = {
      name: 'Admin Bedengan',
      email: email,
      role: 'Super Admin',
      avatar: 'https://ui-avatars.com/api/?name=Admin+Bedengan&background=85BB45&color=fff'
    };
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
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
  return user ? JSON.parse(user) : null;
};
