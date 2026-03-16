# Frontend del Chatbot Orientador (UI e Integración)

Necesito construir el componente `components/Chatbot.vue` aplicando un diseño específico y conectándolo a nuestro backend existente.

**Diseño Visual (Tailwind CSS):**
Aplica la siguiente estructura y clases de Tailwind para la interfaz.
_(Nota para la IA: Adapta este HTML a un template de Vue 3)._

```html
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;display=swap"
      rel="stylesheet"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap"
      rel="stylesheet"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap"
      rel="stylesheet"
    />
    <script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            colors: {
              primary: "#12e27a",
              "background-light": "#f6f8f7",
              "background-dark": "#102219",
            },
            fontFamily: {
              display: ["Inter"],
            },
            borderRadius: {
              DEFAULT: "0.25rem",
              lg: "0.5rem",
              xl: "0.75rem",
              full: "9999px",
            },
          },
        },
      };
    </script>
    <style>
      body {
        font-family: "Inter", sans-serif;
      }
      .custom-scrollbar::-webkit-scrollbar {
        width: 4px;
      }
      .custom-scrollbar::-webkit-scrollbar-track {
        background: transparent;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb {
        background: #e2e8f0;
        border-radius: 10px;
      }
    </style>
  </head>
  <body
    class="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display"
  >
    <div class="flex h-screen flex-col overflow-hidden">
      <!-- Header -->
      <header
        class="flex h-16 items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 shrink-0"
      >
        <div class="flex items-center gap-3">
          <div
            class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"
          >
            <span class="material-symbols-outlined text-2xl">school</span>
          </div>
          <h1
            class="text-xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            Orientador Vocacional IA
          </h1>
        </div>
        <div class="flex items-center gap-3">
          <button
            class="flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-slate-900 hover:bg-primary/90 transition-colors"
          >
            <span class="material-symbols-outlined text-lg">refresh</span>
            <span>Reiniciar Test</span>
          </button>
        </div>
      </header>
      <div class="flex flex-1 overflow-hidden">
        <!-- Left Sidebar -->
        <aside
          class="hidden w-72 flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 lg:flex"
        >
          <div class="flex flex-col gap-6 p-6">
            <div>
              <h3
                class="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400"
              >
                Navegación
              </h3>
              <nav class="flex flex-col gap-1">
                <a
                  class="flex items-center gap-3 rounded-lg bg-primary/10 px-3 py-2 text-sm font-medium text-slate-900 dark:text-white"
                  href="#"
                >
                  <span class="material-symbols-outlined text-primary"
                    >chat_bubble</span
                  >
                  Historial de conversaciones
                </a>
                <a
                  class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  href="#"
                >
                  <span class="material-symbols-outlined">work</span>
                  Carreras recomendadas
                </a>
              </nav>
            </div>
            <div
              class="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800"
            >
              <div
                class="flex items-center gap-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 p-3"
              >
                <div
                  class="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary"
                >
                  <span class="material-symbols-outlined">person</span>
                </div>
                <div class="flex flex-col">
                  <span
                    class="text-sm font-semibold text-slate-900 dark:text-white"
                    >Estudiante</span
                  >
                  <span class="text-xs text-slate-500">Sesión activa</span>
                </div>
              </div>
            </div>
          </div>
        </aside>
        <!-- Main Chat Area -->
        <main
          class="flex flex-1 flex-col bg-background-light dark:bg-background-dark relative"
        >
          <!-- Chat Content -->
          <div class="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
            <div class="mx-auto max-w-3xl space-y-6">
              <!-- AI Message -->
              <div class="flex items-start gap-4">
                <div
                  class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden"
                >
                  <img
                    class="h-full w-full object-cover"
                    data-alt="AI assistant abstract digital profile avatar"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuADRvuMWSicA68U-pHL2JMSds0zl9cdTuqPcV-MgXlP7Qy6TRna0m7hnqc13Kn8yrzn04aJorevmGVXScA5-pFWTKc9qnBUMGHE50Z4dxuQxmBmvxcvQez0z7nsEZ0YfCM2OGpuADBf5b6siyHT5W229x9vYD6dOYBlWs2BKsOgH5RELAMOxRyUfO_k6Rp6JYicG_Q_v5kefzS3UMdFdwwq-WbfhKv0QfuanW9wvREH0ZWenPbbsj4TacevFLtZCXr_bzWZaJCHjw"
                  />
                </div>
                <div class="flex flex-col gap-1 max-w-[85%]">
                  <span class="text-xs font-medium text-slate-500 ml-1"
                    >IA Advisor</span
                  >
                  <div
                    class="rounded-2xl bg-white dark:bg-slate-800 p-4 text-slate-700 dark:text-slate-200 shadow-sm border border-slate-200/50 dark:border-slate-700/50"
                  >
                    ¡Hola! Soy tu orientador virtual. Mi objetivo es ayudarte a
                    encontrar el camino profesional que mejor se adapte a tus
                    talentos e intereses. Para comenzar, ¿qué materias te
                    resultaban más interesantes o sencillas en la escuela?
                  </div>
                </div>
              </div>
              <!-- User Message -->
              <div class="flex flex-row-reverse items-start gap-4">
                <div
                  class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-slate-900 shadow-sm"
                >
                  <span class="material-symbols-outlined text-sm font-bold"
                    >person</span
                  >
                </div>
                <div class="flex flex-col gap-1 items-end max-w-[85%]">
                  <span class="text-xs font-medium text-slate-500 mr-1"
                    >Tú</span
                  >
                  <div
                    class="rounded-2xl bg-primary p-4 text-slate-900 font-medium shadow-sm"
                  >
                    Siempre me gustaron mucho las matemáticas y resolver
                    problemas de lógica. También disfruto entender cómo
                    funcionan las cosas por dentro.
                  </div>
                </div>
              </div>
              <!-- AI Message -->
              <div class="flex items-start gap-4">
                <div
                  class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden"
                >
                  <img
                    class="h-full w-full object-cover"
                    data-alt="AI assistant abstract digital profile avatar"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHCZxEtLWx4Xip1J_IXqWHbz8koMnqe2T_piWirz89wgDoj_aFR6pNtY3iGF-GseW8ZSCJO7NqF0C6Z064CRWLI_m-YrtIKFG9f-cH3Ms647fBLYq7FexYhRk-OyygE-Gr3AwXwQctSWFbT32Llexw__L49NkG0UtnBudt-dJgh4A3-sBZIcjSPbzAp0x5DDoSRG6dJrmTCHoONOuNuo4pp2FW2xp2JLIviUztn6JFHlnpE6--ZLMqBbBc9G1Avmhnvft0vQnIgg"
                  />
                </div>
                <div class="flex flex-col gap-1 max-w-[85%]">
                  <span class="text-xs font-medium text-slate-500 ml-1"
                    >IA Advisor</span
                  >
                  <div
                    class="rounded-2xl bg-white dark:bg-slate-800 p-4 text-slate-700 dark:text-slate-200 shadow-sm border border-slate-200/50 dark:border-slate-700/50"
                  >
                    Excelente, eso indica un perfil analítico muy sólido. Cuando
                    piensas en resolver problemas, ¿prefieres trabajar en algo
                    tangible como estructuras físicas o maquinaria, o te sientes
                    más atraído por sistemas abstractos como el software o
                    modelos financieros?
                  </div>
                </div>
              </div>
              <!-- User Message -->
              <div class="flex flex-row-reverse items-start gap-4">
                <div
                  class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-slate-900 shadow-sm"
                >
                  <span class="material-symbols-outlined text-sm font-bold"
                    >person</span
                  >
                </div>
                <div class="flex flex-col gap-1 items-end max-w-[85%]">
                  <span class="text-xs font-medium text-slate-500 mr-1"
                    >Tú</span
                  >
                  <div
                    class="rounded-2xl bg-primary p-4 text-slate-900 font-medium shadow-sm"
                  >
                    Me atrae mucho más el mundo del software y la tecnología. Me
                    gusta la idea de crear algo desde cero usando código.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Input Area -->
          <div
            class="border-t border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-4"
          >
            <div class="mx-auto max-w-3xl">
              <div class="relative flex items-center">
                <input
                  class="w-full rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 py-4 pl-6 pr-14 text-sm focus:border-primary focus:ring-1 focus:ring-primary dark:text-white transition-all outline-none"
                  placeholder="Escribe tu respuesta aquí..."
                  type="text"
                />
                <button
                  class="absolute right-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-slate-900 hover:scale-105 transition-transform"
                >
                  <span class="material-symbols-outlined text-lg">send</span>
                </button>
              </div>
              <p class="mt-2 text-center text-[10px] text-slate-400">
                La IA puede proporcionar sugerencias, pero siempre consulta con
                un consejero académico profesional.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  </body>
</html>
```
