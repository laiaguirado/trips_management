import { useState } from 'react'
import './App.css'
import LoginOrRegisterPage from './screens/LoginOrRegisterPage'

function App() {
  const [count, setCount] = useState(0)

  const login = () => {
  };

  const logout = () => {
  };

  return <LoginOrRegisterPage onLogin={login} />
}

export default App
