import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts, radius } from '../../theme';

type Props = {
  trait: string;
  value: number; // Puntaje del creador (0–100)
  target: number; // Puntaje ideal del arquetipo (0–100)
};

/** Barra de un rasgo Big Five: muestra el valor del creador y una marca en el valor ideal. */
export function TraitBar({ trait, value, target }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.trait}>{trait}</Text>
        <Text style={styles.values}>
          {value} / {target} · <Text style={styles.diff}>Dif. {Math.abs(target - value)}</Text>
        </Text>
      </View>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${value}%` }]} />
        <View style={[styles.marker, { left: `${target}%` }]} />
      </View>
    </View>
  );
}

const MARKER_WIDTH = 5;

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16, paddingVertical: 18 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  trait: { fontFamily: fonts.semibold, fontSize: 15, color: colors.ink },
  values: { fontFamily: fonts.regular, fontSize: 13, color: colors.muted },
  diff: { fontFamily: fonts.semibold, color: colors.ink },
  track: { height: 10, marginTop: 12, borderRadius: radius.full, backgroundColor: colors.trackBg },
  fill: { height: '100%', borderRadius: radius.full, backgroundColor: colors.primaryLight },
  marker: {
    position: 'absolute',
    top: -5,
    width: MARKER_WIDTH,
    height: 20,
    marginLeft: -MARKER_WIDTH / 2,
    borderRadius: radius.full,
    borderWidth: 2,
    borderColor: colors.surface,
    backgroundColor: colors.primary,
  },
});
