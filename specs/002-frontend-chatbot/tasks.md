# Tasks: Frontend del Chatbot Orientador

**Input**: Design documents from `/specs/002-frontend-chatbot/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel
- **[Story]**: US1 (Interfaz), US2 (Integración API), US3 (Reinicio)

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Install `@nuxtjs/tailwindcss` module via npm
- [X] T002 Update `nuxt.config.js` to include `@nuxtjs/tailwindcss` in modules
- [X] T003 [P] Create `assets/css/tailwind.css` with Tailwind directives (@tailwind base, etc.)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before user stories

- [X] T004 Create `composables/useChatScroll.js` for auto-scroll logic
- [X] T005 [P] Setup global fonts (Inter) and Material Symbols in `app.vue` using `<Head>`
- [X] T006 [P] Define shared Tailwind theme colors (primary, background-light/dark) in `tailwind.config.js`

**Checkpoint**: Foundation ready - user story implementation can begin

---

## Phase 3: User Story 1 - Interfaz de Chat (Priority: P1) 🎯 MVP

**Goal**: Implement the visual structure of the chatbot using Tailwind CSS.

**Independent Test**: The component `Chatbot.vue` displays the header, sidebar, and initial AI message with correct styles.

### Implementation for User Story 1

- [X] T007 [P] [US1] Create component structure in `components/Chatbot.vue` (template/script/style)
- [X] T008 [US1] Implement Header UI with logo and "Reiniciar Test" button in `components/Chatbot.vue`
- [X] T009 [P] [US1] Implement Sidebar navigation UI in `components/Chatbot.vue`
- [X] T010 [US1] Implement main chat area layout and message bubbles (AI/User placeholders) in `components/Chatbot.vue`
- [X] T011 [US1] Implement Input Area UI (input + send button) in `components/Chatbot.vue`
- [X] T012 [US1] Integration of `Chatbot.vue` into `app.vue` for preview

**Checkpoint**: User Story 1 UI is functional and matches the design.

---

## Phase 4: User Story 2 - Envío de mensajes y respuesta (Priority: P1)

**Goal**: Connect the UI to the backend API and handle real-time messaging.

**Independent Test**: Send a message, see it in the chat, and receive/display the IA response.

### Implementation for User Story 2

- [X] T013 [US2] Initialize reactive state (`messages`, `isLoading`, `currentInput`) in `components/Chatbot.vue`
- [X] T014 [US2] Implement `sendMessage` function using `$fetch` to `POST /api/chat` in `components/Chatbot.vue`
- [X] T015 [US2] Integrate `useChatScroll` composable to handle automatic scrolling in `components/Chatbot.vue`
- [X] T016 [US2] Add loading state indicators (disabling button/input) in `components/Chatbot.vue`
- [X] T017 [US2] Implement error handling for failed API calls in `components/Chatbot.vue`

**Checkpoint**: User Story 2 is fully functional.

---

## Phase 5: User Story 3 - Reinicio de conversación (Priority: P2)

**Goal**: Allow users to reset the chat to its initial state.

**Independent Test**: Click "Reiniciar Test" and verify the message history is cleared.

### Implementation for User Story 3

- [X] T018 [US3] Implement `resetChat` function to clear messages array in `components/Chatbot.vue`
- [X] T019 [US3] Bind `resetChat` to the "Reiniciar Test" button in the header

---

## Phase N: Polish & Cross-Cutting Concerns

- [X] T020 [P] Final design review and Tailwind class cleanup in `components/Chatbot.vue`
- [X] T021 [P] Update `quickstart.md` with final testing instructions
- [X] T022 [P] Verify responsive behavior on mobile devices
