# Tasks: API Serverless para el Chatbot Orientador Vocacional

**Input**: Design documents from `/specs/001-backend-chatbot/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Tests are included as per the "Independent Test" requirements in the feature specification and the choice of Vitest in the implementation plan.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Install `@google/generative-ai` dependency via npm
- [X] T002 Create `.env` file with `GEMINI_API_KEY` at repository root
- [X] T003 Update `nuxt.config.ts` with `runtimeConfig.geminiApiKey` for server-side access

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T004 [P] Create TypeScript interfaces for chat entities in `server/utils/types.ts`
- [X] T005 [P] Setup Vitest configuration for Nuxt in `vitest.config.ts`
- [X] T006 Create base Gemini utility skeleton in `server/utils/gemini.ts`
- [X] T007 [P] Configure global error handling utility in `server/utils/errors.ts`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Consulta básica al chatbot (Priority: P1) 🎯 MVP

**Goal**: Enable basic chat interaction with System Prompt injection and topic redirection.

**Independent Test**: Send POST to `/api/chat` with a basic greeting and verify IA response following the orientador persona.

### Tests for User Story 1

- [X] T008 [P] [US1] Create unit test for System Prompt injection in `server/utils/gemini.test.ts`
- [X] T009 [P] [US1] Create integration test for POST `/api/chat` in `tests/api/chat.test.ts`

### Implementation for User Story 1

- [X] T010 [US1] Implement `getGeminiResponse` function in `server/utils/gemini.ts`
- [X] T011 [US1] Define and inject the Orientador Vocacional System Prompt in `server/utils/gemini.ts`
- [X] T012 [US1] Implement Nitro handler for POST `/api/chat` in `server/api/chat.post.ts`
- [X] T013 [US1] Add logic to handle conversational history (messages array) in `server/api/chat.post.ts`

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently.

---

## Phase 4: User Story 2 - Proceso de acotación de intereses (Priority: P2)

**Goal**: Enforce the questioning rule (3-4 questions) and final recommendation format.

**Independent Test**: Simulate 4 turns of conversation and verify that a recommendation with 2-3 options is provided only at the end.

### Tests for User Story 2

- [X] T014 [P] [US2] Add unit test cases for questioning and recommendation logic in `server/utils/gemini.test.ts`
- [X] T015 [US2] Update integration test in `tests/api/chat.test.ts` to simulate multi-turn interaction

### Implementation for User Story 2

- [X] T016 [US2] Refine System Prompt instructions in `server/utils/gemini.ts` to enforce the "question-then-recommend" flow
- [X] T017 [US2] Ensure AI response parsing correctly handles the final verdict in `server/api/chat.post.ts`

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [X] T018 [P] Update `README.md` with API documentation and endpoint details
- [X] T019 Performance check for response times in `server/api/chat.post.ts`
- [X] T020 [P] Run and validate `quickstart.md` scenarios manually
- [X] T021 Code cleanup and final TypeScript type checking

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately.
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories.
- **User Stories (Phase 3+)**: All depend on Foundational phase completion.
- **Polish (Final Phase)**: Depends on all user stories being complete.

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2).
- **User Story 2 (P2)**: Can start after US1 basic implementation is verified, as it refines the AI behavior.

### Parallel Opportunities

- T004, T005, T007 (Foundational) can run in parallel.
- T008, T009 (US1 Tests) can run in parallel.
- Documentation and manual validation tasks in Polish phase can run in parallel.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup.
2. Complete Phase 2: Foundational.
3. Complete Phase 3: User Story 1.
4. **STOP and VALIDATE**: Verify basic chat functionality via `curl`.

### Incremental Delivery

1. Foundation ready.
2. Add User Story 1 (Basic chat) → Test.
3. Add User Story 2 (Advanced flow) → Test.
4. Each story adds value without breaking the previous one.
