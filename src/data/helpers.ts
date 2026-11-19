/**
 * @file helpers.ts
 * @description Funciones auxiliares y utilitarias para el cálculo de afinidad, conversión de colores y formateo.
 *
 * @author BrandFit Team
 */

import type { ArchetypeId, ScoreTone } from './types'
import { ARCHETYPES } from './constants'

/**
 * Determina el tono semántico (éxito, advertencia o peligro) según el puntaje de Brand Fit.
 *
 * @param score - Valor numérico entre 0 y 100
 * @returns 'success' si score >= 65, 'warning' si score >= 45, o 'danger' si es menor
 */
export function scoreTone(score: number): ScoreTone {
  if (score >= 65) return 'success'
  if (score >= 45) return 'warning'
  return 'danger'
}

/**
 * Obtiene la etiqueta descriptiva completa de un arquetipo de marca.
 *
 * @param id - Identificador del arquetipo
 */
export function archetypeLabel(id: ArchetypeId): string {
  return ARCHETYPES.find((a) => a.id === id)!.label
}

/**
 * Obtiene el nombre corto de un arquetipo de marca para selectores y botones.
 *
 * @param id - Identificador del arquetipo
 */
export function archetypeShort(id: ArchetypeId): string {
  return ARCHETYPES.find((a) => a.id === id)!.short
}

/**
 * Calcula un bono numérico adicional en el puntaje según la tasa de engagement.
 *
 * @param engagement - Porcentaje de interacción
 */
export function engagementBonus(engagement: number): number {
  if (engagement >= 7) return 5
  if (engagement >= 5) return 3
  if (engagement >= 3) return 1
  return 0
}

/**
 * Convierte un color en espacio HSL a su representación hexadecimal estándar compatible con React Native.
 *
 * @param h - Matiz (Hue) en grados (0 a 360)
 * @param s - Saturación en porcentaje (0 a 100)
 * @param l - Luminosidad en porcentaje (0 a 100)
 * @returns Cadena hexadecimal de color (e.g. '#22c55e')
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
 * Genera el par de colores de inicio y fin para el gradiente del avatar de un creador,
 * derivado de su valor de matiz HSL.
 *
 * @param hue - Matiz cromático base del perfil
 * @returns Tupla con dos códigos hexadecimales [colorInicio, colorFin]
 */
export function avatarColors(hue: number): [string, string] {
  return [hslToHex(hue, 60, 52), hslToHex((hue + 40) % 360, 58, 40)]
}
