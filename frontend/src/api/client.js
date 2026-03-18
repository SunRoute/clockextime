const API_URL = import.meta.env.VITE_API_URL;

// Función para realizar peticiones GET y POST
export const apiFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");

  // Configuración de las cabeceras
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  // Si se ha autenticado
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  // Configuración de la petición y realización
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  return {
    ok: response.ok,
    status: response.status,
    data,
  };
};
