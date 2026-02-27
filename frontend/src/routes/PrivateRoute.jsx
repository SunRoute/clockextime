import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Route privada que verifica si el usuario está autenticado
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
