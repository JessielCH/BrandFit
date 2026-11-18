/**
 * @file spacing.ts
 * @description Tokens de espaciado, radios de curvatura (border-radius) y elevaciones (sombras)
 * para garantizar consistencia métrica en todas las vistas móviles.
 *
 * @author BrandFit Team
 */

/** Escala métrica de espaciados interiores y exteriores (padding y margin) en píxeles */
export const Spacing = {
  xs: 2,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 20,
  '3xl': 24,
  '4xl': 32,
} as const

/** Escala de radios de borde para esquinas redondeadas en componentes y contenedores */
export const Radius = {
  sm: 6,
  md: 10,
  lg: 12,
  xl: 14,
  full: 9999,
} as const

/** Definiciones de sombras compatibles con iOS (Shadow*) y Android (elevation) */
export const Shadow = {
  /** Sombra sutil para tarjetas y contenedores de datos */
  card: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  /** Sombra prominente para modales, menús flotantes y selectores */
  dropdown: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
} as const
