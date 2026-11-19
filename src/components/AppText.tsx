/**
 * @file AppText.tsx
 * @description Componente atómico de tipografía para BrandFit Mobile.
 * Mapea de forma transparente los pesos de fuente (fontWeight) o la propiedad
 * `variant` a las fuentes vectoriales Inter (Google Fonts) cargadas en Expo.
 *
 * @author BrandFit Team
 */

import React from 'react'
import { Text, type TextProps, StyleSheet } from 'react-native'
import { FontFamily } from '../theme'

/**
 * Propiedades del componente AppText.
 * Extiende las propiedades estándar de Text de React Native.
 */
export interface AppTextProps extends TextProps {
  /**
   * Variante tipográfica explícita que determina el peso de la fuente Inter.
   * Si no se especifica, se infiere del `style.fontWeight`.
   */
  variant?: 'regular' | 'medium' | 'semibold' | 'bold'
}

/**
 * Componente de texto tipográfico con soporte automático para la familia de fuentes Inter.
 *
 * @example
 * ```tsx
 * <AppText variant="bold" style={{ fontSize: 18, color: Colors.text }}>
 *   Título Principal
 * </AppText>
 * ```
 */
export function AppText({ style, variant, ...props }: AppTextProps) {
  // docs: Aplana los estilos para inspeccionar de manera segura el fontWeight definido
  const flatStyle = StyleSheet.flatten(style) || {}
  let fontFamily: string = FontFamily.regular

  // docs: Resolución de peso de fuente prioritario (prop variant > style.fontWeight)
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
