import { Navigate } from "react-router-dom";
import { ModelContext } from "../model";
import { useContext } from "react";

const ProtectedRoute = ({ children }) => {
  const { token } = useContext(ModelContext);

  if (!token) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
