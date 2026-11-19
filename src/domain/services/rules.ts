/**
 * @layer Domain – Services (Reglas de Negocio puras RN-01 a RN-06)
 *
 * ✅ Este archivo NO importa React Native ni ninguna librería de UI.
 * Es 100% TypeScript puro, testeable de forma aislada.
 *
 * Lenguaje Ubicuo:
 *   validateCreatorUsername → RN-01: Formato y sanitización de @username
 *   hasSuspiciousPattern    → RN-02: Detección de anomalía / bots (Ley de Benford)
 *   scoreTone               → RN-03a: Semáforo del Brand Fit Score
 *   affinityVerdictLabel    → RN-03b: Veredicto de afinidad textual
 *   engagementBonus         → RN-04: Bono de Tracción por Engagement Rate
 *   evaluateTraitAlignment  → RN-05: Tolerancia de Brecha Psicométrica (Big Five Trait Gap)
 *   canShowRecommendations  → RN-06: Bloqueo de recomendaciones por falta de autenticidad
 *   archetypeLabel          → Utilitario: nombre completo de un arquetipo
 */

import type { ArchetypeId, ScoreTone } from '../models/types'
import { ARCHETYPES, SUSPICIOUS_HINTS } from '../models/constants'

// ─── RN-01 · Formato y Sanitización de Handle (@username) ────────────────────

/**
 * RN-01: Valida y sanitiza un @username de TikTok.
 * - Elimina espacios y el prefijo "@".
 * - Debe tener entre 2 y 24 caracteres alfanuméricos, puntos o guiones bajos.
 */
export function validateCreatorUsername(rawInput: string): {
  valid: boolean
  clean: string
  error?: string
} {
  const clean = rawInput.trim().replace(/^@/, '')
  if (!clean) return { valid: false, clean, error: 'Escribe un @username.' }
  const USERNAME_REGEX = /^[a-zA-Z0-9._]{2,24}$/
  if (!USERNAME_REGEX.test(clean)) {
    return { valid: false, clean, error: 'Usa solo letras, números, puntos o guiones bajos.' }
  }
  return { valid: true, clean }
}

// ─── RN-02 · Detección de Anomalía / Bots (Ley de Benford) ───────────────────

/**
 * RN-02: Detecta si un username tiene indicios de cuenta fraudulenta o granja de bots.
 * En la simulación se detecta por palabras clave en el handle (SUSPICIOUS_HINTS).
 */
export function hasSuspiciousPattern(username: string): boolean {
  const lower = username.toLowerCase()
  return SUSPICIOUS_HINTS.some((hint) => lower.includes(hint))
}

// ─── RN-03 · Semáforo del Brand Fit Score ────────────────────────────────────

/**
 * RN-03a: Clasifica el Brand Fit Score en un nivel semántico de tres estados.
 * - score ≥ 65 → 'success' (verde)
 * - score ≥ 45 → 'warning' (ámbar)
 * - score <  45 → 'danger'  (rojo)
 */
export function scoreTone(score: number): ScoreTone {
  if (score >= 65) return 'success'
  if (score >= 45) return 'warning'
  return 'danger'
}

/**
 * RN-03b: Emite el Veredicto de Afinidad textual basado en el Brand Fit Score.
 * - score ≥ 70 → "Excelente afinidad"
 * - score <  70 → "Buena afinidad"
 */
export function affinityVerdictLabel(score: number): string {
  return score >= 70 ? 'Excelente afinidad' : 'Buena afinidad'
}

// ─── RN-04 · Bono de Tracción por Engagement Rate ────────────────────────────

/**
 * RN-04: Calcula el Bono de Tracción por tasa de engagement.
 * - engagement ≥ 7% → +5 pts
 * - engagement ≥ 5% → +3 pts
 * - engagement ≥ 3% → +1 pt
 * - engagement <  3% → 0 pts
 * @param engagement Porcentaje de engagement (e.g. 7.81 = 7.81%)
 */
export function engagementBonus(engagement: number): number {
  if (engagement >= 7) return 5
  if (engagement >= 5) return 3
  if (engagement >= 3) return 1
  return 0
}

// ─── RN-05 · Tolerancia de Brecha Psicométrica (Big Five OCEAN Trait Gap) ─────

/**
 * RN-05: Evalúa si un rasgo Big Five del creador está alineado con el ideal del arquetipo.
 * Umbral de tolerancia: diff ≤ 15 puntos = alineado.
 * @param creatorValue Puntuación del rasgo en el creador (0-100)
 * @param idealTarget  Puntuación ideal del rasgo para el arquetipo (0-100)
 */
export function evaluateTraitAlignment(
  creatorValue: number,
  idealTarget: number,
): { diff: number; isAligned: boolean } {
  const diff = Math.abs(idealTarget - creatorValue)
  return { diff, isAligned: diff <= 15 }
}

// ─── RN-06 · Bloqueo de Recomendaciones por Falta de Autenticidad ─────────────

/**
 * RN-06: Verifica si se pueden emitir recomendaciones de contenido.
 * Se bloquea si creator.authentic === false.
 */
export function canShowRecommendations(authentic: boolean): boolean {
  return authentic
}

// ─── Utilitarios del Dominio ──────────────────────────────────────────────────

export function archetypeLabel(id: ArchetypeId): string {
  return ARCHETYPES.find((a) => a.id === id)!.label
}

export function archetypeShort(id: ArchetypeId): string {
  return ARCHETYPES.find((a) => a.id === id)!.short
}
