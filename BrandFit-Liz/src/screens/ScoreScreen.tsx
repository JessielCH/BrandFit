/**
 * ScoreScreen – Brand Fit Score circular + selector de arquetipo.
 * Migrado desde src/brandfit/screens/Score.tsx del prototipo web.
 * Usa react-native-svg para el gráfico de anillo.
 */
import React, { useState } from 'react'
import {
  View,
  TouchableOpacity,
  Modal,
  FlatList,
  ScrollView,
  StyleSheet,
} from 'react-native'
import Svg, { Circle } from 'react-native-svg'
import { Ionicons } from '@expo/vector-icons'
import { useApp } from '../context'
import { ARCHETYPES } from '../data/constants'
import { archetypeLabel, engagementBonus } from '../data/helpers'
import { Avatar, Button, Card, Chip, ScreenHeader, AppText as Text } from '../components'
import { Colors, FontSize, Radius, Spacing } from '../theme'
import NoAnalysis from './NoAnalysis'

const R = 84
const C = 2 * Math.PI * R

export default function ScoreScreen() {
  const { creator, archetype, setArchetype, go } = useApp()
  const [dropdownOpen, setDropdownOpen] = useState(false)

  if (!creator) return <NoAnalysis />

  const score = creator.scores[archetype]
  const label = archetypeLabel(archetype)
  const strokeDashoffset = C * (1 - score / 100)

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* 1. Encabezado */}
      <ScreenHeader
        title="Brand Fit Score"
        subtitle={`@${creator.username}`}
        right={<Avatar username={creator.username} hue={creator.hue} size={36} />}
      />

      {/* 2. Selector de arquetipo */}
      <TouchableOpacity
        style={styles.selector}
        onPress={() => setDropdownOpen(true)}
        activeOpacity={0.75}
      >
        <Text style={styles.selectorText}>{label}</Text>
        <Ionicons name="chevron-down" size={20} color={Colors.muted} />
      </TouchableOpacity>

      {/* Modal dropdown */}
      <Modal
        visible={dropdownOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setDropdownOpen(false)}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setDropdownOpen(false)}
        >
          <View style={styles.dropdown}>
            <FlatList
              data={ARCHETYPES}
              keyExtractor={(a) => a.id}
              renderItem={({ item: a }) => (
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => { setArchetype(a.id); setDropdownOpen(false) }}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.dropdownLabel,
                      a.id === archetype && styles.dropdownLabelActive,
                    ]}
                  >
                    {a.label}
                  </Text>
                  {a.id === archetype && (
                    <Ionicons name="checkmark" size={16} color={Colors.primary} />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>

      {/* 3. Score circular */}
      <Card style={styles.scoreCard}>
        <View style={styles.svgWrap}>
          {/* SVG ring */}
          <Svg width={230} height={230} viewBox="0 0 200 200"
            style={{ transform: [{ rotate: '-90deg' }] }}>
            {/* Fondo del anillo */}
            <Circle cx={100} cy={100} r={R} fill="none" stroke={Colors.primarySoft} strokeWidth={14} />
            {/* Progreso */}
            <Circle
              cx={100}
              cy={100}
              r={R}
              fill="none"
              stroke={Colors.primary}
              strokeWidth={14}
              strokeLinecap="round"
              strokeDasharray={`${C} ${C}`}
              strokeDashoffset={strokeDashoffset}
            />
          </Svg>

          {/* Número superpuesto */}
          <View style={styles.scoreOverlay}>
            <Text style={styles.scoreNumber}>{score}</Text>
            <Text style={styles.scoreOf}>de 100</Text>
          </View>
        </View>

        <Text style={styles.scoreFit}>Fit con {label}</Text>
        <Text style={styles.scoreCaption}>Personalidad, engagement y tono</Text>
      </Card>

      {/* 4. Chips de resumen */}
      <View style={styles.chips}>
        <Chip tone="success">
          Engagement {creator.engagement}% · Bono +{engagementBonus(creator.engagement)}
        </Chip>
        <Chip>
          Tono: {creator.tone.pos} pos / {creator.tone.neu} neu / {creator.tone.neg} neg
        </Chip>
      </View>

      {/* 5. Acción */}
      <Button onPress={() => go('bigfive')}>
        Ver análisis detallado →
      </Button>
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

  // Selector
  selector: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.line,
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
  },
  selectorText: { fontSize: FontSize.base, fontWeight: '600', color: Colors.ink },

  // Overlay / dropdown
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    padding: 24,
  },
  dropdown: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.line,
    overflow: 'hidden',
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  dropdownLabel: { fontSize: FontSize.base, color: Colors.ink },
  dropdownLabelActive: { fontWeight: '600', color: Colors.primary },

  // Score card
  scoreCard: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 20,
    gap: 12,
  },
  svgWrap: {
    width: 230,
    height: 230,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreOverlay: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreNumber: {
    fontSize: 72,
    fontWeight: '700',
    color: Colors.primary,
    lineHeight: 80,
    letterSpacing: -2,
  },
  scoreOf: { fontSize: FontSize.sm, color: Colors.muted },
  scoreFit: { fontSize: FontSize.lg, fontWeight: '600', color: Colors.ink },
  scoreCaption: { fontSize: FontSize.sm, color: Colors.muted },

  // Chips
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
})
