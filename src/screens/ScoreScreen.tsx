import { StyleSheet, Text, View } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { useApp } from '../context/AppContext';
import { Avatar, Button, Card, Chip, ScreenContainer, ScreenHeader } from '../components/ui';
import { ArchetypePicker } from '../components/score/ArchetypePicker';
import { ScoreGauge } from '../components/score/ScoreGauge';
import { archetypeLabel, engagementBonus } from '../utils/analysis';
import { NoAnalysisScreen } from './NoAnalysisScreen';
import { colors, fonts } from '../theme';

/** Pantalla 4 – Brand Fit Score: muestra el puntaje circular según el arquetipo elegido. */
export function ScoreScreen() {
  const { creator, archetype, setArchetype, go } = useApp();
  if (!creator) return <NoAnalysisScreen />;

  const score = creator.scores[archetype];
  const { engagement, tone } = creator;

  return (
    <ScreenContainer>
      {/* 1. Encabezado con avatar */}
      <ScreenHeader
        title="Brand Fit Score"
        subtitle={`@${creator.username}`}
        right={<Avatar username={creator.username} hue={creator.hue} size={36} />}
      />

      <View style={styles.body}>
        {/* 2. Selector de arquetipo de marca */}
        <ArchetypePicker value={archetype} onChange={setArchetype} />

        {/* 3. Tarjeta con el medidor circular del puntaje */}
        <Card style={styles.scoreCard}>
          <ScoreGauge score={score} />
          <Text style={styles.fitTitle}>Fit con {archetypeLabel(archetype)}</Text>
          <Text style={styles.fitCaption}>Personalidad, engagement y tono</Text>
        </Card>

        {/* 4. Chips de resumen de engagement y tono */}
        <View style={styles.chips}>
          <Chip tone="success" label={`Engagement ${engagement}% · Bono +${engagementBonus(engagement)}`} />
          <Chip label={`Tono: ${tone.pos} pos / ${tone.neu} neu / ${tone.neg} neg`} />
        </View>

        {/* 5. Botón para ir al desglose Big Five */}
        <Button
          label="Ver análisis detallado"
          icon={<ChevronRight size={18} color={colors.surface} />}
          onPress={() => go('bigfive')}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  body: { flex: 1, gap: 16, paddingHorizontal: 20 },
  scoreCard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  fitTitle: { fontFamily: fonts.semibold, fontSize: 17, color: colors.ink, marginTop: 16, textAlign: 'center' },
  fitCaption: { fontFamily: fonts.regular, fontSize: 13, color: colors.muted, marginTop: 4 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
});
