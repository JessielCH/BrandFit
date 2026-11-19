/**
 * Card – contenedor con borde, esquinas redondeadas y sombra sutil.
 * Equivalente al <Card> del prototipo web.
 */
import React from 'react'
import { View, StyleSheet, Platform, type StyleProp, type ViewStyle } from 'react-native'
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
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.line,
    ...Shadow.card,
    ...Platform.select({
      ios: {
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
})
