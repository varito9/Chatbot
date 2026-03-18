# ESPECIFICACIÓ TÈCNICA: ORIENTADOR VOCACIONAL VIRTUAL

## 1. Descripció funcional de l'aplicació
L'aplicació és una plataforma web interactiva dissenyada per actuar com un **Orientador Vocacional Virtual**. El seu objectiu principal és ajudar estudiants o persones en procés de cerca formativa a descobrir quins estudis (Cicles Formatius de Grau Mitjà/Superior o Graus Universitaris) s'adapten millor al seu perfil.

Mitjançant una interfície de xat (bot), l'aplicació realitza una entrevista dinàmica a l'usuari. Utilitza Intel·ligència Artificial (IA) per analitzar les respostes, interessos i aptituds en temps real, proporcionant finalment una recomanació acadèmica i professional personalitzada i honesta.

## 2. Actors del sistema
*   **Usuari (Estudiant/Cercador):** Interacciona amb el bot, respon a les preguntes i rep recomanacions. Pot exportar els resultats de la sessió.
*   **Sistema (Frontend/Backend Nuxt):** Gestiona la interfície d'usuari, el flux de la conversa, la persistència local i la comunicació amb el servei d'IA.
*   **Agent d'IA (Google Gemini 2.5):** Processa el llenguatge natural, manté el context de la conversa i genera les preguntes d'orientació i les recomanacions finalistes basades en el perfil de l'usuari.

## 3. User Journey (Flux d'usuari)
1.  **Inici:** L'usuari accedeix a la web i rep una salutació del bot amb una pregunta de "descart inicial" (què no suportaria fer).
2.  **Interacció Inicial:** L'usuari pot utilitzar respostes ràpides (Quick Replies) o escriure la seva pròpia resposta.
3.  **Entrevista Dinàmica:** El bot realitza entre 4 i 5 preguntes consecutives per explorar interessos i perfil laboral.
4.  **Seguiment Visual:** L'usuari veu el seu progrés al sidebar esquerre (fases del test) i les paraules clau que el sistema va detectant (tags d'interessos).
5.  **Recomanació Final:** Un cop el bot té prou informació, presenta 2 o 3 opcions reals d'estudis amb els seus punts positius i aspectes a tenir en compte.
6.  **Accions Finals:** L'usuari pot exportar la conversa a un fitxer `.txt` per a consulta futura o reiniciar el xat per començar de nou.

## 4. Estructura de dades
### Missatges del Xat (Frontend/Backend)
```typescript
interface ChatMessage {
  role: 'user' | 'model';
  parts: [
    { text: string }
  ];
}
```

### Estat de l'Aplicació (Frontend)
*   `messages`: Array de `ChatMessage` (persistit a `localStorage`).
*   `phases`: Array d'strings que defineixen les etapes (`Descarte Inicial`, `Tus Intereses`, `Perfil Laboral`, `Recomendación`).
*   `userInterests`: Llista de paraules clau extretes dinàmicament de les respostes de l'usuari.

## 5. Llista d'endpoints serverless
*   **POST `/api/chat`:**
    *   **Descripció:** Rep l'historial de missatges i retorna la següent resposta generada per l'IA.
    *   **Payload d'entrada:** `{ messages: ChatMessage[] }`.
    *   **Resposta:** `{ text: string }`.
    *   **Seguretat:** Validació de format d'entrada i gestió d'errors de quota/servei.

## 7. Organització de la documentació tècnica
Per a una millor mantenibilitat i detall tècnic, l'especificació s'ha dividit en mòduls especialitzats que es troben a la carpeta `.specify/`:

*   **`frontend-chatbot.md`**: Detalla la implementació de la interfície d'usuari, components de Vue 3, estils amb Tailwind CSS, gestió de l'estat local i l'experiència d'usuari (UX).
*   **`backend-chatbot.md`**: Documenta la lògica del servidor amb Nuxt 4, la integració amb l'SDK de Google Generative AI, el disseny del *system prompt* i la gestió d'errors de l'API.

Aquesta estructura modular permet una consulta més ràpida segons l'àrea de desenvolupament afectada.
