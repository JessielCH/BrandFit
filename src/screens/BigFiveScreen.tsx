// feat: Pantalla de desglose del modelo Big Five (OCEAN) comparando al creador con el perfil ideal del arquetipo
// docs: Grafica los 5 rasgos de personalidad con barras de progreso y marcadores de target

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useApp } from '../context/AppContext';
import { archetypeLabel, IDEALS, TRAITS } from '../data/mockData';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { ScreenHeader } from '../components/ScreenHeader';
import { Info } from '../components/Icons';
import { NoAnalysisScreen } from './NoAnalysisScreen';
import { colors } from '../theme/colors';

export function BigFiveScreen() {
  const { creator, archetype, go } = useApp();

  if (!creator) {
    return <NoAnalysisScreen />;
  }

  const idealProfile = IDEALS[archetype];

  return (
    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      {/* 1. Encabezado con retorno a Score */}
      <ScreenHeader
        title="Personalidad vs. arquetipo"
        subtitle={archetypeLabel(archetype)}
        onBack={() => go('score')}
      />

      <View style={styles.body}>
        {/* 2. Tarjeta con Desglose de los 5 Rasgos */}
        <Card style={styles.traitsCard}>
          {/* Leyenda comparativa */}
          <View style={styles.legendContainer}>
            <View style={styles.legendItem}>
              <View style={[styles.legendPill, { backgroundColor: colors.primaryMint }]} />
              <Text style={styles.legendLabel}>Creador</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendMarker, { backgroundColor: colors.primary }]} />
              <Text style={styles.legendLabel}>Ideal</Text>
            </View>
          </View>

          {/* Lista de Rasgos Big Five */}
          <View style={styles.traitsList}>
            {TRAITS.map((trait, index) => {
              const creatorValue = creator.bigFive[index] ?? 50;
              const targetValue = idealProfile[index] ?? 50;
              const diff = Math.abs(targetValue - creatorValue);

              return (
                <View key={trait} style={styles.traitItem}>
                  {/* Encabezado del rasgo con valores y diferencia */}
                  <View style={styles.traitHeaderRow}>
                    <Text style={styles.traitName}>{trait}</Text>
                    <Text style={styles.traitValues}>
                      {creatorValue} / {targetValue} ·{' '}
                      <Text style={styles.traitDiffText}>Dif. {diff}</Text>
                    </Text>
                  </View>

                  {/* Pista y barras de comparativa */}
                  <View style={styles.track}>
                    {/* Barra de valor del Creador */}
                    <View
                      style={[
                        styles.creatorBar,
                        {
                          width: `${Math.min(100, Math.max(0, creatorValue))}%`,
                          backgroundColor: colors.primaryMint,
                        },
                      ]}
                    />

                    {/* Marcador del Perfil Ideal */}
                    <View
                      style={[
                        styles.targetMarker,
                        {
                          left: `${Math.min(100, Math.max(0, targetValue))}%`,
                          backgroundColor: colors.primary,
                        },
                      ]}
                    />
                  </View>
                </View>
              );
            })}
          </View>
        </Card>

        {/* 3. Nota metodológica de confianza */}
        <View style={styles.noteContainer}>
          <Info size={16} color={colors.muted} />
          <Text style={styles.noteText}>
            Confianza baja: 10 videos indican tendencia, no conclusión.
          </Text>
        </View>

        {/* 4. Acción hacia Recomendaciones */}
        <Button onPress={() => go('recs')} style={styles.actionButton}>
          Ver recomendaciones
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 28,
  },
  body: {
    paddingHorizontal: 20,
    gap: 16,
  },
  traitsCard: {
    padding: 18,
  },
  legendContainer: {
    flexDirection: 'row',
    gap: 16,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendPill: {
    width: 16,
    height: 10,
    borderRadius: 5,
  },
  legendMarker: {
    width: 4,
    height: 14,
    borderRadius: 2,
  },
  legendLabel: {
    fontSize: 13,
    color: colors.muted,
    fontWeight: '500',
  },
  traitsList: {
    paddingTop: 12,
    gap: 18,
  },
  traitItem: {
    gap: 10,
  },
  traitHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  traitName: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.ink,
  },
  traitValues: {
    fontSize: 13,
    color: colors.muted,
  },
  traitDiffText: {
    fontWeight: '700',
    color: colors.ink,
  },
  track: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#F1F5F3',
    position: 'relative',
    justifyContent: 'center',
  },
  creatorBar: {
    height: 10,
    borderRadius: 5,
  },
  targetMarker: {
    position: 'absolute',
    width: 6,
    height: 20,
    borderRadius: 3,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    marginLeft: -3,
    shadowColor: '#047857',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  noteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 4,
  },
  noteText: {
    fontSize: 13,
    color: colors.muted,
    flex: 1,
    lineHeight: 18,
  },
  actionButton: {
    marginTop: 8,
  },
});
