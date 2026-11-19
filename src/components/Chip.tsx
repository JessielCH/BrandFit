/**
 * @file Chip.tsx
 * @description Componentes atómicos de insignias semánticas y etiquetas de estado.
 * Proporciona el componente base `Chip` y las variantes especializadas `ScoreChip` y `ToneChip`.
 *
 * @author BrandFit Team
 */

import React from 'react'
import { View, StyleSheet, type StyleProp, type ViewStyle } from 'react-native'
import { Colors, FontSize, Radius } from '../theme'
import { scoreTone } from '../data/helpers'
import type { Tone } from '../data/types'
import { AppText as Text } from './AppText'

// ─── Tipos ────────────────────────────────────────────────────────────────────

/** Tonos semánticos disponibles para el color de fondo y texto del Chip */
export type ChipTone = 'success' | 'warning' | 'danger' | 'neutral'

/**
 * Propiedades del componente Chip base.
 */
type ChipProps = {
  /** Contenido interno de la insignia */
  children: React.ReactNode
  /** Tono semántico que define los colores de fondo y texto */
  tone?: ChipTone
  /** Estilos opcionales adicionales */
  style?: StyleProp<ViewStyle>
}

// ─── Configuración de Colores Semánticos ───────────────────────────────────────

const chipColors: Record<ChipTone, { bg: string; text: string }> = {
  success: { bg: Colors.successBg, text: Colors.successText },
  warning: { bg: Colors.warningBg, text: Colors.warningText },
  danger: { bg: Colors.dangerBg, text: Colors.dangerText },
  neutral: { bg: Colors.neutralBg, text: Colors.neutralText },
}

/**
 * Insignia de estado compacta con esquinas redondeadas y colores semánticos.
 *
 * @example
 * ```tsx
 * <Chip tone="success">Auténtico</Chip>
 * ```
 */
export function Chip({ children, tone = 'neutral', style }: ChipProps) {
  const { bg, text } = chipColors[tone]
  return (
    <View style={[styles.base, { backgroundColor: bg }, style]}>
      <Text style={[styles.label, { color: text }]}>{children}</Text>
    </View>
  )
}

// ─── ScoreChip ────────────────────────────────────────────────────────────────

/**
 * Chip especializado para mostrar puntajes numéricos (0-100),
 * asignando automáticamente un color verde, amarillo o rojo según el valor.
 */
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

/**
 * Chip para mostrar el tono emocional o editorial de un video o publicación.
 */
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
