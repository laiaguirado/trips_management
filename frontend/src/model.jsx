import { createContext, useEffect, useState } from "react";
import * as tk from "./token";
import * as api from "./api";

// Utilitzar aquest context cada cop que necessitem accedir al model
export const ModelContext = createContext();

// Posar aquest component com a component arrel (a dalt de tot de l'arbre)
export const ModelProvider = ({ children }) => {
  // Totes les dades de l'aplicació van aquí
  const [token, setToken] = useState(tk.readToken);
  const [userData, setUserData] = useState(null);
  const [message, setMessage] = useState(null);

  const getUserData = async () => {
    const { success, userData, error } = await api.getUserData();
    if (success) {
      setUserData(userData);
    } else {
      setMessage(error);
    }
  };

  // Totes les funcions que implementen operacions sobre el model
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
  }, []);

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
