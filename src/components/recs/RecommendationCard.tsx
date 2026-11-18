import { StyleSheet, Text, View } from 'react-native';
import { Lightbulb } from 'lucide-react-native';
import { Card } from '../ui';
import { colors, fonts, radius } from '../../theme';

type Props = {
  format: string;
  recommendation: string;
};

/**
 * Tarjeta amplia de Formato sugerido y recomendación:
 * ocupa el espacio inferior de la pantalla de recomendaciones en un solo bloque claro.
 */
export function RecommendationCard({ format, recommendation }: Props) {
  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <View style={styles.iconBox}>
          <Lightbulb size={22} strokeWidth={1.9} color={colors.primary} />
        </View>
        <Text style={styles.title}>Formato sugerido</Text>
      </View>

      <Text style={styles.formatText}>{format}</Text>

      <View style={styles.recBox}>
        <Text style={styles.recLabel}>RECOMENDACIÓN</Text>
        <Text style={styles.recText}>{recommendation}</Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
    gap: 14,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: radius.md,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: fonts.semibold,
    fontSize: 18,
    color: colors.ink,
  },
  formatText: {
    fontFamily: fonts.regular,
    fontSize: 15,
    lineHeight: 23,
    color: colors.slate700,
  },
  recBox: {
    padding: 16,
    borderRadius: radius.md,
    backgroundColor: colors.primarySoft,
    borderWidth: 1,
    borderColor: colors.primaryLight,
  },
  recLabel: {
    fontFamily: fonts.semibold,
    fontSize: 12,
    letterSpacing: 0.5,
    color: colors.primary,
  },
  recText: {
    fontFamily: fonts.medium,
    fontSize: 15,
    lineHeight: 22,
    color: colors.primaryDeep,
    marginTop: 6,
  },
});
