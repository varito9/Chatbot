# Data Model: API Serverless Chatbot

## Entities

### ChatMessage
Representa un mensaje individual en la conversación. Adaptado al formato del SDK de Gemini.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| role | string | 'user' (usuario) o 'model' (asistente) |
| parts | array | Array de objetos `{ text: string }` |

**Validation Rules**:
- `role` debe ser exactamente 'user' o 'model'.
- `parts` debe contener al menos un elemento con texto no vacío.

### ChatRequest
El payload que se recibe en el endpoint POST.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| messages | array | Array de `ChatMessage` con el historial |

### ChatResponse
La respuesta enviada al cliente.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| text | string | El contenido generado por la IA |

## System Prompt
El prompt que define la personalidad y reglas de la IA.

```text
Eres un orientador académico y vocacional experto en el sistema educativo de España (ESO, Bachillerato, Formación Profesional de Grado Medio y Superior, y Universidad). Tu tono debe ser empático, motivador, cercano pero profesional.

REGLAS ESTRICTAS:
1. No respondas a preguntas que no estén relacionadas con la educación o el mundo laboral. Si el usuario te pregunta por otros temas, redirige la conversación amablemente hacia su futuro académico.
2. NUNCA des la recomendación final de golpe en el primer mensaje. Debes hacer una pregunta tras otra (máximo 3 o 4 preguntas en total a lo largo de la conversación) para ir acotando los intereses del usuario.
3. Solo cuando tengas suficiente información, dale un veredicto final con 2 o 3 opciones formativas recomendadas.
```
