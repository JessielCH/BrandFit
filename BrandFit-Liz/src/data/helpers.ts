/**
 * Funciones utilitarias de BrandFit.
 */
import type { ArchetypeId, ScoreTone } from './types'
import { ARCHETYPES } from './constants'

export function scoreTone(score: number): ScoreTone {
  if (score >= 65) return 'success'
  if (score >= 45) return 'warning'
  return 'danger'
}

export function archetypeLabel(id: ArchetypeId): string {
  return ARCHETYPES.find((a) => a.id === id)!.label
}

export function archetypeShort(id: ArchetypeId): string {
  return ARCHETYPES.find((a) => a.id === id)!.short
}

export function engagementBonus(engagement: number): number {
  if (engagement >= 7) return 5
  if (engagement >= 5) return 3
  if (engagement >= 3) return 1
  return 0
}

/** Genera un color HSL en formato string para React Native (hex aproximado). */
export function hslToHex(h: number, s: number, l: number): string {
  s /= 100
  l /= 100
  const k = (n: number) => (n + h / 30) % 12
  const a = s * Math.min(l, 1 - l)
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
  const toHex = (x: number) => Math.round(x * 255).toString(16).padStart(2, '0')
  return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`
}

/** Devuelve los colores de un gradiente de avatar según el hue dado. */
export function avatarColors(hue: number): [string, string] {
  return [hslToHex(hue, 60, 52), hslToHex((hue + 40) % 360, 58, 40)]
}
