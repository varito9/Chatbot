# API Serverless para el Chatbot Orientador Vocacional

Necesito crear el backend de mi aplicación Nuxt 3 para gestionar la lógica del chatbot usando Inteligencia Artificial.

**Requisitos técnicos:**

1. Crear un endpoint serverless en `server/api/chat.js`.
2. El endpoint debe aceptar peticiones `POST`.
3. El body de la petición recibirá un array de objetos llamado `messages` (con el historial de la conversación).

**Lógica de la IA (System Prompt):**
Configura el código para enviar este "System Prompt" exacto a la IA en cada petición para definir su personalidad:

> "Eres un orientador académico y vocacional experto en el sistema educativo de España (ESO, Bachillerato, Formación Profesional de Grado Medio y Superior, y Universidad). Tu tono debe ser empático, motivador, cercano pero profesional.
>
> REGLAS ESTRICTAS:
>
> 1. No respondas a preguntas que no estén relacionadas con la educación o el mundo laboral. Si el usuario te pregunta por otros temas, redirige la conversación amablemente hacia su futuro académico.
> 2. NUNCA des la recomendación final de golpe en el primer mensaje. Debes hacer una pregunta tras otra (máximo 3 o 4 preguntas en total a lo largo de la conversación) para ir acotando los intereses del usuario (por ejemplo, si prefiere ciencias o letras, si quiere estudiar algo práctico o teórico, etc.).
> 3. Solo cuando tengas suficiente información, dale un veredicto final con 2 o 3 opciones formativas recomendadas."

**Estructura del código esperado:**

- Por ahora, crea el esqueleto del endpoint `defineEventHandler`.
- Extrae el body de la petición (`readBody`).
- Prepara la estructura para conectarse al SDK de IA de Google Gemini (asume que la API Key estará en las variables de entorno como `process.env.GEMINI_API_KEY`).
- Retorna la respuesta de la IA en formato JSON.
