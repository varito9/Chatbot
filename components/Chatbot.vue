<template>
  <div class="flex h-screen flex-col overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-display relative">
    <!-- Background Pattern -->
    <div class="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
      <svg width="100%" height="100%"><pattern id="pattern-hex" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M20 0l20 10v20L20 40 0 30V10z" fill="none" stroke="currentColor" stroke-width="1"/></pattern><rect width="100%" height="100%" fill="url(#pattern-hex)"/></svg>
    </div>

    <!-- Header -->
    <header class="relative z-10 flex h-16 items-center justify-between border-b border-slate-200/60 dark:border-slate-800/60 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md px-6 shrink-0">
      <div class="flex items-center gap-3">
        <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20 text-primary shadow-sm shadow-primary/20">
          <span class="material-symbols-outlined text-2xl">school</span>
        </div>
        <h1 class="text-xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">
          Orientador Vocacional
        </h1>
      </div>
      <div class="flex items-center gap-3">
        <button 
          v-if="messages.length > 1"
          class="flex h-9 items-center justify-center gap-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 px-4 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 transition-all shadow-sm"
          @click="exportChat"
        >
          <span class="material-symbols-outlined text-lg">download</span>
          <span>Exportar</span>
        </button>
        <button 
          class="flex h-9 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-xs font-bold text-slate-900 hover:shadow-lg hover:shadow-primary/30 transition-all active:scale-95"
          @click="resetChat"
        >
          <span class="material-symbols-outlined text-lg">refresh</span>
          <span>Reiniciar</span>
        </button>
      </div>
    </header>

    <div class="flex flex-1 overflow-hidden relative z-10">
      <!-- Error Alert (Toast) -->
      <transition name="fade">
        <div v-if="showError" class="absolute top-4 left-1/2 z-50 -translate-x-1/2 w-full max-w-md px-4">
          <div class="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50/90 backdrop-blur-md p-4 text-red-800 shadow-xl dark:border-red-900/50 dark:bg-red-950/90 dark:text-red-200">
            <span class="material-symbols-outlined text-red-500">error</span>
            <div class="flex-1 text-sm font-medium">{{ errorMessage }}</div>
            <button class="rounded-lg p-1 hover:bg-red-100 dark:hover:bg-red-900" @click="showError = false">
              <span class="material-symbols-outlined text-sm">close</span>
            </button>
          </div>
        </div>
      </transition>

      <!-- Left Sidebar (Dynamic Progress) -->
      <aside class="hidden w-72 flex-col border-r border-slate-200/60 dark:border-slate-800/60 bg-white/40 dark:bg-slate-900/40 backdrop-blur-sm lg:flex">
        <div class="flex flex-col gap-8 p-6">
          <div>
            <h3 class="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
              Progreso del Test
            </h3>
            <div class="space-y-4">
              <div v-for="(phase, index) in phases" :key="index" class="relative pl-8">
                <div 
                  :class="[
                    'absolute left-0 top-1 h-5 w-5 rounded-full border-2 flex items-center justify-center transition-all duration-500',
                    currentPhaseIndex > index ? 'bg-primary border-primary text-slate-900' : 
                    currentPhaseIndex === index ? 'border-primary shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]' : 'border-slate-300 dark:border-slate-700'
                  ]"
                >
                  <span v-if="currentPhaseIndex > index" class="material-symbols-outlined text-xs font-bold">check</span>
                  <div v-else-if="currentPhaseIndex === index" class="h-1.5 w-1.5 rounded-full bg-primary animate-pulse"></div>
                </div>
                <div v-if="index < phases.length - 1" class="absolute left-[9px] top-6 h-6 w-[2px] bg-slate-200 dark:bg-slate-800">
                  <div 
                    class="h-full bg-primary transition-all duration-1000 origin-top" 
                    :style="{ transform: currentPhaseIndex > index ? 'scaleY(1)' : 'scaleY(0)' }"
                  ></div>
                </div>
                <p :class="['text-sm font-semibold transition-colors', currentPhaseIndex >= index ? 'text-slate-900 dark:text-white' : 'text-slate-400']">
                  {{ phase }}
                </p>
              </div>
            </div>
          </div>

          <div class="rounded-2xl bg-gradient-to-br from-primary/10 to-transparent p-4 border border-primary/10">
            <h4 class="text-[10px] font-bold uppercase text-primary mb-2">Resumen clave</h4>
            <p v-if="userInterests.length === 0" class="text-xs text-slate-500 italic">No hay datos aún...</p>
            <div class="flex flex-wrap gap-1.5">
              <span v-for="tag in userInterests" :key="tag" class="px-2 py-0.5 rounded-md bg-white dark:bg-slate-800 text-[10px] font-bold border border-slate-100 dark:border-slate-700 shadow-sm animate-scale-in">
                # {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </aside>

      <!-- Main Chat Area -->
      <main class="flex flex-1 flex-col relative overflow-hidden">
        <!-- Chat Content -->
        <div ref="chatContainer" class="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
          <div class="mx-auto max-w-3xl space-y-8">
            <transition-group name="bubble">
              <div 
                v-for="(msg, index) in messages" 
                :key="index"
                :class="['flex gap-3', msg.role === 'user' ? 'flex-row-reverse' : 'items-start']"
              >
                <!-- Avatar -->
                <div 
                  :class="[
                    'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl shadow-sm border transition-all duration-300',
                    msg.role === 'user' ? 'bg-primary border-primary/20 text-slate-900' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'
                  ]"
                >
                  <span class="material-symbols-outlined text-xl">
                    {{ msg.role === 'user' ? 'person' : 'smart_toy' }}
                  </span>
                </div>

                <!-- Message Bubble -->
                <div :class="['flex flex-col max-w-[85%]', msg.role === 'user' ? 'items-end' : '']">
                  <div 
                    :class="[
                      'p-4 shadow-sm border transition-all duration-300 whitespace-pre-wrap leading-relaxed',
                      msg.role === 'user' 
                        ? 'rounded-2xl rounded-tr-none bg-gradient-to-br from-primary via-primary to-primary/90 text-slate-900 font-medium border-primary/20' 
                        : 'rounded-2xl rounded-tl-none bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700/50'
                    ]"
                  >
                    {{ msg.parts[0].text }}
                  </div>
                </div>
              </div>
            </transition-group>

            <!-- Typing Indicator -->
            <div v-if="isLoading" class="flex items-start gap-3 animate-fade-in">
              <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                <span class="material-symbols-outlined text-xl">smart_toy</span>
              </div>
              <div class="rounded-2xl rounded-tl-none bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 shadow-sm">
                <div class="flex gap-1.5">
                  <div class="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce"></div>
                  <div class="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]"></div>
                  <div class="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Input Area -->
        <div class="border-t border-slate-200/60 dark:border-slate-800/60 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md p-6">
          <div class="mx-auto max-w-3xl">
            <!-- Quick Replies -->
            <transition name="fade">
              <div v-if="!isLoading && messages.length === 1" class="mb-4 flex flex-wrap gap-2 overflow-x-auto pb-2 no-scrollbar">
                <button 
                  v-for="reply in quickReplies" 
                  :key="reply"
                  @click="sendQuickReply(reply)"
                  class="whitespace-nowrap rounded-xl bg-white/80 dark:bg-slate-800/40 px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-primary hover:-translate-y-0.5 transition-all shadow-sm active:translate-y-0"
                >
                  {{ reply }}
                </button>
              </div>
            </transition>

            <form class="relative flex items-center group" @submit.prevent="sendMessage">
              <input
                v-model="currentInput"
                :disabled="isLoading"
                class="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 py-4 pl-6 pr-14 text-sm focus:border-primary focus:ring-4 focus:ring-primary/10 dark:text-white transition-all outline-none disabled:opacity-50"
                placeholder="Escribe tu respuesta aquí..."
                type="text"
              >
              <button
                type="submit"
                :disabled="isLoading || !currentInput.trim()"
                class="absolute right-2 flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-slate-900 hover:shadow-lg hover:shadow-primary/30 transition-all active:scale-95 disabled:opacity-30 disabled:hover:shadow-none"
              >
                <span class="material-symbols-outlined text-xl font-bold">arrow_forward</span>
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useChatScroll } from '../composables/useChatScroll'

const INITIAL_MESSAGE = {
  role: 'model',
  parts: [{ text: '¡Hola! Soy tu orientador IA. Antes de empezar, me gustaría saber: ¿Qué es lo que más te aburre o qué no harías ni aunque te paguen? Cuéntame qué ambientes no soportas (oficinas cerradas, mucho movimiento, etc).' }]
};

const STORAGE_KEY = 'vocational_chat_history';

const messages = ref([INITIAL_MESSAGE]);
const isLoading = ref(false);
const currentInput = ref('');
const chatContainer = ref(null);

const phases = ['Descarte Inicial', 'Tus Intereses', 'Perfil Laboral', 'Recomendación'];
const quickReplies = ['No soporto estar sentado 8h', 'Me encanta el diseño', 'Prefiero ayudar a la gente', 'Me gustan las mates', 'Trabajo al aire libre'];

// Computados dinámicos
const currentPhaseIndex = computed(() => {
  const msgCount = messages.value.length;
  if (msgCount <= 2) return 0;
  if (msgCount <= 6) return 1;
  if (msgCount <= 10) return 2;
  return 3;
});

const userInterests = computed(() => {
  // Extrae algunas palabras clave de las respuestas del usuario para el resumen
  const userText = messages.value
    .filter(m => m.role === 'user')
    .map(m => m.parts[0].text.toLowerCase())
    .join(' ');
  
  const keywords = ['oficina', 'aire libre', 'tecnología', 'social', 'salud', 'creativo', 'dibujo', 'ordenadores', 'viajar', 'gestión', 'ayudar'];
  return keywords.filter(k => userText.includes(k)).slice(0, 5);
});

const showError = ref(false);
const errorMessage = ref('');

const { scrollToBottom } = useChatScroll(chatContainer, messages);

onMounted(() => {
  const savedMessages = localStorage.getItem(STORAGE_KEY);
  if (savedMessages) {
    try {
      messages.value = JSON.parse(savedMessages);
    } catch (e) {
      console.error('Error al cargar historial:', e);
    }
  }
});

watch(messages, (newMessages) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newMessages));
}, { deep: true });

const sendMessage = async (textOverride = null) => {
  // Si textOverride es un evento (de @submit), lo ignoramos y usamos currentInput
  const text = (typeof textOverride === 'string') ? textOverride : currentInput.value;
  
  if (!text || !text.trim() || isLoading.value) return;

  const textToSend = text.trim();
  showError.value = false;
  
  const userMessage = { role: 'user', parts: [{ text: textToSend }] };
  messages.value.push(userMessage);
  
  // Solo limpiamos el input si NO es una respuesta rápida
  if (typeof textOverride !== 'string') currentInput.value = '';
  isLoading.value = true;
  scrollToBottom();

  try {
    const response = await $fetch('/api/chat', {
      method: 'POST',
      body: { messages: messages.value }
    });
    messages.value.push({ role: 'model', parts: [{ text: response.text }] });
  } catch (error) {
    errorMessage.value = `Error: ${error.data?.statusMessage || error.message}`;
    showError.value = true;
  } finally {
    isLoading.value = false;
    scrollToBottom();
  }
};

const sendQuickReply = (reply) => sendMessage(reply);

const exportChat = () => {
  const content = messages.value.map(msg => `${msg.role === 'user' ? 'Tú' : 'Orientador IA'}: ${msg.parts[0].text}`).join('\n\n---\n\n');
  const blob = new Blob([`INFORME DE ORIENTACIÓN VOCACIONAL\n\n${content}`], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `informe-vocacional-${new Date().toISOString().slice(0,10)}.txt`;
  a.click();
  URL.revokeObjectURL(url);
};

const resetChat = () => {
  messages.value = [INITIAL_MESSAGE];
  localStorage.removeItem(STORAGE_KEY);
  showError.value = false;
};
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 5px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
.dark .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; }

.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

/* Animaciones */
.bubble-enter-active {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.bubble-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

@keyframes scale-in {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}
.animate-scale-in { animation: scale-in 0.3s ease-out forwards; }
</style>
