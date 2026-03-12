/**
 * Manejador centralizado de errores para la API.
 * @param {any} error - El error capturado.
 */
export const handleApiError = (error) => {
  // Log detallado para el servidor
  console.error('[API Error Handler]:', {
    message: error.message,
    status: error.statusCode,
    data: error.data
  });
  
  // Si ya es un error de Nuxt (H3), lo respetamos
  if (error.statusCode) {
    throw error;
  }

  // Errores específicos de la cuota de la API de Google
  if (error.message?.includes('429') || error.message?.includes('quota')) {
    throw createError({
      statusCode: 429,
      statusMessage: 'Límite de peticiones de la IA alcanzado. Inténtalo de nuevo en un minuto.',
    });
  }

  // Error genérico por defecto
  throw createError({
    statusCode: 500,
    statusMessage: 'Error interno al procesar la respuesta de la IA.',
  });
};
