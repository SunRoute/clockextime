import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Route privada que verifica si el usuario está autenticado
const PrivateRoute = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
