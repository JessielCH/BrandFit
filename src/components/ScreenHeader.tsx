/**
 * @file ScreenHeader.tsx
 * @description Componente molecular de cabecera de pantalla unificada.
 * Incluye botón opcional de retroceso, título principal en gran escala, subtítulo descriptivo
 * y ranura derecha personalizable (usada comúnmente para insignias o acciones rápidas).
 *
 * @author BrandFit Team
 */

import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Colors, FontSize, Spacing } from '../theme'
import { AppText as Text } from './AppText'

/**
 * Propiedades del componente ScreenHeader.
 */
type Props = {
  /** Título principal de la vista */
  title: string
  /** Subtítulo contextual o descripción corta (opcional) */
  subtitle?: string
  /** Callback para la navegación de regreso; si se omite, no se renderiza el botón de retroceso */
  onBack?: () => void
  /** Nodo de React opcional para ubicar en el extremo derecho de la cabecera */
  right?: React.ReactNode
}

/**
 * Cabecera estándar para todas las pantallas del flujo móvil de BrandFit.
 *
 * @example
 * ```tsx
 * <ScreenHeader
 *   title="Brand Fit Score"
 *   subtitle="Evaluación de afinidad con arquetipos"
 *   onBack={() => go('benford')}
 *   right={<ScoreChip score={85} />}
 * />
 * ```
 */
export function ScreenHeader({ title, subtitle, onBack, right }: Props) {
  return (
    <View style={styles.wrapper}>
      {/* docs: Botón de retorno opcional con chevron e indicador textual */}
      {onBack && (
        <TouchableOpacity onPress={onBack} style={styles.backBtn} activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={20} color={Colors.muted} />
          <Text style={styles.backLabel}>Volver</Text>
        </TouchableOpacity>
      )}
      {/* docs: Fila principal con título, subtítulo y contenido auxiliar a la derecha */}
      <View style={styles.row}>
        <View style={styles.titleWrap}>
          <Text style={styles.title}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
        {right ? <View>{right}</View> : null}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: Spacing['2xl'],
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xl,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -Spacing.md,
    marginBottom: Spacing.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    gap: 2,
    alignSelf: 'flex-start',
  },
  backLabel: {
    fontSize: FontSize.base,
    fontWeight: '500',
    color: Colors.muted,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
  },
  titleWrap: {
    flex: 1,
  },
  title: {
    fontSize: FontSize['4xl'],
    fontWeight: '600',
    color: Colors.ink,
    letterSpacing: -0.3,
    lineHeight: FontSize['4xl'] * 1.2,
  },
  subtitle: {
    marginTop: 4,
    fontSize: FontSize.base,
    color: Colors.muted,
  },
})
