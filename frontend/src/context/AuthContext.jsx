import { createContext, useContext, useState, useEffect } from "react";
import jwtDecode from "jwt-decode";

// Crear un contexto para manejar el estado de autenticación
const AuthContext = createContext();

// Crear un componente que proveerá el contexto
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);

  // Decodificar token y actualizar el estado cuando cambie
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({
          id: decoded.id,
          role: decoded.role,
        });
      } catch (error) {
        console.error("Token inválido");
        logout();
      }
    } else {
      setUser(null);
    }
  }, [token]);

  // Almacenar el token en localStorage cuando se inicie sesión
  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  // Limpiar el token de localStorage cuando se cierre la sesión
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  // Verificar si el token está presente en localStorage
  const isAuthenticated = !!token;

  return (
    // Devolver el contexto y el componente hijo
    <AuthContext.Provider
      value={{ token, user, login, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
