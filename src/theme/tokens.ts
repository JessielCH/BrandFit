export const palette = {
  background: '#F8FAFC',
  surface: '#FFFFFF',
  surfaceSubtle: '#F1F5F3',
  segmentedBg: '#E7EFEB',
  ink: '#0F172A',
  inkSecondary: '#334155',
  muted: '#64748B',
  placeholder: '#94A3B8',
  line: '#E2E8F0',
  primary: '#047857',
  primaryDark: '#065F46',
  primaryDeep: '#064E3B',
  primarySoft: '#ECFDF5',
  primaryMint: '#A7F3D0',
  primaryBorder: '#A7D7C5',
  primaryDisabled: '#9FD3BF',
  success: '#10B981',
  successSoft: '#D1FAE5',
  successText: '#065F46',
  warning: '#F59E0B',
  warningSoft: '#FEF3C7',
  warningText: '#92400E',
  danger: '#EF4444',
  dangerSoft: '#FEE2E2',
  dangerSurface: '#FEF2F2',
  dangerBorder: '#FECACA',
  dangerText: '#991B1B',
  dangerDark: '#B91C1C',
} as const;

export const radii = {
  sm: 8,
  md: 10,
  lg: 12,
  xl: 16,
  xxl: 24,
  full: 9999,
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
} as const;

/**
 * Converts an HSL color tuple to a hexadecimal color string for React Native styles.
 */
export function hslToHex(h: number, s: number, l: number): string {
  const normH = ((h % 360) + 360) % 360;
  const normS = Math.max(0, Math.min(100, s)) / 100;
  const normL = Math.max(0, Math.min(100, l)) / 100;

  const a = normS * Math.min(normL, 1 - normL);
  const channel = (n: number) => {
    const k = (n + normH / 30) % 12;
    const color = normL - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0');
  };

  return `#${channel(0)}${channel(8)}${channel(4)}`;
}
