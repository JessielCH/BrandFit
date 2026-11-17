/**
 * Button – botón con tres variantes: primary, secondary y ghost.
 * Equivalente al <Button> del prototipo web.
 */
import React from 'react'
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  type StyleProp,
  type ViewStyle,
} from 'react-native'
import { Colors, FontSize, Radius } from '../theme'

type Variant = 'primary' | 'secondary' | 'ghost'

type Props = {
  children: React.ReactNode
  onPress?: () => void
  variant?: Variant
  disabled?: boolean
  loading?: boolean
  style?: StyleProp<ViewStyle>
}

export function Button({
  children,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
}: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.75}
      style={[
        styles.base,
        variant === 'primary' && styles.primary,
        variant === 'secondary' && styles.secondary,
        variant === 'ghost' && styles.ghost,
        (disabled || loading) && variant === 'primary' && styles.primaryDisabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? Colors.white : Colors.primary} />
      ) : (
        <Text
          style={[
            styles.label,
            variant === 'primary' && styles.labelPrimary,
            variant === 'secondary' && styles.labelSecondary,
            variant === 'ghost' && styles.labelGhost,
          ]}
        >
          {children}
        </Text>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  base: {
    height: 48,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
    width: '100%',
  },
  primary: {
    backgroundColor: Colors.primary,
  },
  primaryDisabled: {
    backgroundColor: Colors.primaryDisabled,
  },
  secondary: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.line,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  label: {
    fontSize: FontSize.base,
    fontWeight: '600',
  },
  labelPrimary: {
    color: Colors.white,
  },
  labelSecondary: {
    color: Colors.ink,
  },
  labelGhost: {
    color: Colors.primary,
  },
})
