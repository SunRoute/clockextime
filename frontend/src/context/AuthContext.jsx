import { createContext, useContext, useState, useEffect } from "react";

// Crear un contexto para manejar el estado de autenticación
const AuthContext = createContext();

// Crear un componente que proveerá el contexto
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);

  // Almacenar el token en localStorage cuando se inicia sesión
  const login = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
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
      value={{ token, user, setUser, login, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
