import { Navigate } from "react-router-dom";
import { ModelContext } from "../model";
import { useContext } from "react";

const ProtectedRoute = ({ children }) => {
  const { token } = useContext(ModelContext);

  if (!token) {
    console.log("protectedRoute no hay token");
    return <Navigate to="/" replace />;
  }
  console.log("protectedRoute SI hay token");
  return children;
};

export default ProtectedRoute;
