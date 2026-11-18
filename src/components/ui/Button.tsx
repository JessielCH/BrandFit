import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, type StyleProp, type ViewStyle } from 'react-native';
import { colors, fonts, radius } from '../../theme';

type Variant = 'primary' | 'secondary';

type Props = {
  label: string;
  onPress?: () => void;
  variant?: Variant; // 'primary' = botón verde, 'secondary' = botón blanco con borde
  icon?: ReactNode; // Ícono opcional a la derecha del texto
  style?: StyleProp<ViewStyle>;
};

/** Botón principal o secundario reutilizable en todo el prototipo. */
export function Button({ label, onPress, variant = 'primary', icon, style }: Props) {
  const isPrimary = variant === 'primary';

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        isPrimary ? styles.primary : styles.secondary,
        pressed && (isPrimary ? styles.primaryPressed : styles.secondaryPressed),
        style,
      ]}
    >
      <Text style={[styles.label, { color: isPrimary ? colors.surface : colors.ink }]}>{label}</Text>
      {icon}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 48,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 16,
    borderRadius: radius.md,
  },
  primary: { backgroundColor: colors.primary },
  primaryPressed: { backgroundColor: colors.primaryDark },
  secondary: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line },
  secondaryPressed: { backgroundColor: colors.background },
  label: { fontFamily: fonts.semibold, fontSize: 15 },
});
