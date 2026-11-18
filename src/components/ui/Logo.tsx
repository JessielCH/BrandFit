import { StyleSheet, Text, View } from 'react-native';
import { ChartNoAxesColumn } from 'lucide-react-native';
import { colors, fonts } from '../../theme';

/** Logo de BrandFit: ícono de barras sobre cuadro verde + nombre de la app. */
export function Logo() {
  return (
    <View style={styles.row}>
      <View style={styles.badge}>
        <ChartNoAxesColumn size={18} strokeWidth={2.2} color={colors.surface} />
      </View>
      <Text style={styles.name}>BrandFit</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  badge: {
    width: 32,
    height: 32,
    borderRadius: 9,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: { fontFamily: fonts.semibold, fontSize: 19, letterSpacing: -0.4, color: colors.ink },
});
