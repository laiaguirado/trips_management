import React, { useState, useContext } from "react";
import "./LoginOrRegister.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import * as api from "../api";
import { ModelContext } from "../model";

const LoginOrRegister = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("login");
  const [message, setMessage] = useState(null);

  const { login } = useContext(ModelContext);

  const toggleMode = (e) => {
    e.preventDefault();
    setMode((mode) => (mode === "login" ? "register" : "login"));
    setUserName("");
    setEmail("");
    setPassword("");
    setMessage("");
  };

  const onLogin = async (userData) => {
    const { success, result: token, error } = await api.login(userData);
    if (success) {
      login(token);
    } else {
      setMessage(`Couldn't login: ${error}`);
    }
  };

  const register = async (userData) => {
    const { success, error } = await api.register(userData);
    if (success) {
      setMessage("User created");
    } else {
      setMessage(`Couldn't create user: ${error}`);
    }
  };

  function inputUsername(onChange) {
    if (mode === "register") {
      return (
        <div className="form-data">
          <FontAwesomeIcon icon={faUser} className="icon" />
          <input
            className="input"
            type="text"
            placeholder="User name"
            value={userName}
            onChange={onChange}
          />
        </div>
      );
    } else {
      return "";
    }
  }

  const submit = (e) => {
    e.preventDefault();
    (mode === "login" ? onLogin : register)({
      username: userName,
      email,
      password,
    });
  };

  const title = mode === "login" ? "Login" : "Register";
  const formButton = mode === "login" ? "Login" : "Create New User";
  const linkText = mode === "login" ? "Register" : "Login";

  return (
    <div className="login-or-register form-container">
      <form className="login" onSubmit={submit}>
        <h1 className="title">{title}</h1>
        <p className="error">{message}</p>
        <label className="label">
          {inputUsername((event) => setUserName(event.target.value))}
        </label>
        <label className="label">
          <div className="form-data">
            <FontAwesomeIcon icon={faEnvelope} className="icon" />
            <input
              className="input"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
        </label>
        <label className="label">
          <div className="form-data">
            <FontAwesomeIcon icon={faLock} className="icon" />
            <input
              className="input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
        </label>
        <input
          className="submit-button form-data"
          type="submit"
          value={formButton}
        />
        <a href="#" className="change-mode" onClick={toggleMode}>
          {linkText}
        </a>
      </form>
    </div>
  );
};

export default LoginOrRegister;
