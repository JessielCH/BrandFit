/**
 * Tokens tipográficos de BrandFit.
 * React Native usa fontFamily por nombre de fuente registrada.
 * Para usar Inter se recomienda expo-font + useFonts().
 * Por compatibilidad inmediata usamos la fuente del sistema.
 */
export const FontFamily = {
  regular: undefined,   // sistema
  medium: undefined,
  semibold: undefined,
  bold: undefined,
} as const

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
  score: 72,
} as const

export const LineHeight = {
  tight: 1.2,
  snug: 1.35,
  normal: 1.5,
  relaxed: 1.65,
} as const
