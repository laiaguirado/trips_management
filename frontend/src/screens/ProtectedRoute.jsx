import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { ModelContext } from "../model";

const ProtectedRoute = ({ children }) => {
  const { token } = useContext(ModelContext);

  if (token === null) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
