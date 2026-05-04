const API_URL = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

const buildUrl = (endpoint) => {
  const normalizedEndpoint = endpoint.startsWith("/")
    ? endpoint
    : `/${endpoint}`;

  if (API_URL.endsWith("/api") && normalizedEndpoint.startsWith("/api/")) {
    return `${API_URL}${normalizedEndpoint.slice(4)}`;
  }

  return `${API_URL}${normalizedEndpoint}`;
};

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
  const response = await fetch(buildUrl(endpoint), {
    ...options,
    headers,
  });

  const contentType = response.headers.get("content-type") || "";
  const data = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  return {
    ok: response.ok,
    status: response.status,
    data,
  };
};
