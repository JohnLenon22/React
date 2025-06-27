// src/components/PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function PrivateRoute({ children, allowedRoles }) {
  const { isAuthenticated , user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  

  if (allowedRoles && !allowedRoles.includes(user.tipoUsuario)) {
    return <Navigate to="/Unauthorized" />; 
  }

  return children;
}
