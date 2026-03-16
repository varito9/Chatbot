# Research: Frontend Chatbot UI & Integration

## Decision: Dependencies
- **Chosen**: `@nuxtjs/tailwindcss`
- **Rationale**: Es el módulo oficial de Nuxt para integrar Tailwind CSS. Proporciona una configuración automática, soporte para JIT y PurgeCSS de serie, lo cual es ideal para mantener el rendimiento.
- **Alternatives considered**: Tailwind CLI (rechazado por requerir configuración manual en Nuxt), CDN (rechazado por no ser apto para producción).

## Decision: Auto-scroll Logic
- **Chosen**: `watch` + `nextTick` en un Composable
- **Rationale**: Permite desacoplar la lógica de scroll del componente UI. El uso de `nextTick` asegura que el DOM se haya actualizado con el nuevo mensaje antes de calcular la posición del scroll. Se implementará una detección de "proximidad al fondo" para no interrumpir al usuario si está leyendo mensajes antiguos.
- **Alternatives considered**: `flex-col-reverse` (rechazado porque altera el orden lógico del DOM y dificulta la accesibilidad en algunos lectores de pantalla).

## Decision: API Integration
- **Chosen**: `$fetch` (Native Nuxt fetch)
- **Rationale**: Al ser una interacción disparada por un evento del usuario (click en enviar), `$fetch` es más apropiado que `useFetch` (que está diseñado para carga de datos al montar el componente).
- **Alternatives considered**: `useFetch` (rechazado por la naturaleza imperativa del envío de mensajes).

## Decision: Icons & Fonts
- **Chosen**: Google Fonts (Inter) y Material Symbols via `<Head>` o plugin.
- **Rationale**: Cumple directamente con los requisitos del diseño proporcionado por el usuario.
