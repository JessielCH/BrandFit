import { ARCHETYPES } from '../data/archetypes';
import { CREATORS, FRAUD_CREATOR } from '../data/creators';
import { SUSPICIOUS_HINTS } from '../data/analysis';
import type { ArchetypeId, ChipTone, Creator } from '../types';

/** Devuelve el color del chip según el puntaje: verde (>=65), amarillo (>=45) o rojo (<45). */
export function scoreTone(score: number): Exclude<ChipTone, 'neutral'> {
  if (score >= 65) return 'success';
  if (score >= 45) return 'warning';
  return 'danger';
}

/** Busca el nombre completo de un arquetipo a partir de su id (ej. 'tech' -> 'Tecnología / Innovación'). */
export function archetypeLabel(id: ArchetypeId): string {
  return ARCHETYPES.find((a) => a.id === id)?.label ?? '';
}

/** Calcula los puntos extra de bono según el porcentaje de engagement. */
export function engagementBonus(engagement: number): number {
  if (engagement >= 7) return 5;
  if (engagement >= 5) return 3;
  if (engagement >= 3) return 1;
  return 0;
}

/** Valida que el @username escrito no esté vacío y solo tenga caracteres permitidos. */
export function validateUsername(username: string): string | null {
  if (!username) return 'Escribe un @username.';
  if (!/^[a-zA-Z0-9._]{2,24}$/.test(username)) {
    return 'Usa solo letras, números, puntos o guiones bajos.';
  }
  return null;
}

/**
 * Simula la búsqueda de un creador (ya que es solo frontend):
 * - Si el nombre tiene palabras como "bot" o "fake", devuelve la cuenta fraudulenta.
 * - Si coincide con un creador de prueba, devuelve sus datos.
 * - Si es cualquier otro nombre, usa la plantilla base con ese @username.
 */
export function resolveCreator(username: string): Creator {
  const lower = username.toLowerCase();

  if (SUSPICIOUS_HINTS.some((hint) => lower.includes(hint))) {
    return { ...FRAUD_CREATOR, username };
  }

  const known = CREATORS.find((c) => c.username.toLowerCase() === lower);
  if (known) return known;

  return {
    ...CREATORS[0],
    username,
    name: username,
    analyzedAt: 'Ahora',
    hue: 140 + ((username.length * 7) % 40),
  };
}
