import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { ModelContext } from "../model";
//import * as api from "../api";

const ProtectedRoute = ({ children }) => {
  const { token, logout, isAuthorized } = useContext(ModelContext);

  // const isAuthorized = async () => {
  //   if (token) {
  //     const { success } = await api.authenticated();
  //     console.log(`ProtectedRouter useEffect = ${success}`);
  //     if (!success) logout();
  //   }
  // };

  useEffect(() => {
    isAuthorized();
  });

  if (token === null) {
    return <Navigate to="/" replace="true" />;
  }

  return children;
};

export default ProtectedRoute;
