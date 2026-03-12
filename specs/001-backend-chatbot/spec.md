# Feature Specification: API Serverless para el Chatbot Orientador Vocacional

**Feature Branch**: `001-backend-chatbot`  
**Created**: 2026-03-12  
**Status**: Draft  
**Input**: User description: "Lee el archivo specs/backend-chatbot.md y diseña la estructura para el endpoint serverless."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Consulta básica al chatbot (Priority: P1)

Como estudiante, quiero enviar un mensaje al chatbot para recibir orientación sobre mis estudios.

**Why this priority**: Es la funcionalidad principal y mínima para que el sistema tenga valor.

**Independent Test**: Se puede probar enviando un POST a `/api/chat` con un array de mensajes y verificando que devuelve una respuesta coherente.

**Acceptance Scenarios**:

1. **Given** un endpoint serverless en `/server/api/chat.js`, **When** se envía un POST con `{ messages: [...] }`, **Then** se recibe una respuesta JSON de la IA.
2. **Given** el sistema prompt configurado, **When** el usuario pregunta sobre algo no educativo, **Then** la IA redirige amablemente la conversación hacia temas académicos.

### User Story 2 - Proceso de acotación de intereses (Priority: P2)

Como orientador, quiero que la IA haga preguntas para conocer mejor al usuario antes de dar una recomendación.

**Why this priority**: Asegura que las recomendaciones sean precisas y sigan la metodología definida.

**Independent Test**: Simular una conversación de varios turnos y verificar que la IA hace preguntas (máximo 3-4) antes de dar el veredicto.

**Acceptance Scenarios**:

1. **Given** una conversación iniciada, **When** es el primer mensaje, **Then** la IA responde con una pregunta para profundizar en los intereses del usuario.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: El sistema debe exponer un endpoint POST en `server/api/chat.js`.
- **FR-002**: El endpoint debe recibir un array `messages` en el cuerpo de la petición.
- **FR-003**: El sistema debe inyectar un System Prompt específico en cada petición a la IA.
- **FR-004**: El System Prompt debe definir a la IA como un experto en el sistema educativo de España.
- **FR-005**: La IA no debe responder a temas no relacionados con la educación o el mundo laboral.
- **FR-006**: La IA debe realizar entre 3 y 4 preguntas antes de dar una recomendación final.
- **FR-007**: La recomendación final debe incluir 2 o 3 opciones formativas.
- **FR-008**: El sistema debe utilizar el SDK de Google Gemini.
- **FR-009**: La API Key de Gemini debe obtenerse de la variable de entorno `GEMINI_API_KEY`.

### Key Entities

- **Message**: Objeto con `role` (user/assistant/system) y `content`.
- **ChatHistory**: Colección ordenada de objetos `Message`.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: El endpoint responde en menos de 5 segundos (dependiendo de la latencia de la API de Gemini).
- **SC-002**: El 100% de las respuestas fuera de contexto son redirigidas a temas educativos.
- **SC-003**: El sistema nunca da una recomendación final en el primer mensaje.
