import { defineEventHandler, readBody, createError } from 'h3';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    
    // MEJORA: Validación de entrada robusta
    if (!body || typeof body !== 'object') {
      throw createError({
        statusCode: 400,
        statusMessage: 'Cuerpo de petición inválido.',
      });
    }

    if (!body.messages || !Array.isArray(body.messages) || body.messages.length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: 'El historial de mensajes ("messages") es obligatorio y no puede estar vacío.',
      });
    }

    // Validar estructura básica de los mensajes
    const isValid = body.messages.every(m => m.parts && Array.isArray(m.parts) && m.parts[0]?.text);
    if (!isValid) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Formato de mensajes inválido. Cada mensaje debe tener { parts: [{ text: "..." }] }.',
      });
    }

    const responseText = await getGeminiResponse(body.messages);
    
    return {
      text: responseText
    };
  } catch (error) {
    // Usamos el manejador de errores global del proyecto
    return handleApiError(error);
  }
});
