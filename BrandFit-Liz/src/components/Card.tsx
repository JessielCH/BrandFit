/**
 * Card – contenedor con borde, esquinas redondeadas y sombra sutil.
 * Equivalente al <Card> del prototipo web.
 */
import React from 'react'
import { View, StyleSheet, type StyleProp, type ViewStyle } from 'react-native'
import { Colors, Radius, Shadow } from '../theme'

type Props = {
  children: React.ReactNode
  style?: StyleProp<ViewStyle>
}

export function Card({ children, style }: Props) {
  return <View style={[styles.card, style]}>{children}</View>
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.line,
    ...Shadow.card,
  },
})
