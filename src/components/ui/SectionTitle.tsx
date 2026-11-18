import { StyleSheet, Text } from 'react-native';
import { colors, fonts } from '../../theme';

/** Subtítulo pequeño en mayúsculas usado sobre secciones como "ANÁLISIS RECIENTES". */
export function SectionTitle({ children }: { children: string }) {
  return <Text style={styles.title}>{children.toUpperCase()}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontFamily: fonts.semibold,
    fontSize: 13,
    letterSpacing: 0.4,
    color: colors.muted,
    marginBottom: 12,
  },
});
