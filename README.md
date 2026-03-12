# Chatbot Orientador Vocacional

Este proyecto es un chatbot de orientación académica y vocacional basado en Nuxt 3 e Inteligencia Artificial (Google Gemini).

## API Backend

### `POST /api/chat`

Gestiona la conversación con el orientador vocacional.

**Request Body:**

```json
{
  "messages": [
    { "role": "user", "parts": [{ "text": "Hola" }] }
  ]
}
```

**Response:**

```json
{
  "text": "¡Hola! Soy tu orientador vocacional. ¿En qué puedo ayudarte hoy?"
}
```

## Requisitos de Desarrollo

- Node.js 18+
- API Key de Google Gemini (configurada en `.env` como `GEMINI_API_KEY`)

## Comandos

- `npm run dev`: Inicia el servidor de desarrollo.
- `npm run test`: Ejecuta los tests unitarios y de integración.
