/**
 * @file BigFiveScreen.tsx
 * @description Pantalla de comparación psicométrica entre el perfil de personalidad del creador
 * (modelo Big Five / OCEAN: Apertura, Responsabilidad, Extraversión, Amabilidad, Neuroticismo)
 * y el vector ideal correspondiente al arquetipo de marca seleccionado.
 *
 * @author BrandFit Team
 */

import React from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useApp } from '../context'
import { IDEALS, TRAITS } from '../data/constants'
import { archetypeLabel } from '../data/helpers'
import { Button, Card, ScreenHeader, AppText as Text } from '../components'
import { Colors, FontSize, Radius, Spacing } from '../theme'
import NoAnalysis from './NoAnalysis'

/**
 * Pantalla Big Five: Detalla el ajuste psicométrico dimensión por dimensión,
 * visualizando la barra del creador y el marcador ideal del arquetipo.
 */
export default function BigFiveScreen() {
  const { creator, archetype, go } = useApp()
  if (!creator) return <NoAnalysis />

  // docs: Vector de 5 valores numéricos que definen el ideal para el arquetipo activo
  const ideal = IDEALS[archetype]

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* 1. Encabezado de retorno hacia el Score */}
      <ScreenHeader
        title="Personalidad vs. arquetipo"
        subtitle={archetypeLabel(archetype)}
        onBack={() => go('score')}
      />

      {/* 2. Tarjeta principal con la leyenda y las barras comparativas */}
      <Card style={styles.card}>
        {/* Leyenda comparativa */}
        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendBar, { backgroundColor: Colors.successBar }]} />
            <Text style={styles.legendLabel}>Creador</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={styles.legendMarker} />
            <Text style={styles.legendLabel}>Ideal</Text>
          </View>
        </View>

        {/* 3. Desglose de cada dimensión Big Five */}
        {TRAITS.map((trait, i) => {
          const value = creator.bigFive[i]
          const target = ideal[i]
          const diff = Math.abs(target - value)
          return (
            <View
              key={trait}
              style={[styles.traitRow, i < TRAITS.length - 1 && styles.traitBorder]}
            >
              {/* Cabecera del rasgo con valores actuales y diferencia */}
              <View style={styles.traitHeader}>
                <Text style={styles.traitName}>{trait}</Text>
                <Text style={styles.traitValues}>
                  {value} / {target} ·{' '}
                  <Text style={diff <= 15 ? styles.diffGood : styles.diffFair}>
                    {diff === 0 ? 'Exacto' : `dif. ${diff}`}
                  </Text>
                </Text>
              </View>

              {/* Barra comparativa horizontal */}
              <View style={styles.barTrack}>
                {/* Barra de puntuación del creador */}
                <View
                  style={[
                    styles.barFill,
                    {
                      width: `${value}%`,
                      backgroundColor: diff <= 15 ? Colors.successBar : Colors.warningBg,
                    },
                  ]}
                />
                {/* Marcador del valor ideal del arquetipo corporativo */}
                <View style={[styles.targetMarker, { left: `${target}%` }]} />
              </View>
            </View>
          )
        })}
      </Card>

      {/* 4. Botón de navegación hacia la pantalla final de Recomendaciones */}
      <Button onPress={() => go('recs')} style={styles.nextBtn}>
        Ver recomendaciones de contenido
      </Button>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: Colors.bg },
  content: {
    paddingBottom: Spacing['3xl'],
  },
  card: {
    marginHorizontal: Spacing['2xl'],
    padding: Spacing['2xl'],
    marginBottom: Spacing.xl,
  },
  legend: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: Spacing.xl,
    paddingBottom: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.line,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendBar: {
    width: 20,
    height: 8,
    borderRadius: Radius.full,
  },
  legendMarker: {
    width: 3,
    height: 12,
    borderRadius: 2,
    backgroundColor: Colors.ink,
  },
  legendLabel: {
    fontSize: FontSize.xs,
    color: Colors.muted,
  },
  traitRow: {
    paddingVertical: 12,
  },
  traitBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.line,
  },
  traitHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  traitName: {
    fontSize: FontSize.base,
    fontWeight: '500',
    color: Colors.ink,
  },
  traitValues: {
    fontSize: FontSize.sm,
    color: Colors.muted,
  },
  diffGood: {
    color: Colors.successText,
    fontWeight: '600',
  },
  diffFair: {
    color: Colors.warningText,
    fontWeight: '600',
  },
  barTrack: {
    height: 10,
    backgroundColor: Colors.bg,
    borderRadius: Radius.full,
    position: 'relative',
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: Radius.full,
  },
  targetMarker: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 3,
    backgroundColor: Colors.ink,
    marginLeft: -1.5,
    borderRadius: 1,
  },
  nextBtn: {
    marginHorizontal: Spacing['2xl'],
  },
})
