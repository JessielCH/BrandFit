// style: Paleta de colores y tokens de diseño para BrandFit Mobile
// note: Basado en los tokens visuales del prototipo de Figma y adaptado a React Native

export const colors = {
  // Fondos principales
  background: '#F8FAFC',
  card: '#FFFFFF',
  subtle: '#E7EFEB',
  inputBorder: '#E2E8F0',

  // Texto y tipografía
  ink: '#0F172A',
  textSecondary: '#334155',
  muted: '#64748B',
  placeholder: '#94A3B8',

  // Identidad primaria (Emerald / Verde BrandFit)
  primary: '#047857',
  primaryDark: '#065F46',
  primarySoft: '#ECFDF5',
  primaryLight: '#A7D7C5',
  primaryMint: '#A7F3D0',
  primaryDisabled: '#9FD3BF',

  // Estados semánticos: Éxito
  success: '#10B981',
  successSoft: '#D1FAE5',
  successText: '#065F46',

  // Estados semánticos: Alerta / Advertencia
  warning: '#F59E0B',
  warningSoft: '#FEF3C7',
  warningText: '#92400E',

  // Estados semánticos: Peligro / Fraude
  danger: '#EF4444',
  dangerSoft: '#FEE2E2',
  dangerBorder: '#FECACA',
  dangerText: '#991B1B',

  // Líneas divisorias y bordes
  line: '#E2E8F0',
  lineLight: '#F1F5F9',
} as const;

export type ColorToken = keyof typeof colors;
