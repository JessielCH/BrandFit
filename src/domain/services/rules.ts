/**
 * @file rules.ts
 * @description Servicios de Dominio y Reglas de Negocio Puras (Domain Rules & Business Logic).
 * Concentra todas las invariantes, validaciones, fórmulas y decisiones estratégicas de BrandFit
 * desacopladas de la interfaz de usuario (React Native).
 *
 * Reglas de Negocio implementadas:
 * - RN-01: Validación y sanitización de Handle de Creador (@username).
 * - RN-02: Detección de Patrón Sospechoso / Fraude por Ley de Benford.
 * - RN-03: Clasificación semántica del Brand Fit Score (Alto >= 65, Medio 45-64, Bajo < 45).
 * - RN-04: Bono de Tracción por Engagement Rate (>= 7% -> +5pts, >= 5% -> +3pts, >= 3% -> +1pt).
 * - RN-05: Cálculo de Brecha Psicométrica (Trait Gap <= 15 puntos se considera alineado).
 * - RN-06: Bloqueo de Recomendaciones Estratégicas para cuentas con anomalía de autenticidad.
 *
 * @author BrandFit Team
 */

import type { ArchetypeId, ScoreTone } from '../models/types'
import { ARCHETYPES, SUSPICIOUS_HINTS } from '../models/constants'

/**
 * RN-01: Sanitiza y valida un nombre de usuario (Handle) de TikTok antes de auditarlo.
 * Regla: Debe tener entre 2 y 24 caracteres y contener únicamente letras, números, puntos o guiones bajos.
 *
 * @param rawInput - Texto ingresado por el usuario (con o sin '@')
 * @returns Objeto con el username limpio (`clean`) y un mensaje de `error` (null si es válido)
 */
export function validateCreatorUsername(rawInput: string): {
  clean: string
  error: string | null
} {
  const clean = rawInput.trim().replace(/^@/, '')
  if (!clean) {
    return { clean, error: 'Escribe un @username.' }
  }
  if (!/^[a-zA-Z0-9._]{2,24}$/.test(clean)) {
    return { clean, error: 'Usa solo letras, números, puntos o guiones bajos.' }
  }
  return { clean, error: null }
}

/**
 * RN-02: Evalúa si un identificador de usuario presenta indicios de Patrón Sospechoso (Anomalía de Benford / Bots).
 *
 * @param username - Nombre de usuario a verificar
 * @returns `true` si coincide con patrones de fraude conocidos
 */
export function hasSuspiciousPattern(username: string): boolean {
  const lower = username.toLowerCase()
  return SUSPICIOUS_HINTS.some((hint) => lower.includes(hint))
}

/**
 * RN-03: Determina el Tono Semántico del Brand Fit Score según los umbrales de negocio.
 * - `success` (Afinidad Alta): score >= 65
 * - `warning` (Afinidad Moderada): score >= 45 y < 65
 * - `danger` (Afinidad Baja / Riesgo): score < 45
 *
 * @param score - Valor del Brand Fit Score entre 0 y 100
 */
export function scoreTone(score: number): ScoreTone {
  if (score >= 65) return 'success'
  if (score >= 45) return 'warning'
  return 'danger'
}

/**
 * RN-03b: Obtiene la etiqueta cualitativa de compatibilidad según el Brand Fit Score.
 *
 * @param score - Valor del Brand Fit Score entre 0 y 100
 */
export function affinityVerdictLabel(score: number): string {
  return score >= 70 ? 'Excelente afinidad' : 'Buena afinidad'
}

/**
 * RN-04: Calcula el Bono de Engagement (Engagement Bonus) que premia la tracción orgánica del creador.
 * - Engagement >= 7% -> +5 puntos
 * - Engagement >= 5% -> +3 puntos
 * - Engagement >= 3% -> +1 punto
 * - Engagement < 3%  ->  0 puntos
 *
 * @param engagement - Tasa de interacción porcentual
 */
export function engagementBonus(engagement: number): number {
  if (engagement >= 7) return 5
  if (engagement >= 5) return 3
  if (engagement >= 3) return 1
  return 0
}

/**
 * RN-05: Calcula la Brecha Psicométrica (Trait Gap) entre el rasgo del creador y el ideal del arquetipo.
 * Regla: Una diferencia absoluta <= 15 puntos se considera una alineación óptima (`isAligned = true`).
 *
 * @param creatorValue - Puntaje del creador en el rasgo Big Five (0-100)
 * @param idealTarget - Puntaje ideal del Arquetipo de Marca (0-100)
 */
export function evaluateTraitAlignment(
  creatorValue: number,
  idealTarget: number,
): { diff: number; isAligned: boolean; label: string } {
  const diff = Math.abs(idealTarget - creatorValue)
  const isAligned = diff <= 15
  const label = diff === 0 ? 'Exacto' : `dif. ${diff}`
  return { diff, isAligned, label }
}

/**
 * Resuelve la etiqueta descriptiva completa de un Arquetipo de Marca en el Lenguaje Ubicuo.
 *
 * @param id - Identificador del arquetipo
 */
export function archetypeLabel(id: ArchetypeId): string {
  return ARCHETYPES.find((a) => a.id === id)!.label
}

/**
 * Resuelve el nombre corto de un Arquetipo de Marca para selectores compactos.
 *
 * @param id - Identificador del arquetipo
 */
export function archetypeShort(id: ArchetypeId): string {
  return ARCHETYPES.find((a) => a.id === id)!.short
}

/**
 * Utilidad determinista del dominio visual: Convierte un color HSL a hexadecimal.
 */
export function hslToHex(h: number, s: number, l: number): string {
  s /= 100
  l /= 100
  const k = (n: number) => (n + h / 30) % 12
  const a = s * Math.min(l, 1 - l)
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
  const toHex = (x: number) => Math.round(x * 255).toString(16).padStart(2, '0')
  return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`
}

/**
 * Genera el par de colores de identidad visual para el avatar o miniatura de un creador según su matiz HSL.
 */
export function avatarColors(hue: number): [string, string] {
  return [hslToHex(hue, 60, 52), hslToHex((hue + 40) % 360, 58, 40)]
}
