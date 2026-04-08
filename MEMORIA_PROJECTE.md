# PROCÉS DE DESENVOLUPAMENT DEL CHATBOT

## 1. Exemples de prompts utilitzats

Durant el procés, s'han utilitzat prompts directes i iteratius per ajustar tant la funcionalitat com el disseny:

- **Definició del Producte**: "L'aplicació és una plataforma web interactiva que actua com a Orientador Vocacional Virtual. L'objectiu principal és ajudar a estudiants o persones en procés de cerca formativa a descobrir quins estudis (Cicles Formatius de Grau Mig/Superior, Graus Universitaris) s'adapten millor al perfil. Mitjançant una interfície de xat (bot), l'aplicació realitza una petita entrevista a l'usuari, analitzant les seves respostes, interessos i aptituds en tiempo real mitjançant Intel·ligència Artificial, per a finalment proporcionar una recomanació acadèmica i professional personalitzada."
- **Millora de la Interfície**: "vull que la interfície sigui més professional, amb un sidebar a l'esquerra que mostri el progrés del test (4 fases: Descarte Inicial, Tus Intereses, Perfil Laboral, Recomendación) i que tingui un fons amb un patró geomètric subtil."
- **Comportament de l'Input**: "vull que llevis el fons negre i només deixis les opcions (quick replies) que flotin sobre el fons del xat. Aquestes opcions només han de sortir al principi."
- **Funcionalitat d'Exportació**: "afegeix un botó per a exportar la conversa a un fitxer de text per a que l'usuari pugui guardar les recomanacions."
- **Personalitat del Bot**: "ajusta el sistema per a que el bot no sembli un robot. Prohibeix paraules com 'Entendido' o 'Comprendo'. Ha de ser un mentor jove i directe."

## 2. Iteracions amb l'agent

El procés ha seguit diverses etapes d'ajust tècnic:

1. **Gestió d'Estat i Persistència**: S'ha implementat `localStorage` per guardar l'historial de xat (`vocational_chat_history`), permetent que l'usuari no perdi el progrés en recarregar la pàgina.
2. **Lògica de Progrés Dinàmic**: S'ha creat una propietat computada `currentPhaseIndex` que calcula automàticament en quina fase es troba l'usuari basant-se en el nombre de missatges intercanviats.
3. **Anàlisi de Paraules Clau**: S'ha implementat una lògica de filtratge (`userInterests`) que extreu paraules clau (com "aire lliure", "tecnologia", "ajudar") de les respostes de l'usuari per mostrar un resum visual al sidebar.
4. **UX de Xat**: Ús d'un composable personalitzat `useChatScroll` per assegurar que el xat sempre faci scroll cap avall quan arriba un missatge nou, millorant l'experiència d'usuari.
5. **Robustesa del Backend**: Implementació de validacions rigoroses a l'endpoint `/api/chat.post.js` per assegurar que els missatges tinguin el format correcte abans d'enviar-los a l'API de Gemini.

### Exemple de bug solucionat (Tò del Bot)

Es va detectar que el bot era massa repetitiu i formal. Es van aplicar les següents **REGLAS DE TONO** al `SYSTEM_PROMPT`:

- **CONCISIÓ**: Màxim 2 frases curtes per resposta.
- **ANTI-ROBÒTIC**: Prohibit iniciar respostes amb "Entendido", "Perfecto" o repetir el que l'usuari diu.
- **VALIDACIÓ HUMANA**: Ús d'expressions com "¡Totalmente!", "Tiene sentido" o "Me cuadra".
- **FORMAT ESTRICTE**: Les llistes de recomanacions han de seguir el format `1-Carrera` amb doble salt de línia per facilitar la lectura.

### Funcionalitats clau implementades

- **Sidebar de Progrés**: Visualització en temps real de l'etapa de l'orientació.
- **Respostes Ràpides (Quick Replies)**: Faciliten l'inici de la conversa amb opcions predefinides.
- **Exportació de Resultats**: Generació d'un fitxer `.txt` amb el resum de la sessió.
- **Resum d'Interessos**: Sistema de "tags" que apareixen al sidebar segons el que l'usuari explica.
- **Disseny Responsive i Dark Mode**: Interfície optimitzada per a dispositius mòbils i suport per a tema fosc automàtic.

### Captura del disseny generat vs resultat final

![Disseny generat vs resultat final](doc/chatbot.png)

### Reflexió final sobre el procés

L'ús d'un agent d'IA per al desenvolupament ha permès realitzar canvis visuals complexos i ajustos de comportament de manera molt ràpida. La capacitat de l'agent per entendre instruccions de disseny visual ("que floten sobre el fons") traduint-les a classes Tailwind específiques i lògica de Vue3 ha accelerat enormement el cicle de feedback. La gestió de les quotes de l'API de Google i la selecció del model `gemini-2.5-flash` han estat claus per mantenir un rendiment òptim i un cost controlat durant les proves.

---

## 3. Procés d’especificació (Spec-Driven Development)

Per dur a terme aquest projecte d'una manera estructurada, modular i amb un enfocament professional envers la integració d'Intel·ligència Artificial, s'ha utilitzat la metodologia de **Spec-Driven Development** (Desenvolupament basat en especificacions) mitjançant **Speckit / OpenSpec**. 

Aquesta metodologia, guiada a través de generació de documentació abans d'escriure codi, assegura la coherència tècnica del producte separant de manera clara les responsabilitats al backend i al frontend, documentant les decisions en repositoris dedicats dins de la carpeta `specs/`. L'ús de Speckit divideix el treball en tres fases diferents:

### a. Foundations
En aquesta etapa es defineix el context, els objectius i l'abast absolut del projecte (com s'ha establert als fitxers i discussions de requeriments generals). Serveix per estipular que el projecte és una aplicació d'orientació amb IA, establint l'ús de tecnologies com "Serverless" i "Tailwind CSS", i aclarint on comença i on acaba la funcionalitat MVP.

### b. Specify
L'etapa d'especificació s'encarrega de descendir a la descripció funcional i al comportament esperat de l'aplicació, creant arxius `spec.md` individuals per a cada feature (e.g. Frontend i Backend).
- S'hi especifiquen les **Històries d'Usuari** amb escenaris de comportament detallats (Given / When / Then). 
- S'hi defineixen els criteris d'acceptació i es desgranen els **Requisits Funcionals** clars (per exemple: *FR-008: El sistema ha d'utilitzar el SDK de Google Gemini* per al backend o *FR-004: Gestionar l'estat dels missatges en un array reactiu* per al frontend).

### c. Planning
Consisteix en l'organització de les tasques, l'estructura de projecte i la presa de les principals decisions tècniques per traduir l'especificació funcional a una implementació d'enginyeria informàtica:
- A l'arxiu `plan.md` es documenten les decisions d'arquitectura, dependències i ubicació al codi font.
- A l'arxiu `tasks.md` tota la implementació de codi es divideix en un llistat de tasques processables (`[ ]`, `[x]`), convertint les històries en codi.

---

## 4. Annex amb fitxers rellevants

A continuació es mostren fragments dels fitxers d'especificació (en format `.md`) més importants que han guiat l'execució d'aquest projecte, els quals es troben ubicats dins les rames tècniques `specs/001-backend-chatbot/` i `specs/002-frontend-chatbot/`.

### 4.1 Fragment de `specs/001-backend-chatbot/spec.md`
Aquest fitxer documenta els requisits lògics per la creació de l'API Serverless:

```markdown
### User Story 1 - Consulta básica al chatbot (Priority: P1)
Como estudiante, quiero enviar un mensaje al chatbot para recibir orientación sobre mis estudios.
**Independent Test**: Se puede probar enviando un POST a `/api/chat` con un array de mensajes y verificando que devuelve una respuesta coherente.

**Acceptance Scenarios**:
1. **Given** un endpoint serverless en `/server/api/chat.js`, **When** se envía un POST con `{ messages: [...] }`, **Then** se recibe una respuesta JSON de la IA.

### Functional Requirements
- **FR-001**: El sistema debe exponer un endpoint POST en `server/api/chat.js`.
- **FR-004**: El System Prompt debe definir a la IA como un experto en el sistema educativo de España.
- **FR-006**: La IA debe realizar entre 3 y 4 preguntas antes de dar una recomendación final.
- **FR-009**: La API Key de Gemini debe obtenerse de la variable de entorno `GEMINI_API_KEY`.
```

### 4.2 Fragment de `specs/001-backend-chatbot/plan.md`
Declaració d'intencions arquitectòniques i dependències escollides:

```markdown
## Technical Context
**Language/Version**: Nuxt 4 (TypeScript)
**Primary Dependencies**: `@google/generative-ai`
**Target Platform**: Node.js / Serverless (Nitro)
**Scale/Scope**: Single endpoint `server/api/chat.post.js`

### Source Code (repository root)
server/
├── api/
│   └── chat.post.ts      # Endpoint serverless principal
```

### 4.3 Fragment de `specs/002-frontend-chatbot/spec.md`
Descripció funcional orientada a l'experiència d'usuari i la interfície:

```markdown
### User Story 1 - Interfaz de Chat (Priority: P1)
Como usuario, quiero ver una interfaz de chat moderna y limpia para interactuar con el orientador.

**Acceptance Scenarios**:
1. **Given** el componente `Chatbot.vue`, **When** se carga en el navegador, **Then** se muestra el header con el título "Orientador Vocacional IA" y la barra lateral.

### Functional Requirements
- **FR-001**: Implementar el componente `components/Chatbot.vue`.
- **FR-002**: Utilizar Tailwind CSS para el diseño según el HTML proporcionado.
- **FR-006**: Enviar el historial completo en cada mensaje siguiendo el contrato de la API.
```

### 4.4 Fragment representatiu de seguiment (`tasks.md`)
Representació condensada de com es reparteix l'acció de programació per a verificar que el treball es fa seguint l'especificació:

```markdown
## Tasks

### Phase 1: Foundation
- [x] Configure Nuxt API environment
- [x] Integrate `@google/generative-ai` securely

### Phase 2: Feature Implementation
- [x] Create `server/api/chat.post.ts` handler
- [x] Design Google Gemini prompt block
- [x] Develop Vue component `Chatbot.vue`
- [x] Implement scrolling composable `useChatScroll`
```
