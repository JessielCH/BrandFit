/**
 * @file Card.tsx
 * @description Contenedor atómico modular con borde redondeado y sombra sutil.
 * Utilizado a lo largo de toda la aplicación para agrupar información y métricas.
 *
 * @author BrandFit Team
 */

import React from 'react'
import { View, StyleSheet, type StyleProp, type ViewStyle } from 'react-native'
import { Colors, Radius, Shadow } from '../theme'

/**
 * Propiedades del componente Card.
 */
type Props = {
  /** Contenido interno que se renderizará dentro de la tarjeta */
  children: React.ReactNode
  /** Estilos personalizados adicionales para sobreescribir padding, márgenes o layout */
  style?: StyleProp<ViewStyle>
}

/**
 * Tarjeta contenedora base con fondo blanco, bordes definidos por tokens y sombra suave.
 *
 * @example
 * ```tsx
 * <Card style={{ padding: 16 }}>
 *   <AppText variant="bold">Métrica Clave</AppText>
 * </Card>
 * ```
 */
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
