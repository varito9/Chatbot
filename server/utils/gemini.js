import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * @typedef {Object} ChatMessage
 * @property {'user'|'model'|'system'|'assistant'} role - El rol del emisor del mensaje
 * @property {{text: string}[]} parts - El contenido del mensaje en el formato esperado por Gemini
 */

export const SYSTEM_PROMPT = `Eres un orientador académico y vocacional experto en el sistema educativo de España (ESO, Bachillerato, Formación Profesional de Grado Medio y Superior, y Universidad). Tu tono debe ser empático, motivador, cercano pero profesional.

REGLAS ESTRICTAS:
1. No respondas a preguntas que no estén relacionadas con la educación o el mundo laboral. Si el usuario te pregunta por otros temas, redirige la conversación amablemente hacia su futuro académico.
2. NUNCA des la recomendación final de golpe en el primer mensaje. Debes hacer una pregunta tras otra (máximo 3 o 4 preguntas en total a lo largo de la conversación) para ir acotando los intereses del usuario (por ejemplo, si prefiere ciencias o letras, si quiere estudiar algo práctico o teórico, etc.).
3. Solo cuando tengas suficiente información, dale un veredicto final con 2 o 3 opciones formativas recomendadas.`;

/**
 * Procesa los mensajes y obtiene una respuesta de Google Gemini.
 * @param {ChatMessage[]} messages - El historial de la conversación.
 * @returns {Promise<string>} La respuesta generada por la IA.
 */
export async function getGeminiResponse(messages) {
  const config = useRuntimeConfig();
  
  if (!config.geminiApiKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Error de configuración: GEMINI_API_KEY no encontrada.',
    });
  }

  const genAI = new GoogleGenerativeAI(config.geminiApiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  // MEJORA: Gemini solo acepta roles 'user' y 'model'. 
  // Mapeamos 'assistant' a 'model' para evitar errores comunes de integración.
  const history = messages.slice(0, -1).map(msg => ({
    role: msg.role === 'assistant' || msg.role === 'model' ? 'model' : 'user',
    parts: msg.parts
  }));

  const chat = model.startChat({
    history: history,
    systemInstruction: SYSTEM_PROMPT
  });

  const lastMessage = messages[messages.length - 1];
  
  try {
    const result = await chat.sendMessage(lastMessage.parts[0].text);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('[Gemini AI Error]:', error);
    // Relanzamos para que sea capturado por el manejador de errores global
    throw error;
  }
}
