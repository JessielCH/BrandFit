import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { colors, fonts } from '../../theme';

type Props = {
  title: string;
  subtitle?: string;
  onBack?: () => void; // Si se pasa, muestra el botón "Volver" arriba del título
  right?: ReactNode; // Elemento opcional a la derecha (por ejemplo, el Avatar)
};

/** Encabezado superior de las pantallas de resultados. */
export function ScreenHeader({ title, subtitle, onBack, right }: Props) {
  return (
    <View style={styles.container}>
      {onBack && (
        <Pressable onPress={onBack} style={styles.back}>
          <ChevronLeft size={20} strokeWidth={1.75} color={colors.muted} />
          <Text style={styles.backText}>Volver</Text>
        </Pressable>
      )}
      <View style={styles.row}>
        <View style={styles.texts}>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
        {right}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 16 },
  back: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 4,
    height: 36,
    marginLeft: -8,
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  backText: { fontFamily: fonts.medium, fontSize: 15, color: colors.muted },
  row: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 },
  texts: { flex: 1 },
  title: { fontFamily: fonts.semibold, fontSize: 24, lineHeight: 30, color: colors.ink },
  subtitle: { fontFamily: fonts.regular, fontSize: 15, color: colors.muted, marginTop: 4 },
});
