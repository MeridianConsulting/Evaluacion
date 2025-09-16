// Configuración centralizada de la API
export const getApiBaseUrl = () => {
  // Detectar automáticamente el entorno
  const isProduction = window.location.hostname === 'evaluacion.meridianltda.com';
  
  if (isProduction) {
    return 'https://evaluacion.meridianltda.com/backend';
  } else {
    // Desarrollo local
    return 'http://localhost/Evaluacion/backend';
  }
};

// Función helper para construir URLs completas
export const buildApiUrl = (endpoint) => {
  const baseUrl = getApiBaseUrl();
  return `${baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
};
