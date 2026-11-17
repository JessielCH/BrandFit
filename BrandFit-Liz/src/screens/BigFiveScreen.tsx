/**
 * BigFiveScreen – rasgos de personalidad Big Five vs. perfil ideal del arquetipo.
 * Migrado desde src/brandfit/screens/BigFive.tsx del prototipo web.
 */
import React from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useApp } from '../context'
import { IDEALS, TRAITS } from '../data/constants'
import { archetypeLabel } from '../data/helpers'
import { Button, Card, ScreenHeader } from '../components'
import { Colors, FontSize, Radius, Spacing } from '../theme'
import NoAnalysis from './NoAnalysis'

export default function BigFiveScreen() {
  const { creator, archetype, go } = useApp()
  if (!creator) return <NoAnalysis />

  const ideal = IDEALS[archetype]

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* 1. Encabezado */}
      <ScreenHeader
        title="Personalidad vs. arquetipo"
        subtitle={archetypeLabel(archetype)}
        onBack={() => go('score')}
      />

      {/* 2. Leyenda */}
      <Card style={styles.card}>
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

        {/* 3. Rasgos */}
        {TRAITS.map((trait, i) => {
          const value = creator.bigFive[i]
          const target = ideal[i]
          const diff = Math.abs(target - value)
          return (
            <View
              key={trait}
              style={[styles.traitRow, i < TRAITS.length - 1 && styles.traitBorder]}
            >
              <View style={styles.traitHeader}>
                <Text style={styles.traitName}>{trait}</Text>
                <Text style={styles.traitValues}>
                  {value} / {target} ·{' '}
                  <Text style={styles.traitDiff}>Dif. {diff}</Text>
                </Text>
              </View>

              {/* Barra de progreso con marcador ideal */}
              <View style={styles.barTrack}>
                {/* Barra del creador */}
                <View style={[styles.barFill, { width: `${value}%` }]} />
                {/* Marcador de posición ideal */}
                <View style={[styles.idealMarker, { left: `${target}%` }]} />
              </View>
            </View>
          )
        })}
      </Card>

      {/* 4. Nota */}
      <View style={styles.noteRow}>
        <Ionicons name="information-circle-outline" size={16} color={Colors.muted} />
        <Text style={styles.noteText}>
          Confianza baja: 10 videos indican tendencia, no conclusión.
        </Text>
      </View>

      {/* 5. Acción */}
      <Button onPress={() => go('recs')}>Ver recomendaciones</Button>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: Colors.bg },
  content: {
    paddingHorizontal: Spacing['2xl'],
    paddingBottom: Spacing['3xl'],
    gap: 16,
  },
  card: { overflow: 'hidden', padding: 0 },

  // Leyenda
  legend: {
    flexDirection: 'row',
    gap: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.line,
  },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendBar: { width: 16, height: 10, borderRadius: Radius.full },
  legendMarker: {
    width: 4,
    height: 14,
    borderRadius: Radius.full,
    backgroundColor: Colors.primary,
  },
  legendLabel: { fontSize: FontSize.sm, color: Colors.muted },

  // Rasgos
  traitRow: { paddingHorizontal: 16, paddingVertical: 18 },
  traitBorder: { borderBottomWidth: 1, borderBottomColor: Colors.line },
  traitHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 12,
  },
  traitName: { fontSize: FontSize.base, fontWeight: '600', color: Colors.ink },
  traitValues: { fontSize: FontSize.sm, color: Colors.muted },
  traitDiff: { fontWeight: '600', color: Colors.ink },

  // Barra
  barTrack: {
    height: 10,
    borderRadius: Radius.full,
    backgroundColor: '#F1F5F3',
    position: 'relative',
    overflow: 'visible',
  },
  barFill: {
    height: '100%',
    borderRadius: Radius.full,
    backgroundColor: Colors.successBar,
  },
  idealMarker: {
    position: 'absolute',
    top: -5,
    width: 5,
    height: 20,
    borderRadius: Radius.full,
    backgroundColor: Colors.primary,
    marginLeft: -2.5,
    borderWidth: 2,
    borderColor: Colors.white,
  },

  // Nota
  noteRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  noteText: {
    flex: 1,
    fontSize: FontSize.sm,
    color: Colors.muted,
    lineHeight: FontSize.sm * 1.5,
  },
})
