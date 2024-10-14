const apiRequest = async (endpoint, method = 'GET', body = null) => {
    const baseUrl = import.meta.env.VITE_API_URL; // Obtener la URL base de la variable de entorno en Vite
    const url = `${baseUrl}${endpoint}`; // Concatenar la URL base con el endpoint
  
    try {
      const options = {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      };
  
      if (body) {
        options.body = JSON.stringify(body);
      }
  
      const response = await fetch(url, options);
  
      if (!response.ok) {
        let error = await response.json();
        console.log(error);
        throw new Error(error);
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error en la solicitud:', error.error);
      return error;
    }
  };
  
  export default apiRequest;