import { useContext } from "react";
import { ModelContext } from "./model";
import "./App.css";
import LoginOrRegisterPage from "./screens/LoginOrRegisterPage";
import MainPage from "./screens/MainPage";

function App() {
  const { token } = useContext(ModelContext);
  if (token === null || token === undefined) {
    return <LoginOrRegisterPage />;
  } else {
    return <MainPage />;
  }
}

export default App;
