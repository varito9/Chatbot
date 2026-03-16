import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    globals: true,
    environment: 'node', // Cambiado a node para tests de API
    pool: 'threads',
    server: {
      deps: {
        inline: [/@nuxt\/test-utils/]
      }
    }
  }
})
