import React, { createContext, useState, useEffect } from "react";
import {
  delete_LS,
  save_object_LS,
  read_object_LS,
} from "../utils/local_storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const storedUser = read_object_LS("userData");
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const login = (userData) => {
    save_object_LS("userData", userData);
    setUser(userData);
    console.log(user);
  };

  const logout = () => {
    setUser(null);
    delete_LS("userData");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
