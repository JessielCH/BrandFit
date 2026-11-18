import { StyleSheet, Text, View } from 'react-native';
import { Card } from '../ui';
import type { Creator } from '../../types';
import { colors, fonts } from '../../theme';

/** Cuadrícula 2x2 con las métricas generales de la cuenta (seguidores, engagement, etc.). */
export function MetricsGrid({ creator }: { creator: Creator }) {
  const metrics = [
    { label: 'Seguidores', value: creator.followers },
    { label: 'Engagement', value: `${creator.engagement}%` },
    { label: 'Publicaciones', value: String(creator.posts) },
    { label: 'Prom. vistas', value: creator.avgViews },
  ];

  return (
    <Card style={styles.grid}>
      {metrics.map(({ label, value }, i) => (
        <View
          key={label}
          style={[
            styles.cell,
            i < 2 && styles.bottomBorder, // Borde inferior para las 2 celdas de arriba
            i % 2 === 0 && styles.rightBorder, // Borde derecho para la columna izquierda
          ]}
        >
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.value}>{value}</Text>
        </View>
      ))}
    </Card>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', overflow: 'hidden' },
  cell: { width: '50%', padding: 16 },
  bottomBorder: { borderBottomWidth: 1, borderBottomColor: colors.line },
  rightBorder: { borderRightWidth: 1, borderRightColor: colors.line },
  label: { fontFamily: fonts.regular, fontSize: 13, color: colors.muted },
  value: { fontFamily: fonts.bold, fontSize: 22, color: colors.ink, marginTop: 4 },
});
