import { StyleSheet, Text, View } from 'react-native';
import { ShieldAlert, ShieldCheck } from 'lucide-react-native';
import { Card } from '../ui';
import { colors, fonts, radius } from '../../theme';

/** Tarjeta de veredicto: muestra "Cuenta auténtica" (verde) o "Patrón sospechoso" (rojo). */
export function VerdictCard({ authentic }: { authentic: boolean }) {
  const Icon = authentic ? ShieldCheck : ShieldAlert;
  const textColor = authentic ? colors.primaryDark : colors.dangerText;

  return (
    <Card style={[styles.card, !authentic && { borderColor: colors.dangerBorder }]}>
      <View style={[styles.badge, { backgroundColor: authentic ? colors.successBg : colors.dangerBg }]}>
        <Icon size={22} strokeWidth={1.9} color={textColor} />
        <Text style={[styles.badgeText, { color: textColor }]}>
          {authentic ? 'Cuenta auténtica' : 'Patrón sospechoso'}
        </Text>
      </View>
      <Text style={styles.description}>
        {authentic
          ? 'Seguidores y likes siguen una distribución natural.'
          : 'Anomalías en la distribución de seguidores. No recomendamos continuar.'}
      </Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { padding: 20 },
  badge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: radius.md,
  },
  badgeText: { fontFamily: fonts.semibold, fontSize: 17 },
  description: { fontFamily: fonts.regular, fontSize: 15, color: colors.muted, marginTop: 12 },
});
