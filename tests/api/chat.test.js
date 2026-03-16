import { describe, it, expect, vi } from 'vitest';
import { setup, $fetch, mockNuxtImport } from '@nuxt/test-utils/e2e';

// Mock de la función de Gemini antes de levantar el servidor de Nuxt
mockNuxtImport('getGeminiResponse', () => {
  return vi.fn().mockResolvedValue('Respuesta mockeada de la IA para integración');
});

// Configuración de Nuxt para tests de integración
await setup({
  server: true,
  browser: false
});

describe('Chat API Integration - POST /api/chat', () => {
  
  it('debería responder con error 400 si el cuerpo está vacío', async () => {
    try {
      await $fetch('/api/chat', {
        method: 'POST',
        body: {}
      });
    } catch (err) {
      expect(err.statusCode).toBe(400);
    }
  });

  it('debería responder con error 400 si el formato de mensajes es inválido', async () => {
    try {
      await $fetch('/api/chat', {
        method: 'POST',
        body: {
          messages: [{ role: 'user', content: 'Esto no tiene parts' }]
        }
      });
    } catch (err) {
      expect(err.statusCode).toBe(400);
      expect(err.statusMessage.toLowerCase()).toContain('formato de mensajes');
    }
  });

  it('debería devolver una respuesta válida mockeada', async () => {
    const response = await $fetch('/api/chat', {
      method: 'POST',
      body: {
        messages: [
          { role: 'user', parts: [{ text: 'Hola, soy un estudiante' }] }
        ]
      }
    });

    expect(response).toHaveProperty('text');
    expect(response.text).toBe('Respuesta mockeada de la IA para integración');
  });
});
