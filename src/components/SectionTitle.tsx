/**
 * @file SectionTitle.tsx
 * @description Componente atómico de subtítulo de sección en mayúsculas (estilo overline).
 * Mantiene la jerarquía visual del prototipo y admite una acción interactiva a la derecha.
 *
 * @author BrandFit Team
 */

import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Colors, FontSize } from '../theme'
import { AppText as Text } from './AppText'

/**
 * Propiedades del componente SectionTitle.
 */
type Props = {
  /** Texto o contenido del título de la sección (se transforma a mayúsculas) */
  children: React.ReactNode
  /** Elemento opcional a la derecha (por ejemplo, un enlace o botón secundario) */
  action?: React.ReactNode
}

/**
 * Título de sección en mayúsculas con espaciado entre letras para separar bloques de contenido.
 *
 * @example
 * ```tsx
 * <SectionTitle action={<TouchableOpacity><Text>Ver todo</Text></TouchableOpacity>}>
 *   Videos Destacados
 * </SectionTitle>
 * ```
 */
export function SectionTitle({ children, action }: Props) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{String(children).toUpperCase()}</Text>
      {action ? <View>{action}</View> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  label: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.muted,
    letterSpacing: 0.6,
  },
})
