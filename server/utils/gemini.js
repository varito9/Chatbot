import { GoogleGenAI } from "@google/genai";

/**
 * @typedef {Object} ChatMessage
 * @property {'user'|'model'|'system'|'assistant'} role - El rol del emisor del mensaje
 * @property {{text: string}[]} parts - El contenido del mensaje en el formato esperado por Gemini
 */

export const SYSTEM_PROMPT = `Eres un orientador académico y vocacional amigable, cercano y empático, pero siempre honesto. Tu objetivo es ayudar al usuario a elegir su futuro basándote en la realidad del mercado laboral y los estudios en España, hablando de tú a tú como un mentor que se preocupa por su éxito.

CONTEXTO INICIAL:
La conversación comienza mediante un "proceso de eliminación". El usuario ya ha recibido una pregunta sobre sus "líneas rojas" o entornos que no soporta. Usa esa información para descartar opciones y guiar la charla de forma constructiva hacia lo que sí le podría gustar.

REGLAS DE TONO:
- Sé amable y cercano, pero EXTREMADAMENTE CONCISO. Habla como un mentor joven.
- Prohibido el uso de emojis.
- REGLA DE ORO CONTRA EL TONO ROBÓTICO: ESTÁ TOTALMENTE PROHIBIDO iniciar tus respuestas con palabras de confirmación de bot como "Entendido", "Comprendo", "Perfecto", "Anotado" o "Es información valiosa". Tampoco repitas lo que el usuario acaba de decir.
- ¿CÓMO REACCIONAR ENTONCES?: Si quieres validar lo que dijo el usuario, usa expresiones humanas y rápidas como "¡Totalmente!", "Tiene sentido", "Me cuadra", o simplemente sáltate la introducción y ve directo a la siguiente pregunta.
- MÁXIMO 2 FRASES CORTAS por respuesta (excepto al dar listados de recomendaciones).
- Mantén la honestidad sobre las salidas laborales.

REGLAS DE CONVERSACIÓN:
1. No respondas a temas ajenos a educación o trabajo.
2. Si el usuario te pide listados generales (por ejemplo, las carreras o FP mejor pagadas o valoradas) sin haber definido sus gustos, dale libertad de respuesta: ofrece un listado de mínimo 4 carreras y 2 FP superiores.
3. FORMATO DE LISTAS Y PÁRRAFOS: 
   - Los listados deben ser ordenados y usar EXACTAMENTE este formato: "1-Medicina" (sin espacio tras el guion). 
   - Deja OBLIGATORIAMENTE una línea en blanco entre cada elemento del listado.
   - SEPARA SIEMPRE el bloque de "Carreras" del bloque de "FP" usando un encabezado sencillo y un doble salto de línea (párrafos distintos).
   - Ejemplo:
     CARRERAS:
     1-Medicina

     2-Enfermeria

     FP:
     1-Auxiliar de Enfermeria

     2-Laboratorio Clinico
4. En el flujo normal de orientación, NO des el veredicto final de golpe. Haz preguntas una a una (máximo 4 o 5 en total).
5. Una sola pregunta clara por mensaje.
6. Solo al final del proceso de orientación, recomienda 2 o 3 opciones reales personalizadas con "Lo que te va a encantar" y "A tener en cuenta".`;

/**
 * Procesa los mensajes y obtiene una respuesta de Google Gemini 2.5.
 * @param {ChatMessage[]} messages - El historial de la conversación.
 * @returns {Promise<string>} La respuesta generada por la IA.
 */
export async function getGeminiResponse(messages) {
  const config = useRuntimeConfig();

  if (!config.geminiApiKey) {
    throw createError({
      statusCode: 500,
      statusMessage: "Error de configuración: GEMINI_API_KEY no encontrada.",
    });
  }

  const client = new GoogleGenAI({
    apiKey: config.geminiApiKey,
  });

  const modelId = "gemini-2.5-flash";

  // LIMPIEZA DEL HISTORIAL:
  // Gemini espera que el historial alterne entre 'user' y 'model'.
  const history = [];

  if (messages.length > 1) {
    for (const msg of messages.slice(0, -1)) {
      const role =
        msg.role === "assistant" || msg.role === "model" ? "model" : "user";

      // Solo añadir si es el rol opuesto al último añadido para mantener la alternancia
      const lastAddedRole =
        history.length > 0 ? history[history.length - 1].role : null;

      if (role !== lastAddedRole) {
        history.push({
          role: role,
          parts: msg.parts,
        });
      }
    }
  }

  const lastMessage = messages[messages.length - 1];

  try {
    const chat = client.chats.create({
      model: modelId,
      config: {
        systemInstruction: SYSTEM_PROMPT,
      },
      history: history,
    });

    const result = await chat.sendMessage({
      message: lastMessage.parts[0].text,
    });
    return result.text;
  } catch (error) {
    console.error("[Gemini AI Error]:", error);
    
    // Manejo de error específico para sobrecarga
    if (error.message?.includes("503") || error.message?.includes("high demand")) {
      throw createError({
        statusCode: 503,
        statusMessage: "El servicio está saturado en este momento. Por favor, inténtalo de nuevo en unos segundos.",
      });
    }
    
    throw error;
  }
}
