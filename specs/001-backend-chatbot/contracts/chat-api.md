# API Contract: Chatbot Endpoint

**Endpoint**: `/api/chat`
**Method**: `POST`
**Content-Type**: `application/json`

## Request Body

```json
{
  "messages": [
    {
      "role": "user",
      "parts": [{ "text": "Hola, no sé qué estudiar después de la ESO." }]
    },
    {
      "role": "model",
      "parts": [{ "text": "¡Hola! No te preocupes, es normal. ¿Te gustan más las asignaturas prácticas o teóricas?" }]
    },
    {
      "role": "user",
      "parts": [{ "text": "Prefiero las prácticas." }]
    }
  ]
}
```

## Success Response (200 OK)

```json
{
  "text": "¿Te gustaría trabajar en algo relacionado con la tecnología o prefieres algo más manual?"
}
```

## Error Response (500 Internal Server Error)

```json
{
  "statusMessage": "AI Generation Failed"
}
```
