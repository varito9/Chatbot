# Quickstart: Frontend Chatbot UI

## Setup

1. **Instalar Tailwind CSS**:
   ```bash
   npm install -D @nuxtjs/tailwindcss
   ```

2. **Añadir módulo a `nuxt.config.js`**:
   ```javascript
   export default defineNuxtConfig({
     modules: ['@nuxtjs/tailwindcss']
   })
   ```

3. **Ejecutar en desarrollo**:
   ```bash
   npm run dev
   ```

## Pruebas de UI

1. Navega a `http://localhost:3000`.
2. Escribe un mensaje de prueba ("Hola") en la caja de texto.
3. Pulsa enviar (icono de avión o tecla Enter).
4. Verifica que aparece tu burbuja de mensaje y, tras unos segundos, la burbuja de respuesta de la IA.

## Depuración

- Abre la pestaña **Network** en las herramientas de desarrollador para ver la petición `POST /api/chat`.
- El cuerpo de la petición debe contener el array de mensajes actualizado.
