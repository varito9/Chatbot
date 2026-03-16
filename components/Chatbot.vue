<template>
  <div class="flex h-screen flex-col overflow-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
    <!-- Header -->
    <header class="flex h-16 items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 shrink-0">
      <div class="flex items-center gap-3">
        <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <span class="material-symbols-outlined text-2xl">school</span>
        </div>
        <h1 class="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
          Orientador Vocacional IA
        </h1>
      </div>
      <div class="flex items-center gap-3">
        <button 
          class="flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-slate-900 hover:bg-primary/90 transition-colors"
          @click="resetChat"
        >
          <span class="material-symbols-outlined text-lg">refresh</span>
          <span>Reiniciar Test</span>
        </button>
      </div>
    </header>

    <div class="flex flex-1 overflow-hidden">
      <!-- Error Alert (Toast) -->
      <transition name="fade">
        <div v-if="showError" class="absolute top-4 left-1/2 z-50 -translate-x-1/2 w-full max-w-md px-4">
          <div class="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-800 shadow-lg dark:border-red-900/50 dark:bg-red-950 dark:text-red-200">
            <span class="material-symbols-outlined text-red-500">error</span>
            <div class="flex-1 text-sm font-medium">
              {{ errorMessage }}
            </div>
            <button class="rounded-lg p-1 hover:bg-red-100 dark:hover:bg-red-900 transition-colors" @click="showError = false">
              <span class="material-symbols-outlined text-sm">close</span>
            </button>
          </div>
        </div>
      </transition>

      <!-- Left Sidebar -->
      <aside class="hidden w-72 flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 lg:flex">
        <div class="flex flex-col gap-6 p-6">
          <div>
            <h3 class="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Navegación
            </h3>
            <nav class="flex flex-col gap-1">
              <a class="flex items-center gap-3 rounded-lg bg-primary/10 px-3 py-2 text-sm font-medium text-slate-900 dark:text-white" href="#">
                <span class="material-symbols-outlined text-primary">chat_bubble</span>
                Historial
              </a>
              <a class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors" href="#">
                <span class="material-symbols-outlined">work</span>
                Carreras
              </a>
            </nav>
          </div>
          <div class="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800">
            <div class="flex items-center gap-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 p-3">
              <div class="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <span class="material-symbols-outlined">person</span>
              </div>
              <div class="flex flex-col">
                <span class="text-sm font-semibold text-slate-900 dark:text-white">Estudiante</span>
                <span class="text-xs text-slate-500">Sesión activa</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <!-- Main Chat Area -->
      <main class="flex flex-1 flex-col bg-background-light dark:bg-background-dark relative">
        <!-- Chat Content -->
        <div ref="chatContainer" class="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
          <div class="mx-auto max-w-3xl space-y-6">
            <div 
              v-for="(msg, index) in messages" 
              :key="index"
              :class="['flex gap-4', msg.role === 'user' ? 'flex-row-reverse' : 'items-start']"
            >
              <!-- Avatar -->
              <div 
                :class="[
                  'flex h-9 w-9 shrink-0 items-center justify-center rounded-full shadow-sm overflow-hidden',
                  msg.role === 'user' ? 'bg-primary text-slate-900' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700'
                ]"
              >
                <img 
                  v-if="msg.role === 'model'"
                  class="h-full w-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuADRvuMWSicA68U-pHL2JMSds0zl9cdTuqPcV-MgXlP7Qy6TRna0m7hnqc13Kn8yrzn04aJorevmGVXScA5-pFWTKc9qnBUMGHE50Z4dxuQxmBmvxcvQez0z7nsEZ0YfCM2OGpuADBf5b6siyHT5W229x9vYD6dOYBlWs2BKsOgH5RELAMOxRyUfO_k6Rp6JYicG_Q_v5kefzS3UMdFdwwq-WbfhKv0QfuanW9wvREH0ZWenPbbsj4TacevFLtZCXr_bzWZaJCHjw"
                >
                <span v-else class="material-symbols-outlined text-sm font-bold">person</span>
              </div>

              <!-- Message Bubble -->
              <div :class="['flex flex-col gap-1 max-w-[85%]', msg.role === 'user' ? 'items-end' : '']">
                <span class="text-xs font-medium text-slate-500 ml-1">
                  {{ msg.role === 'user' ? 'Tú' : 'IA Advisor' }}
                </span>
                <div 
                  :class="[
                    'rounded-2xl p-4 shadow-sm border',
                    msg.role === 'user' 
                      ? 'bg-primary text-slate-900 font-medium border-primary' 
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200/50 dark:border-slate-700/50'
                  ]"
                >
                  {{ msg.parts[0].text }}
                </div>
              </div>
            </div>

            <!-- Loading State -->
            <div v-if="isLoading" class="flex items-start gap-4 animate-pulse">
              <div class="h-9 w-9 rounded-full bg-slate-200 dark:bg-slate-700"/>
              <div class="flex flex-col gap-1 w-24">
                <div class="h-2 bg-slate-200 dark:bg-slate-700 rounded w-full"/>
                <div class="h-10 bg-slate-200 dark:bg-slate-700 rounded-2xl w-full"/>
              </div>
            </div>
          </div>
        </div>

        <!-- Input Area -->
        <div class="border-t border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-4">
          <div class="mx-auto max-w-3xl">
            <form class="relative flex items-center" @submit.prevent="sendMessage">
              <input
                v-model="currentInput"
                :disabled="isLoading"
                class="w-full rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 py-4 pl-6 pr-14 text-sm focus:border-primary focus:ring-1 focus:ring-primary dark:text-white transition-all outline-none disabled:opacity-50"
                placeholder="Escribe tu respuesta aquí..."
                type="text"
              >
              <button
                type="submit"
                :disabled="isLoading || !currentInput.trim()"
                class="absolute right-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-slate-900 hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100"
              >
                <span class="material-symbols-outlined text-lg">send</span>
              </button>
            </form>
            <p class="mt-2 text-center text-[10px] text-slate-400">
              La IA puede proporcionar sugerencias, pero siempre consulta con un consejero académico profesional.
            </p>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useChatScroll } from '../composables/useChatScroll'

const INITIAL_MESSAGE = {
  role: 'model',
  parts: [{ text: 'Soy tu orientador. ¿Qué es lo que más te aburre o qué no harías ni aunque te paguen? Cuéntame qué ambientes no soportas o en qué tipo de entorno no te ves trabajando (estar sentado 8 horas en una oficina, moviéndote mucho).' }]
};

const messages = ref([INITIAL_MESSAGE]);
const isLoading = ref(false);
const currentInput = ref('');
const chatContainer = ref(null);

// Estados de error
const showError = ref(false);
const errorMessage = ref('');

const { scrollToBottom } = useChatScroll(chatContainer, messages);

const sendMessage = async () => {
  if (!currentInput.value.trim() || isLoading.value) return;

  // Limpiar errores previos
  showError.value = false;

  const userMessage = {
    role: 'user',
    parts: [{ text: currentInput.value }]
  };

  messages.value.push(userMessage);
  currentInput.value = '';
  isLoading.value = true;
  scrollToBottom();

  try {
    const response = await $fetch('/api/chat', {
      method: 'POST',
      body: { messages: messages.value }
    });

    messages.value.push({
      role: 'model',
      parts: [{ text: response.text }]
    });
  } catch (error) {
    console.error('Error al enviar mensaje:', error);
    
    // Extraer mensaje de error del servidor si existe
    const serverMessage = error.data?.statusMessage || error.message || 'Error de conexión con la IA';
    errorMessage.value = `Error: ${serverMessage}`;
    showError.value = true;

    // También dejamos un mensaje en el chat para contexto
    messages.value.push({
      role: 'model',
      parts: [{ text: 'Lo siento, ha ocurrido un error al procesar tu mensaje. Revisa la notificación superior e inténtalo de nuevo.' }]
    });
  } finally {
    isLoading.value = false;
    scrollToBottom();
  }
};

const resetChat = () => {
  messages.value = [INITIAL_MESSAGE];
  showError.value = false;
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translate(-50%, -20px);
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
