import { StyleSheet, Text, View } from 'react-native';
import { Info } from 'lucide-react-native';
import { useApp } from '../context/AppContext';
import { IDEALS, TRAITS } from '../data/archetypes';
import { Button, Card, ScreenContainer, ScreenHeader } from '../components/ui';
import { TraitBar } from '../components/bigfive/TraitBar';
import { archetypeLabel } from '../utils/analysis';
import { NoAnalysisScreen } from './NoAnalysisScreen';
import { colors, fonts, radius } from '../theme';

/** Pantalla 5 – Big Five: compara los 5 rasgos del creador frente al perfil ideal del arquetipo. */
export function BigFiveScreen() {
  const { creator, archetype, go } = useApp();
  if (!creator) return <NoAnalysisScreen />;

  const ideal = IDEALS[archetype];

  return (
    <ScreenContainer>
      {/* 1. Encabezado con botón Volver */}
      <ScreenHeader
        title="Personalidad vs. arquetipo"
        subtitle={archetypeLabel(archetype)}
        onBack={() => go('score')}
      />

      <View style={styles.body}>
        {/* 2. Tarjeta con las 5 barras de rasgos */}
        <Card style={styles.traitsCard}>
          <View style={styles.legend}>
            <View style={styles.legendItem}>
              <View style={styles.legendCreator} />
              <Text style={styles.legendText}>Creador</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={styles.legendIdeal} />
              <Text style={styles.legendText}>Ideal</Text>
            </View>
          </View>

          {TRAITS.map((trait, i) => (
            <View key={trait} style={styles.divider}>
              <TraitBar trait={trait} value={creator.bigFive[i]} target={ideal[i]} />
            </View>
          ))}
        </Card>

        {/* 3. Nota informativa */}
        <View style={styles.note}>
          <Info size={16} color={colors.muted} />
          <Text style={styles.noteText}>Confianza baja: 10 videos indican tendencia, no conclusión.</Text>
        </View>

        {/* 4. Botón para ir a las recomendaciones */}
        <Button label="Ver recomendaciones" onPress={() => go('recs')} style={styles.action} />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  body: { flex: 1, gap: 16, paddingHorizontal: 20 },
  traitsCard: { flex: 1, justifyContent: 'space-around' },
  legend: { flexDirection: 'row', gap: 16, paddingHorizontal: 16, paddingVertical: 12 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendCreator: { width: 16, height: 10, borderRadius: radius.full, backgroundColor: colors.primaryLight },
  legendIdeal: { width: 4, height: 14, borderRadius: radius.full, backgroundColor: colors.primary },
  legendText: { fontFamily: fonts.regular, fontSize: 13, color: colors.muted },
  divider: { borderTopWidth: 1, borderTopColor: colors.line },
  note: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  noteText: { flex: 1, fontFamily: fonts.regular, fontSize: 13, color: colors.muted },
  action: { marginTop: 'auto' },
});
