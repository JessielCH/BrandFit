/**
 * AppText – componente de texto que aplica automáticamente la tipografía Inter.
 * Mapea fontWeight a las variantes de fuente Inter cargadas en Expo.
 */
import React from 'react'
import { Text, type TextProps, StyleSheet } from 'react-native'
import { FontFamily } from '../theme'

export interface AppTextProps extends TextProps {
  variant?: 'regular' | 'medium' | 'semibold' | 'bold'
}

export function AppText({ style, variant, ...props }: AppTextProps) {
  const flatStyle = StyleSheet.flatten(style) || {}
  let fontFamily: string = FontFamily.regular

  if (variant) {
    fontFamily = FontFamily[variant]
  } else if (flatStyle.fontWeight === '700' || flatStyle.fontWeight === 'bold') {
    fontFamily = FontFamily.bold
  } else if (flatStyle.fontWeight === '600') {
    fontFamily = FontFamily.semibold
  } else if (flatStyle.fontWeight === '500') {
    fontFamily = FontFamily.medium
  }

  return (
    <Text
      {...props}
      style={[
        { fontFamily },
        style,
      ]}
    />
  )
}
