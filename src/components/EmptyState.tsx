/**
 * EmptyState – estado vacío con ícono, título, cuerpo y acción opcional.
 */

import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Colors, FontSize, Radius, Spacing } from '../theme'
import { AppText as Text } from './AppText'

/**
 * Propiedades del componente EmptyState.
 */
type Props = {
  /** Icono o elemento gráfico central */
  icon: React.ReactNode
  /** Título principal del estado vacío */
  title: string
  /** Mensaje explicativo o instrucción para el usuario */
  body: string
  /** Botón o elemento de llamada a la acción (opcional) */
  action?: React.ReactNode
}

/**
 * Vista centrada para indicar que no hay contenido cargado o que se requiere una acción inicial.
 *
 * @example
 * ```tsx
 * <EmptyState
 *   icon={<SearchIcon />}
 *   title="No hay análisis activo"
 *   body="Busca un creador en la pantalla de inicio para comenzar."
 *   action={<Button onPress={goHome}>Ir al Inicio</Button>}
 * />
 * ```
 */
export function EmptyState({ icon, title, body, action }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrap}>{icon}</View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>{body}</Text>
      {action ? <View style={styles.actionWrap}>{action}</View> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    paddingHorizontal: Spacing['4xl'], paddingBottom: Spacing['3xl'],
  },
  iconWrap: {
    width: 56, height: 56, borderRadius: Radius.xl,
    backgroundColor: Colors.primarySoft, alignItems: 'center',
    justifyContent: 'center', marginBottom: Spacing.xl,
  },
  title: { fontSize: FontSize.lg, fontWeight: '600', color: Colors.ink, textAlign: 'center' },
  body: { marginTop: 6, fontSize: FontSize.base, color: Colors.muted, textAlign: 'center', lineHeight: FontSize.base * 1.5 },
  actionWrap: { marginTop: 24, width: '100%' },
})
