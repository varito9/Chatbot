# Implementation Plan: API Serverless para el Chatbot Orientador Vocacional

**Branch**: `001-backend-chatbot` | **Date**: 2026-03-12 | **Spec**: [specs/001-backend-chatbot/spec.md]
**Input**: Feature specification from `/specs/001-backend-chatbot/spec.md`

## Summary

Crear un endpoint serverless en Nuxt (Nitro) que actúe como puente entre la aplicación frontend y la IA de Google Gemini. El endpoint gestionará el historial de la conversación e inyectará un System Prompt que define el comportamiento de un orientador vocacional experto en España, limitando las respuestas a temas educativos y guiando al usuario mediante preguntas antes de ofrecer una recomendación final.

## Technical Context

**Language/Version**: Nuxt 4 (TypeScript)
**Primary Dependencies**: `@google/generative-ai` (NEEDS CLARIFICATION: exact version and package name)
**Storage**: N/A (Stateless API)
**Testing**: Vitest (NEEDS CLARIFICATION: check if vitest is configured)
**Target Platform**: Node.js / Serverless (Nitro)
**Project Type**: Web service (Nuxt API)
**Performance Goals**: Latencia < 10s (dependiendo de la IA)
**Constraints**: API Key in `GEMINI_API_KEY` env variable
**Scale/Scope**: Single endpoint `server/api/chat.post.js`

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [X] **Core Principles**: Standard Nuxt/Nitro architecture will be followed.
- [X] **Security**: API key must NOT be hardcoded. Use `process.env`.
- [X] **Testability**: The logic should be testable.

## Project Structure

### Documentation (this feature)

```text
specs/001-backend-chatbot/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
server/
├── api/
│   └── chat.post.ts      # Endpoint serverless principal
└── utils/
    └── gemini.ts         # Wrapper para el SDK de Gemini (opcional, para limpieza)

app/
└── app.vue               # Punto de entrada frontend (ya existe)
```

**Structure Decision**: Se seguirá la estructura estándar de Nuxt 4 para `server/api/`. El endpoint se llamará `chat.post.ts` para indicar explícitamente que solo acepta peticiones POST.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| N/A | | |
