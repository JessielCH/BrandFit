import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Check } from 'lucide-react-native';
import { colors, fonts, radius } from '../../theme';

// Estados posibles de cada paso en la pantalla de carga
export type StepState = 'done' | 'active' | 'pending';

type Props = {
  index: number;
  label: string;
  state: StepState;
};

/** Fila de un paso del análisis: muestra un check, un spinner o el número del paso. */
export function AnalysisStep({ index, label, state }: Props) {
  return (
    <View style={styles.row}>
      <View style={[styles.circle, circleStyles[state]]}>
        {state === 'done' && <Check size={16} strokeWidth={2.5} color={colors.surface} />}
        {state === 'active' && <ActivityIndicator size="small" color={colors.primary} />}
        {state === 'pending' && <Text style={styles.number}>{index + 1}</Text>}
      </View>
      <Text style={[styles.label, labelStyles[state]]}>{label}</Text>
    </View>
  );
}

/** Línea vertical que une un paso con el siguiente (se pinta verde al completarse). */
export function StepConnector({ done }: { done: boolean }) {
  return <View style={[styles.connector, { backgroundColor: done ? colors.success : colors.line }]} />;
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  circle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  number: { fontFamily: fonts.semibold, fontSize: 13, color: colors.placeholder },
  label: { flex: 1, fontSize: 15 },
  connector: {
    flex: 1,
    minHeight: 20,
    width: 2,
    marginLeft: 15,
    marginVertical: 4,
    borderRadius: radius.full,
  },
});

const circleStyles = StyleSheet.create({
  done: { borderColor: colors.success, backgroundColor: colors.success },
  active: { borderColor: colors.primary, backgroundColor: colors.primarySoft },
  pending: { borderColor: colors.line, backgroundColor: colors.surface },
});

const labelStyles = StyleSheet.create({
  done: { fontFamily: fonts.medium, color: colors.ink },
  active: { fontFamily: fonts.semibold, color: colors.ink },
  pending: { fontFamily: fonts.regular, color: colors.muted },
});
