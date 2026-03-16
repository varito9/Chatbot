# Contract: Chatbot Frontend Component

## Component Props
N/A (El componente `Chatbot.vue` es autónomo inicialmente).

## Component Emits
N/A.

## Internal API Usage (Client -> Server)

**Endpoint**: `/api/chat`
**Method**: `POST`
**Body**:
```json
{
  "messages": [
    {
      "role": "model",
      "parts": [{ "text": "¡Hola! Soy tu orientador virtual..." }]
    },
    {
      "role": "user",
      "parts": [{ "text": "Hola, ¿cómo estás?" }]
    }
  ]
}
```

## Local State Logic

1. **Initial State**:
   - `messages` incluye el mensaje de bienvenida de la IA (role: 'model').
2. **On Send**:
   - Añadir el mensaje del usuario a `messages`.
   - Bloquear el input y mostrar `isLoading`.
   - Realizar petición `$fetch`.
   - Añadir respuesta de la IA a `messages`.
   - Desbloquear input y ocultar `isLoading`.
3. **On Error**:
   - Mostrar mensaje de error en el chat o via toast.
   - Desbloquear input.
