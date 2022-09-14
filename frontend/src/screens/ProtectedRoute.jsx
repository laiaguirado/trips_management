import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { ModelContext } from "../model";

const ProtectedRoute = ({ children }) => {
  const { token, logout, isAuthorized } = useContext(ModelContext);

  useEffect(() => {
    isAuthorized();
  });

  if (token === null) {
    return <Navigate to="/" replace="true" />;
  }

  return children;
};

export default ProtectedRoute;
