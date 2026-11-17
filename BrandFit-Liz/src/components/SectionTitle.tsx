/**
 * SectionTitle – encabezado de sección en mayúsculas pequeñas.
 * Equivalente a <SectionTitle> del prototipo web.
 */
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Colors, FontSize } from '../theme'

type Props = {
  children: React.ReactNode
  action?: React.ReactNode
}

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
