/**
 * Paleta de colores tomada directamente del prototipo de Figma.
 * Centralizar los colores aquí permite usarlos en toda la app sin repetir códigos hex.
 */
export const colors = {
  // Fondos y textos principales
  background: '#F8FAFC',
  surface: '#FFFFFF',
  ink: '#0F172A',
  muted: '#64748B',
  placeholder: '#94A3B8',
  line: '#E2E8F0',

  // Verde principal de la marca (BrandFit)
  primary: '#047857',
  primaryDark: '#065F46',
  primarySoft: '#ECFDF5',
  primaryLight: '#A7F3D0',
  primaryBorder: '#A7D7C5',
  primaryDeep: '#064E3B',

  // Fondos neutros para barras y controles
  segmentBg: '#E7EFEB',
  trackBg: '#F1F5F3',
  slate100: '#F1F5F9',
  slate700: '#334155',

  // Colores de estado (éxito, alerta y peligro/fraude)
  success: '#10B981',
  successBg: '#D1FAE5',
  warningBg: '#FEF3C7',
  warningText: '#92400E',
  danger: '#EF4444',
  dangerBg: '#FEE2E2',
  dangerSoft: '#FEF2F2',
  dangerBorder: '#FECACA',
  dangerText: '#991B1B',
  dangerStrong: '#B91C1C',
} as const;
