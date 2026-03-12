# Research: API Serverless Chatbot

## Decision: Dependencies
- **Chosen**: `@google/generative-ai` (v0.21.0+)
- **Rationale**: Es el SDK estable y ampliamente documentado para Gemini en Node.js. Aunque existe `@google/genai` para Gemini 2.0, el SDK original sigue siendo el estándar para la mayoría de implementaciones actuales.
- **Alternatives considered**: `@google/genai` (rechazado por ser muy reciente), Vercel AI SDK (rechazado para mantener la implementación "vanilla" según el spec).

## Decision: Project Structure
- **Chosen**: `server/api/chat.post.ts`
- **Rationale**: Sigue la convención de Nuxt 4 para endpoints de servidor (Nitro). El sufijo `.post` asegura que solo responda a peticiones POST de forma nativa.
- **Alternatives considered**: `server/api/chat.js` (rechazado para usar TypeScript).

## Decision: Testing
- **Chosen**: Vitest + @nuxt/test-utils
- **Rationale**: Es la herramienta recomendada oficial de Nuxt para tests unitarios y de integración.
- **Alternatives considered**: Jest (rechazado por falta de integración nativa con Vite/Nuxt).

## Decision: Model
- **Chosen**: `gemini-1.5-flash`
- **Rationale**: Ofrece el mejor balance entre latencia (crítico para un chatbot) y capacidad de razonamiento para seguir el System Prompt complejo.
- **Alternatives considered**: `gemini-1.5-pro` (rechazado por mayor latencia y coste).
