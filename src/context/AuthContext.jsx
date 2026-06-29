import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('lumina_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const login = (userData) => {
    const u = { ...userData, joinedAt: new Date().toISOString() };
    localStorage.setItem('lumina_user', JSON.stringify(u));
    setUser(u);
  };

  const logout = () => {
    localStorage.removeItem('lumina_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
