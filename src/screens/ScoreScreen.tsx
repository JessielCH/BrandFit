/**
 * @file ScoreScreen.tsx
 * @description Pantalla del indicador Brand Fit Score con tacómetro circular en SVG y selector de arquetipo.
 * Calcula y proyecta la afinidad general (0 a 100) entre la personalidad del creador
 * y la identidad de marca seleccionada por el usuario corporativo.
 *
 * @author BrandFit Team
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
import { useApp } from '../application'
import { ARCHETYPES, archetypeLabel, engagementBonus, affinityVerdictLabel } from '../domain'
import { Avatar, Button, Card, Chip, ScreenHeader, AppText as Text } from '../components'
import { Colors, FontSize, Radius, Spacing } from '../theme'
import NoAnalysis from './NoAnalysis'

/** Radio del arco de circunferencia del tacómetro circular */
const R = 84
/** Perímetro de la circunferencia para el cálculo del strokeDashoffset */
const C = 2 * Math.PI * R

/**
 * Pantalla de Score: Presenta el tacómetro circular SVG, las métricas complementarias
 * de seguidores y engagement, y permite alternar dinámicamente el arquetipo de marca.
 */
export default function ScoreScreen() {
  const { creator, archetype, setArchetype, go } = useApp()
  // docs: Estado de visibilidad del modal para seleccionar otro arquetipo de marca
  const [dropdownOpen, setDropdownOpen] = useState(false)

  if (!creator) return <NoAnalysis />

  const score = creator.scores[archetype]
  const label = archetypeLabel(archetype)
  // docs: Cálculo de desplazamiento del trazo SVG proporcional al puntaje obtenido (0-100)
  const strokeDashoffset = C * (1 - score / 100)

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* 1. Encabezado de pantalla con avatar del creador */}
      <ScreenHeader
        title="Brand Fit Score"
        subtitle={`@${creator.username}`}
        right={<Avatar username={creator.username} hue={creator.hue} size={36} />}
      />

      {/* 2. Selector de Arquetipo de Marca interactivo */}
      <TouchableOpacity
        style={styles.selector}
        onPress={() => setDropdownOpen(true)}
        activeOpacity={0.75}
      >
        <Text style={styles.selectorText} numberOfLines={1}>
          {label}
        </Text>
        <Ionicons name="chevron-down" size={20} color={Colors.muted} />
      </TouchableOpacity>

      {/* docs: Modal desplegable con la lista de arquetipos disponibles */}
      <Modal visible={dropdownOpen} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setDropdownOpen(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecciona un arquetipo</Text>
            <FlatList
              data={ARCHETYPES}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.option,
                    item.id === archetype && styles.optionActive,
                  ]}
                  onPress={() => {
                    setArchetype(item.id)
                    setDropdownOpen(false)
                  }}
                >
                  <Text
                    style={[
                      styles.optionText,
                      item.id === archetype && styles.optionTextActive,
                    ]}
                  >
                    {item.label}
                  </Text>
                  {item.id === archetype && (
                    <Ionicons name="checkmark" size={18} color={Colors.primary} />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>

      {/* 3. Tacómetro Circular SVG de Puntaje */}
      <Card style={styles.gaugeCard}>
        <View style={styles.svgWrap}>
          <Svg width={200} height={200}>
            {/* Círculo de fondo tenue */}
            <Circle
              cx={100}
              cy={100}
              r={R}
              stroke={Colors.line}
              strokeWidth={14}
              fill="none"
            />
            {/* Círculo de progreso en verde esmeralda BrandFit */}
            <Circle
              cx={100}
              cy={100}
              r={R}
              stroke={Colors.primary}
              strokeWidth={14}
              strokeDasharray={C}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="none"
              transform="rotate(-90 100 100)"
            />
          </Svg>
          {/* Valor numérico y etiqueta en el centro del tacómetro */}
          <View style={styles.scoreCenter}>
            <Text style={styles.scoreNum}>{score}</Text>
            <Text style={styles.scoreMax}>/ 100</Text>
          </View>
        </View>

        {/* Insignia cualitativa de compatibilidad (Regla de Dominio RN-03b) */}
        <Chip tone="success" style={styles.fitChip}>
          {affinityVerdictLabel(score)}
        </Chip>

        {/* 4. Resumen de Métricas Clave */}
        <View style={styles.metricsRow}>
          <View style={styles.metricItem}>
            <Text style={styles.metricVal}>{creator.followers}</Text>
            <Text style={styles.metricLabel}>Seguidores</Text>
          </View>
          <View style={styles.metricDivider} />
          <View style={styles.metricItem}>
            <Text style={styles.metricVal}>{creator.engagement}%</Text>
            <Text style={styles.metricLabel}>Engagement</Text>
          </View>
          <View style={styles.metricDivider} />
          <View style={styles.metricItem}>
            <Text style={styles.metricVal}>+{engagementBonus(creator.engagement)} pts</Text>
            <Text style={styles.metricLabel}>Bono</Text>
          </View>
        </View>
      </Card>

      {/* 5. Acciones de Navegación hacia Big Five y Recomendaciones */}
      <View style={styles.actions}>
        <Button onPress={() => go('bigfive')}>
          Ver desglose Big Five
        </Button>
        <Button variant="secondary" onPress={() => go('recs')}>
          Ver recomendaciones
        </Button>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: Colors.bg },
  content: {
    paddingBottom: Spacing['3xl'],
  },
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.line,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.xl,
    paddingVertical: 14,
    marginHorizontal: Spacing['2xl'],
    marginBottom: Spacing.xl,
  },
  selectorText: {
    flex: 1,
    fontSize: FontSize.md,
    fontWeight: '500',
    color: Colors.ink,
    marginRight: Spacing.sm,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
    padding: Spacing['2xl'],
    maxHeight: '60%',
  },
  modalTitle: {
    fontSize: FontSize.lg,
    fontWeight: '600',
    color: Colors.ink,
    marginBottom: Spacing.xl,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: Spacing.md,
    borderRadius: Radius.sm,
  },
  optionActive: {
    backgroundColor: Colors.primarySoft,
  },
  optionText: {
    fontSize: FontSize.base,
    color: Colors.ink,
  },
  optionTextActive: {
    color: Colors.primary,
    fontWeight: '600',
  },
  gaugeCard: {
    marginHorizontal: Spacing['2xl'],
    padding: Spacing['3xl'],
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  svgWrap: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: Spacing.xl,
  },
  scoreCenter: {
    position: 'absolute',
    alignItems: 'center',
  },
  scoreNum: {
    fontSize: FontSize.score,
    fontWeight: '700',
    color: Colors.ink,
    lineHeight: FontSize.score,
    letterSpacing: -2,
  },
  scoreMax: {
    fontSize: FontSize.base,
    color: Colors.muted,
    marginTop: -4,
  },
  fitChip: {
    marginBottom: Spacing['2xl'],
  },
  metricsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingTop: Spacing.xl,
    borderTopWidth: 1,
    borderTopColor: Colors.line,
  },
  metricItem: {
    flex: 1,
    alignItems: 'center',
  },
  metricVal: {
    fontSize: FontSize.lg,
    fontWeight: '600',
    color: Colors.ink,
  },
  metricLabel: {
    fontSize: FontSize.xs,
    color: Colors.muted,
    marginTop: 2,
  },
  metricDivider: {
    width: 1,
    height: 32,
    backgroundColor: Colors.line,
  },
  actions: {
    marginHorizontal: Spacing['2xl'],
    gap: Spacing.md,
  },
})
