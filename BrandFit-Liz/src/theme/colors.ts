/**
 * Design tokens de BrandFit – paleta de colores y estilos base.
 * Equivalente al bloque @theme de index.css del prototipo web.
 */
export const Colors = {
  // Fondos
  bg: '#F8FAFC',
  bgAlt: '#EEF4F1',
  white: '#FFFFFF',

  // Tipografía
  ink: '#0F172A',
  muted: '#64748B',
  placeholder: '#94A3B8',

  // Separadores
  line: '#E2E8F0',

  // Primario (verde)
  primary: '#047857',
  primaryDark: '#065F46',
  primarySoft: '#ECFDF5',
  primaryDisabled: '#9FD3BF',

  // Semánticos
  success: '#10B981',
  successBg: '#D1FAE5',
  successText: '#065F46',
  successBar: '#A7F3D0',

  warning: '#F59E0B',
  warningBg: '#FEF3C7',
  warningText: '#92400E',

  danger: '#EF4444',
  dangerBg: '#FEE2E2',
  dangerText: '#991B1B',
  dangerBorder: '#FECACA',

  // Neutro (chip)
  neutralBg: '#F1F5F9',
  neutralText: '#334155',
} as const

export type ColorKey = keyof typeof Colors
