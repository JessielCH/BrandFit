/**
 * @file typography.ts
 * @description Tokens de tipografía para BrandFit Mobile.
 * Configura los nombres de fuentes vectoriales Inter (Google Fonts) y la escala de tamaños de fuente.
 *
 * @author BrandFit Team
 */

/**
 * Nombres de familias tipográficas registradas en Expo a través de @expo-google-fonts/inter.
 */
export const FontFamily = {
  regular: 'Inter_400Regular',
  medium: 'Inter_500Medium',
  semibold: 'Inter_600SemiBold',
  bold: 'Inter_700Bold',
} as const

/**
 * Escala tipográfica en puntos/píxeles para jerarquía de títulos, cuerpos de texto y métricas.
 */
export const FontSize = {
  xs: 11,
  sm: 13,
  base: 15,
  md: 16,
  lg: 17,
  xl: 19,
  '2xl': 22,
  '3xl': 24,
  '4xl': 28,
  '5xl': 32,
  /** Tamaño gigante para el valor numérico en el tacómetro circular de Brand Fit */
  score: 72,
} as const

/** Multiplicadores de altura de línea para legibilidad de texto */
export const LineHeight = {
  tight: 1.2,
  snug: 1.35,
  normal: 1.5,
  relaxed: 1.65,
} as const
