import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
  const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null; // ตรวจสอบว่ามีผู้ใช้ใน localStorage หรือไม่
  });

  const login = (user) => {
    setCurrentUser(user);
    // อาจบันทึก user ลงใน localStorage
    localStorage.setItem('currentUser', JSON.stringify(user));
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () =>  useContext(AuthContext);
