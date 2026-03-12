import { describe, it, expect } from 'vitest';
import { SYSTEM_PROMPT } from './gemini';

describe('Gemini Utils', () => {
  it('should have the correct System Prompt defined', () => {
    expect(SYSTEM_PROMPT).toContain('orientador académico y vocacional experto en el sistema educativo de España');
    expect(SYSTEM_PROMPT).toContain('REGLAS ESTRICTAS');
    expect(SYSTEM_PROMPT).toContain('NUNCA des la recomendación final de golpe en el primer mensaje');
    expect(SYSTEM_PROMPT).toContain('máximo 3 o 4 preguntas en total');
    expect(SYSTEM_PROMPT).toContain('2 o 3 opciones formativas recomendadas');
  });
});
