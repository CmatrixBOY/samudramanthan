import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext({ user: null, login: async () => {}, logout: () => {} });

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('auth_user');
    return raw ? JSON.parse(raw) : null;
  });

  useEffect(() => {
    if (user) localStorage.setItem('auth_user', JSON.stringify(user));
    else localStorage.removeItem('auth_user');
  }, [user]);

  const login = async ({ email, password }) => {
    await new Promise(r => setTimeout(r, 400));
    if (!email || !password) throw new Error('Invalid credentials');
    setUser({ email });
    return true;
  };

  const logout = () => setUser(null);

  const value = useMemo(() => ({ user, login, logout }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
