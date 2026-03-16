import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mockNuxtImport } from '@nuxt/test-utils/runtime';

// Usamos vi.hoisted para que los espías estén disponibles durante el hoisting de vi.mock
const mocks = vi.hoisted(() => {
  return {
    sendMessageSpy: vi.fn().mockResolvedValue({
      text: 'Respuesta de prueba de Gemini 2.5'
    }),
    createChatSpy: vi.fn(),
  };
});

// Mock de la librería @google/genai (clase definida dentro para evitar problemas de hoisting)
vi.mock('@google/genai', () => {
  class MockGoogleGenAI {
    constructor(options) {
      this.options = options;
      this.chats = {
        create: mocks.createChatSpy
      };
    }
  }
  return {
    GoogleGenAI: MockGoogleGenAI
  };
});

// Mock de los auto-imports de Nuxt
mockNuxtImport('useRuntimeConfig', () => {
  return () => ({ geminiApiKey: 'test-api-key' });
});

mockNuxtImport('createError', () => {
  return (obj) => {
    const error = new Error(obj.statusMessage || 'Error');
    error.statusCode = obj.statusCode;
    return error;
  };
});

// Ahora importamos gemini.js
import { getGeminiResponse, SYSTEM_PROMPT } from './gemini';

describe('Gemini Utils - getGeminiResponse (Gemini 2.5)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.createChatSpy.mockReturnValue({
      sendMessage: mocks.sendMessageSpy
    });
  });

  it('debería utilizar el modelo gemini-2.5-flash', async () => {
    await getGeminiResponse([{ role: 'user', parts: [{ text: 'Hola' }] }]);
    
    // Verificamos que se use gemini-2.5-flash
    expect(mocks.createChatSpy).toHaveBeenCalledWith(expect.objectContaining({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_PROMPT
      }
    }));
  });

  it('debería procesar correctamente el historial', async () => {
    const messages = [
      { role: 'user', parts: [{ text: 'Pregunta 1' }] },
      { role: 'assistant', parts: [{ text: 'Respuesta 1' }] },
      { role: 'user', parts: [{ text: 'Pregunta 2' }] }
    ];

    await getGeminiResponse(messages);

    const chatArgs = mocks.createChatSpy.mock.calls[0][0];
    expect(chatArgs.history).toHaveLength(2);
    expect(chatArgs.history[0].role).toBe('user');
    expect(chatArgs.history[1].role).toBe('model');
    expect(mocks.sendMessageSpy).toHaveBeenCalledWith({
      message: 'Pregunta 2'
    });
  });

  it('debería devolver el texto de la respuesta', async () => {
    const response = await getGeminiResponse([{ role: 'user', parts: [{ text: 'Hola' }] }]);
    expect(response).toBe('Respuesta de prueba de Gemini 2.5');
    expect(mocks.sendMessageSpy).toHaveBeenCalledWith({
      message: 'Hola'
    });
  });
});
