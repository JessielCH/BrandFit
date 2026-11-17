import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useBrandFit } from '../context/BrandFitContext';
import {
  archetypeLabel,
  IDEALS,
  TRAIT_HINTS,
  TRAITS,
} from '../data/creators';
import { InfoIcon } from '../components/icons/BrandFitIcons';
import { Button, Card, ScreenHeader } from '../components/ui';
import { palette } from '../theme/tokens';
import { NoAnalysisScreen } from './NoAnalysisScreen';

export function BigFiveScreen() {
  const { creator, archetype, go } = useBrandFit();

  if (!creator) {
    return <NoAnalysisScreen />;
  }

  const idealProfile = IDEALS[archetype];

  return (
    <ScrollView
      style={styles.flex}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* 1. Encabezado */}
      <ScreenHeader
        title="Personalidad vs. arquetipo"
        subtitle={archetypeLabel(archetype)}
        onBack={() => go('score')}
      />

      <View style={styles.body}>
        {/* 2. Desglose de los 5 rasgos */}
        <Card style={styles.traitsCard}>
          <View style={styles.legendHeader}>
            <View style={styles.legendItem}>
              <View style={styles.creatorSwatch} />
              <Text style={styles.legendText}>Creador</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={styles.idealSwatch} />
              <Text style={styles.legendText}>Ideal</Text>
            </View>
          </View>

          {TRAITS.map((trait, index) => {
            const observed = creator.bigFive[index] ?? 0;
            const target = idealProfile[index] ?? 0;
            const diff = Math.abs(target - observed);

            return (
              <View key={trait} style={styles.traitRow}>
                <View style={styles.traitTopRow}>
                  <Text style={styles.traitName}>{trait}</Text>
                  <Text style={styles.traitMetrics}>
                    {observed} / {target} ·{' '}
                    <Text style={styles.traitDiffBold}>Dif. {diff}</Text>
                  </Text>
                </View>

                <Text style={styles.traitHint}>{TRAIT_HINTS[trait]}</Text>

                <View style={styles.trackContainer}>
                  <View style={styles.trackBg}>
                    <View
                      style={[styles.trackFill, { width: `${observed}%` }]}
                    />
                  </View>
                  <View
                    style={[
                      styles.idealMarker,
                      { left: `${target}%` },
                    ]}
                  />
                </View>
              </View>
            );
          })}
        </Card>

        {/* 3. Nota metodológica */}
        <View style={styles.noteRow}>
          <InfoIcon size={16} color={palette.muted} />
          <Text style={styles.noteText}>
            Confianza baja: 10 videos indican tendencia, no conclusión.
          </Text>
        </View>

        {/* 4. Acción */}
        <Button onPress={() => go('recs')} style={styles.ctaButton}>
          Ver recomendaciones
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  body: {
    flex: 1,
    paddingHorizontal: 20,
    gap: 16,
  },
  traitsCard: {
    overflow: 'hidden',
  },
  legendHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: palette.line,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  creatorSwatch: {
    width: 16,
    height: 10,
    borderRadius: 999,
    backgroundColor: palette.primaryMint,
  },
  idealSwatch: {
    width: 4,
    height: 14,
    borderRadius: 999,
    backgroundColor: palette.primary,
  },
  legendText: {
    fontSize: 13,
    color: palette.muted,
  },
  traitRow: {
    paddingHorizontal: 16,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: palette.line,
  },
  traitTopRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  traitName: {
    fontSize: 15,
    fontWeight: '700',
    color: palette.ink,
  },
  traitMetrics: {
    fontSize: 13,
    color: palette.muted,
    fontVariant: ['tabular-nums'],
  },
  traitDiffBold: {
    fontWeight: '700',
    color: palette.ink,
  },
  traitHint: {
    marginTop: 2,
    fontSize: 12,
    color: palette.muted,
  },
  trackContainer: {
    marginTop: 12,
    height: 20,
    justifyContent: 'center',
    position: 'relative',
  },
  trackBg: {
    height: 10,
    borderRadius: 999,
    backgroundColor: palette.surfaceSubtle,
    overflow: 'hidden',
  },
  trackFill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: palette.primaryMint,
  },
  idealMarker: {
    position: 'absolute',
    top: 0,
    width: 6,
    height: 20,
    marginLeft: -3,
    borderRadius: 999,
    backgroundColor: palette.primary,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  noteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  noteText: {
    flex: 1,
    fontSize: 13,
    color: palette.muted,
    lineHeight: 18,
  },
  ctaButton: {
    marginTop: 'auto',
  },
});
