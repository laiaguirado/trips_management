import { createContext, useEffect, useState } from "react";
import * as tk from "./token";
import * as api from "./api";

// Utilitzar aquest context cada cop que necessitem accedir al model
export const ModelContext = createContext();

// Posar aquest component com a component arrel (a dalt de tot de l'arbre)
export const ModelProvider = ({ children }) => {
  // Totes les dades de l'aplicació van aquí
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState(tk.readToken);

  // Totes les funcions que implementen operacions sobre el model
  const getUserData = async () => {
    if (token === null || token === undefined) {
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
      }}
    >
      {children}
    </ModelContext.Provider>
  );
};
