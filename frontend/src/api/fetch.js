const API_URL = import.meta.env.VITE_API_URL;

// Función para realizar peticiones GET y POST
export const apiFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");

  // Configuración de las cabeceras
  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  // Si se ha autenticado
  if (token) {
    defaultHeaders["Authorization"] = `Bearer ${token}`;
  }

  // Configuración de la petición
  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  // Realizar petición
  const response = await fetch(`${API_URL}${endpoint}`, config);

  // Si el token ha expirado o es inválido volver a autenticarse
  if (response.status === 401 || response.status === 403) {
    localStorage.removeItem("token");
    window.location.href = "/login";
    return;
  }

  return response.json();
};
