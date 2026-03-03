import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Verificar si el usuario tiene el rol requerido
const RoleRoute = ({ children, allowedRole }) => {
  const { user, loading } = useAuth();

  // Si se está cargando la información del usuario
  if (loading) {
    return <p>Cargando...</p>;
  }
  // Si el usuario no tiene el rol requerido
  if (!user || user.role !== allowedRole) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default RoleRoute;
