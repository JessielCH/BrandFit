/**
 * Chip – etiqueta de color pequeña con variantes semánticas.
 * También exporta ScoreChip y ToneChip.
 * Equivalente a <Chip>, <ScoreChip> y <ToneChip> del prototipo web.
 */
import React from 'react'
import { View, StyleSheet, type StyleProp, type ViewStyle } from 'react-native'
import { Colors, FontSize, Radius } from '../theme'
import { scoreTone } from '../data/helpers'
import type { Tone } from '../data/types'
import { AppText as Text } from './AppText'

// ─── Tipos ────────────────────────────────────────────────────────────────────

export type ChipTone = 'success' | 'warning' | 'danger' | 'neutral'

type ChipProps = {
  children: React.ReactNode
  tone?: ChipTone
  style?: StyleProp<ViewStyle>
}

// ─── Chip base ────────────────────────────────────────────────────────────────

const chipColors: Record<ChipTone, { bg: string; text: string }> = {
  success: { bg: Colors.successBg, text: Colors.successText },
  warning: { bg: Colors.warningBg, text: Colors.warningText },
  danger: { bg: Colors.dangerBg, text: Colors.dangerText },
  neutral: { bg: Colors.neutralBg, text: Colors.neutralText },
}

export function Chip({ children, tone = 'neutral', style }: ChipProps) {
  const { bg, text } = chipColors[tone]
  return (
    <View style={[styles.base, { backgroundColor: bg }, style]}>
      <Text style={[styles.label, { color: text }]}>{children}</Text>
    </View>
  )
}

// ─── ScoreChip ────────────────────────────────────────────────────────────────

export function ScoreChip({ score }: { score: number }) {
  return (
    <Chip tone={scoreTone(score)}>
      <Text style={styles.scoreText}>{score}</Text>
    </Chip>
  )
}

// ─── ToneChip ─────────────────────────────────────────────────────────────────

const toneMap: Record<Tone, ChipTone> = {
  positivo: 'success',
  neutro: 'neutral',
  negativo: 'neutral',
}

export function ToneChip({ tone }: { tone: Tone }) {
  const label = tone.charAt(0).toUpperCase() + tone.slice(1)
  return <Chip tone={toneMap[tone]}>{label}</Chip>
}

// ─── Estilos ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderRadius: Radius.sm + 2,
    paddingHorizontal: 10,
    paddingVertical: 4,
    gap: 4,
  },
  label: {
    fontSize: FontSize.sm,
    fontWeight: '500',
  },
  scoreText: {
    fontWeight: '600',
  },
})
