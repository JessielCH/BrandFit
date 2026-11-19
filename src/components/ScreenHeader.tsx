/**
 * ScreenHeader – encabezado de pantalla con título, subtítulo,
 * botón de retroceso y elemento derecho opcional.
 * Equivalente a <ScreenHeader> del prototipo web.
 */
import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Colors, FontSize, Spacing } from '../theme'
import { AppText as Text } from './AppText'

type Props = {
  title: string
  subtitle?: string
  onBack?: () => void
  right?: React.ReactNode
}

export function ScreenHeader({ title, subtitle, onBack, right }: Props) {
  return (
    <View style={styles.wrapper}>
      {onBack && (
        <TouchableOpacity onPress={onBack} style={styles.backBtn} activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={20} color={Colors.muted} />
          <Text style={styles.backLabel}>Volver</Text>
        </TouchableOpacity>
      )}
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
