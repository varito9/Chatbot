# Quickstart: API Serverless Chatbot

## Setup

1. **Instalar dependencias**:
   ```bash
   npm install @google/generative-ai
   ```

2. **Variables de entorno**:
   Crea un archivo `.env` en la raíz del proyecto (si no existe) y añade tu API Key:
   ```env
   GEMINI_API_KEY=tu_api_key_aqui
   ```

3. **Ejecutar en desarrollo**:
   ```bash
   npm run dev
   ```

## Probar el endpoint

Puedes probar el endpoint usando `curl` o cualquier cliente HTTP (Postman, Insomnia):

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {
        "role": "user",
        "parts": [{ "text": "Hola, ¿qué me recomiendas estudiar?" }]
      }
    ]
  }'
```

## Estructura de archivos

- `server/api/chat.post.ts`: Lógica del endpoint Nitro.
- `server/utils/gemini.ts`: (Próximamente) Utilidad para inicializar el SDK.
