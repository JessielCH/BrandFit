/**
 * EmptyState – estado vacío con ícono, título, cuerpo y acción opcional.
 * Equivalente a <EmptyState> del prototipo web.
 */
import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Colors, FontSize, Radius, Spacing } from '../theme'
import { AppText as Text } from './AppText'

type Props = {
  icon: React.ReactNode
  title: string
  body: string
  action?: React.ReactNode
}

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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing['4xl'],
    paddingBottom: Spacing['3xl'],
  },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: Radius.xl,
    backgroundColor: Colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xl,
  },
  title: {
    fontSize: FontSize.lg,
    fontWeight: '600',
    color: Colors.ink,
    textAlign: 'center',
  },
  body: {
    marginTop: 6,
    fontSize: FontSize.base,
    color: Colors.muted,
    textAlign: 'center',
    lineHeight: FontSize.base * 1.5,
  },
  actionWrap: {
    marginTop: 24,
    width: '100%',
  },
})
