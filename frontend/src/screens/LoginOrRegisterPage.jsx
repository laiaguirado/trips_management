import React from "react";
import Bar from "../components/Bar";
import LoginOrRegister from "../components/LoginOrRegister";

function LoginOrRegisterPage(S) {
  return (
    <div>
      <Bar mode="logout" />
      <LoginOrRegister />
    </div>
  );
}

export default LoginOrRegisterPage;
