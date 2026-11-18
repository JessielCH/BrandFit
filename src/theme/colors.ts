/**
 * @file colors.ts
 * @description Tokens de color y paleta cromática de BrandFit Mobile.
 * Define colores primarios de marca, escalas de grises y estados semánticos
 * (éxito, advertencia, peligro y neutro) coherentes con el diseño de Figma.
 *
 * @author BrandFit Team
 */

/**
 * Paleta de colores centralizada para componentes y pantallas de la aplicación.
 */
export const Colors = {
  // docs: Superficies y fondos generales
  bg: '#F8FAFC',
  bgAlt: '#EEF4F1',
  white: '#FFFFFF',

  // docs: Jerarquía tipográfica y textos
  ink: '#0F172A',
  muted: '#64748B',
  placeholder: '#94A3B8',

  // docs: Separadores, bordes y líneas sutiles
  line: '#E2E8F0',

  // docs: Color primario institucional (Verde esmeralda BrandFit)
  primary: '#047857',
  primaryDark: '#065F46',
  primarySoft: '#ECFDF5',
  primaryDisabled: '#9FD3BF',

  // docs: Estados semánticos de éxito (verde)
  success: '#10B981',
  successBg: '#D1FAE5',
  successText: '#065F46',
  successBar: '#A7F3D0',

  // docs: Estados semánticos de advertencia (ámbar)
  warning: '#F59E0B',
  warningBg: '#FEF3C7',
  warningText: '#92400E',

  // docs: Estados semánticos de peligro / alerta (rojo)
  danger: '#EF4444',
  dangerBg: '#FEE2E2',
  dangerText: '#991B1B',
  dangerBorder: '#FECACA',

  // docs: Etiquetas e insignias neutras (gris pizarra)
  neutralBg: '#F1F5F9',
  neutralText: '#334155',
} as const

/** Tipo de clave para acceder a las propiedades de color de BrandFit */
export type ColorKey = keyof typeof Colors
