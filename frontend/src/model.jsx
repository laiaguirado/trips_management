import { createContext, useEffect, useState } from "react";
import * as tk from "./token";
import * as api from "./api";

export const ModelContext = createContext("");

export const ModelProvider = ({ children, history }) => {
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState(tk.readToken);

  const getUserData = async () => {
    if (token === null) {
      setUserData(null);
    } else {
      const { success, result: userData, error } = await api.getUserData();
      if (success) {
        setUserData(userData);
      }
    }
  };

  const login = (token) => {
    setToken(token);
    tk.saveToken(token);
  };

  const logout = () => {
    setToken(null);
    tk.deleteToken();
  };

  const isAuthorized = async () => {
    if (tk.isTokenExpired()) logout();
  };

  const catchUnauthorized = async (call) => {
    const response = await call();
    if (response) {
      if (!response.success) {
        if (response.error === "Token expired") {
          logout();
        }
      }
    }
    return response;
  };

  useEffect(() => {
    getUserData();
  }, [token]);

  return (
    <ModelContext.Provider
      value={{
        token,
        userData,
        login,
        logout,
        isAuthorized,
        catchUnauthorized,
      }}
    >
      {children}
    </ModelContext.Provider>
  );
};
