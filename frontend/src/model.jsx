import { createContext, useEffect, useState } from "react";
import * as tk from "./token";

// Utilitzar aquest context cada cop que necessitem accedir al model
export const ModelContext = createContext();

// Posar aquest component com a component arrel (a dalt de tot de l'arbre)
export const ModelProvider = ({ children }) => {
  // Totes les dades de l'aplicació van aquí
  const [token, setToken] = useState(tk.readToken);

  // Totes les funcions que implementen operacions sobre el model
  const login = (token) => {
    setToken(token);
    tk.saveToken(token);
  };

  const logout = () => {
    setToken(null);
    tk.deleteToken();
  };

  return (
    <ModelContext.Provider
      value={{
        token,
        login,
        logout,
      }}
    >
      {children}
    </ModelContext.Provider>
  );
};
