# Feature Specification: Frontend del Chatbot Orientador

**Feature Branch**: `002-frontend-chatbot`  
**Created**: 2026-03-12  
**Status**: Draft  
**Input**: User description from `.specify/frontend-chatbot.md`

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Interfaz de Chat (Priority: P1)

Como usuario, quiero ver una interfaz de chat moderna y limpia para interactuar con el orientador.

**Why this priority**: Es la base visual de la aplicación. Sin ella no hay donde interactuar.

**Independent Test**: El componente `Chatbot.vue` se renderiza correctamente con los estilos de Tailwind especificados.

**Acceptance Scenarios**:

1. **Given** el componente `Chatbot.vue`, **When** se carga en el navegador, **Then** se muestra el header con el título "Orientador Vocacional IA" y la barra lateral.
2. **Given** el diseño de Tailwind, **When** se visualiza en dispositivos móviles, **Then** la barra lateral se oculta y el chat se adapta al ancho de pantalla.

---

### User Story 2 - Envío de mensajes y respuesta (Priority: P1)

Como usuario, quiero escribir un mensaje y ver la respuesta de la IA en tiempo real.

**Why this priority**: Es la funcionalidad principal del frontend.

**Independent Test**: Se escribe un mensaje, se pulsa enviar y aparece la respuesta de la IA (obtenida de `/api/chat`).

**Acceptance Scenarios**:

1. **Given** un mensaje escrito en el input, **When** se hace click en enviar, **Then** el mensaje aparece en la burbuja del usuario y se limpia el input.
2. **Given** una petición enviada al backend, **When** se recibe la respuesta JSON, **Then** la respuesta de la IA aparece en una nueva burbuja de mensaje.

---

### User Story 3 - Reinicio de conversación (Priority: P2)

Como usuario, quiero poder reiniciar la conversación para empezar de nuevo el test.

**Why this priority**: Permite al usuario corregir errores o explorar otros caminos sin recargar la página.

**Independent Test**: Al pulsar "Reiniciar Test", el historial de mensajes se vacía (excepto el mensaje inicial de la IA).

**Acceptance Scenarios**:

1. **Given** varios mensajes en el chat, **When** se pulsa el botón "Reiniciar Test", **Then** el array de mensajes vuelve a su estado inicial.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Implementar el componente `components/Chatbot.vue`.
- **FR-002**: Utilizar Tailwind CSS para el diseño según el HTML proporcionado.
- **FR-003**: Usar fuentes de Google (Inter) e iconos de Material Symbols.
- **FR-004**: Gestionar el estado de los mensajes en un array reactivo.
- **FR-005**: Conectar con el endpoint `POST /api/chat` usando `useFetch` o `$fetch`.
- **FR-006**: Enviar el historial completo en cada mensaje siguiendo el contrato de la API.
- **FR-007**: Mostrar estados de carga mientras la IA responde.
- **FR-008**: Asegurar que el scroll baje automáticamente al recibir nuevos mensajes.

### Key Entities

- **Message**: Objeto con `role` ('user' o 'assistant') y `parts` (array con `text`).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: El componente carga y muestra el primer mensaje de la IA en menos de 1 segundo.
- **SC-002**: El diseño es 100% fiel a las clases de Tailwind proporcionadas.
- **SC-003**: El historial de conversación se mantiene correctamente durante toda la sesión.
