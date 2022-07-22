import { useState } from 'react'
import './App.css'
import LoginOrRegisterPage from './screens/LoginOrRegisterPage'
import MainPage from './screens/MainPage';

function App() {
  const [count, setCount] = useState(0)

  const login = () => {
    console.log("I press the login")
  };

  const logout = () => {
    console.log("I press the logout")
  };

  //return <LoginOrRegisterPage onLogin={login} />
  return <MainPage onLogout={logout}/>
}

export default App
