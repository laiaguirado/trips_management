import { useState } from "react";
import "./App.css";
import LoginOrRegisterPage from "./screens/LoginOrRegisterPage";
import MainPage from "./screens/MainPage";
import * as tk from "./token";

function App() {
  const [token, setToken] = useState(tk.readToken);

  const login = (token) => {
    setToken(token);
    tk.saveToken(token);
  };

  const logout = () => {
    setToken(null);
    tk.deleteToken();
  };

  if (token === null) {
    return <LoginOrRegisterPage onLogin={login} />;
  } else {
    return <MainPage onLogout={logout} />;
  }
}

export default App;
