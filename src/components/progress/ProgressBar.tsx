import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts, radius } from '../../theme';

/** Barra horizontal que muestra el porcentaje de avance del análisis simulado. */
export function ProgressBar({ percent }: { percent: number }) {
  return (
    <View>
      <View style={styles.row}>
        <Text style={styles.label}>Progreso</Text>
        <Text style={styles.percent}>{percent}%</Text>
      </View>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${percent}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  label: { fontFamily: fonts.regular, fontSize: 13, color: colors.muted },
  percent: { fontFamily: fonts.bold, fontSize: 15, color: colors.primary },
  track: {
    height: 8,
    marginTop: 8,
    borderRadius: radius.full,
    backgroundColor: colors.segmentBg,
    overflow: 'hidden',
  },
  fill: { height: '100%', borderRadius: radius.full, backgroundColor: colors.primary },
});
