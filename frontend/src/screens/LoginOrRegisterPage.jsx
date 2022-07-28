import React from "react";
import Bar from "../components/Bar";
import LoginOrRegister from "../components/LoginOrRegister";

function LoginOrRegisterPage({ onLogin }) {
  return (
    <div>
      <Bar mode="logout" />
      <LoginOrRegister onLogin={onLogin} />
    </div>
  );
}

export default LoginOrRegisterPage;
