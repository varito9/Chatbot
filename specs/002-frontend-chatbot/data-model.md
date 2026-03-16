# Data Model: Frontend Chatbot UI

## Entities

### Message (Client-Side)
Representa un mensaje en la UI del chat.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| role | string | 'user' o 'model' (asistente) |
| parts | array | Array de objetos `{ text: string }` |
| id | string | Identificador único local para `:key` en Vue |
| timestamp | Date | (Opcional) Para ordenación o visualización |

**Validation Rules**:
- `role` debe coincidir con los esperados por el backend ('user'/'model').
- `parts[0].text` no puede estar vacío al enviar.

### ChatState
Estado global reactivo del componente.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| messages | array | Colección de objetos `Message` |
| isLoading | boolean | Indica si se espera respuesta de la API |
| currentInput | string | Texto actual en el campo de entrada |
