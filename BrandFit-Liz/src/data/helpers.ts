/**
 * @deprecated Re-exporta desde la capa de Dominio para compatibilidad.
 * Los imports existentes (src/data/helpers) siguen funcionando.
 */
export {
  scoreTone,
  archetypeLabel,
  archetypeShort,
  engagementBonus,
} from '../domain/services/rules'

// hslToHex y avatarColors son utilitarios de UI — se mantienen aquí
export function hslToHex(h: number, s: number, l: number): string {
  s /= 100
  l /= 100
  const k = (n: number) => (n + h / 30) % 12
  const a = s * Math.min(l, 1 - l)
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
  const toHex = (x: number) => Math.round(x * 255).toString(16).padStart(2, '0')
  return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`
}

export function avatarColors(hue: number): [string, string] {
  return [hslToHex(hue, 60, 52), hslToHex((hue + 40) % 360, 58, 40)]
}
