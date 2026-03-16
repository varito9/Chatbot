// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@nuxtjs/tailwindcss"],
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
  tailwindcss: {
    cssPath: "@/assets/css/tailwind.css",
    viewer: true,
  },
  runtimeConfig: {
    // Nuxt mapeará automáticamente NUXT_GEMINI_API_KEY desde el .env a geminiApiKey
    geminiApiKey: process.env.GEMINI_API_KEY || "",
  },
});
