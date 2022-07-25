import React, { useState } from "react";
import "./LoginOrRegister.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import * as api from "../api";

const LoginOrRegister = ({ onLogin }) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("login");
  const [message, setMessage] = useState(null);

  const toggleMode = (e) => {
    e.preventDefault();
    setMode((mode) => (mode === "login" ? "register" : "login"));
    setUserName("");
    setEmail("");
    setPassword("");
  };

  const login = async (userData) => {
    const { success, token, error } = await api.login(userData);
    if (success) {
      onLogin(token);
    } else {
      setMessage(`Couldn't login: ${error}`);
    }
  };

  const register = async (userData) => {
    console.log(userData);
    const { success, error } = await api.register(userData);
    if (success) {
      setMessage("User created");
    } else {
      setMessage(`Couldn't create user: ${error}`);
    }
  };

  const submit = (e) => {
    e.preventDefault();
    (mode === "login" ? login : register)({
      username: userName,
      email,
      password,
    });
  };

  const title = mode === "login" ? "Login" : "Register";
  const formButton = mode === "login" ? "Login" : "Create New User";
  const linkText = mode === "login" ? "Register" : "Login";

  return (
    <div className="login-or-register">
      <p>{message}</p>
      <form className="login" onSubmit={submit}>
        <h1>{title}</h1>
        <label>
          <div>
            <FontAwesomeIcon icon={faUser} />
            <input
              type="text"
              placeholder="User name"
              value={userName}
              onChange={(event) => setUserName(event.target.value)}
            />
          </div>
        </label>
        <label>
          <div>
            <FontAwesomeIcon icon={faEnvelope} />
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
        </label>
        <label>
          <div>
            <FontAwesomeIcon icon={faLock} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
        </label>
        <input className="mode" type="submit" value={formButton} />
        <a href="#" className="mode" onClick={toggleMode}>
          {linkText}
        </a>
      </form>
    </div>
  );
};

export default LoginOrRegister;
