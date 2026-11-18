import { StyleSheet, Text, View } from 'react-native';
import { Card } from '../ui';
import { BENFORD_EXPECTED } from '../../data/analysis';
import { colors, fonts } from '../../theme';

// Porcentaje máximo del eje vertical para escalar la altura de las barras
const MAX_PERCENT = 35;
const CHART_HEIGHT = 170;

type Props = {
  observed: number[];
  confidence: number;
  authentic: boolean;
};

/** Gráfico de barras comparando la distribución esperada (Ley de Benford) vs. la observada. */
export function BenfordChart({ observed, confidence, authentic }: Props) {
  const observedColor = authentic ? colors.primary : colors.danger;
  const toHeight = (value: number) => (value / MAX_PERCENT) * CHART_HEIGHT;

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Ley de Benford</Text>
        <Text style={styles.confidence}>Confianza {confidence}%</Text>
      </View>

      <View style={styles.legend}>
        <LegendItem color={colors.primaryLight} label="Esperada" />
        <LegendItem color={observedColor} label="Observada" />
      </View>

      <View style={styles.chart}>
        {BENFORD_EXPECTED.map((expected, i) => (
          <View key={i} style={styles.group}>
            <View style={[styles.bar, { height: toHeight(expected), backgroundColor: colors.primaryLight }]} />
            <View style={[styles.bar, { height: toHeight(observed[i]), backgroundColor: observedColor }]} />
          </View>
        ))}
      </View>

      <View style={styles.axis}>
        {BENFORD_EXPECTED.map((_, i) => (
          <Text key={i} style={styles.axisLabel}>
            {i + 1}
          </Text>
        ))}
      </View>
      <Text style={styles.caption}>Primer dígito de seguidores y likes</Text>
    </Card>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <View style={styles.legendItem}>
      <View style={[styles.legendDot, { backgroundColor: color }]} />
      <Text style={styles.legendText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  title: { fontFamily: fonts.semibold, fontSize: 15, color: colors.ink },
  confidence: { fontFamily: fonts.semibold, fontSize: 13, color: colors.ink },
  legend: { flexDirection: 'row', gap: 16, marginTop: 8 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot: { width: 10, height: 10, borderRadius: 2 },
  legendText: { fontFamily: fonts.regular, fontSize: 13, color: colors.muted },
  chart: {
    height: CHART_HEIGHT,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 6,
    marginTop: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  group: { flex: 1, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center', gap: 3 },
  bar: { flex: 1, maxWidth: 12, borderTopLeftRadius: 3, borderTopRightRadius: 3 },
  axis: { flexDirection: 'row', gap: 6, marginTop: 6 },
  axisLabel: { flex: 1, textAlign: 'center', fontFamily: fonts.regular, fontSize: 12, color: colors.muted },
  caption: {
    textAlign: 'center',
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.muted,
    marginTop: 4,
  },
});
