<template>
  <div>
    <NuxtRouteAnnouncer />
    <Chatbot />
  </div>
</template>

<script setup>
import Chatbot from '../components/Chatbot.vue'

useHead({
  title: 'Orientador Vocacional IA',
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap' }
  ]
})
</script>
