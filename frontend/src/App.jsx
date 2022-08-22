import { useContext, useEffect } from "react";
import { ModelContext } from "./model";
import "./App.css";
import LoginOrRegisterPage from "./screens/LoginOrRegisterPage";
import MainPage from "./screens/MainPage";
import * as api from "./api";

function App() {
  const { token, logout, isAuthorized } = useContext(ModelContext);

  useEffect(() => {
    isAuthorized();
  });

  if (token === null) {
    return <LoginOrRegisterPage />;
  } else {
    return <MainPage />;
  }
}

export default App;
