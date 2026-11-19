/**
 * @file Button.tsx
 * @description Componente atómico de botón interactivo para BrandFit Mobile.
 * Ofrece tres variantes de diseño (primary, secondary, ghost) con soporte
 * para estados deshabilitado y de carga (spinner de ActivityIndicator).
 *
 * @author BrandFit Team
 */

import React from 'react'
import {
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  type StyleProp,
  type ViewStyle,
} from 'react-native'
import { Colors, FontSize, Radius } from '../theme'
import { AppText as Text } from './AppText'

/** Variantes visuales disponibles para el botón */
type Variant = 'primary' | 'secondary' | 'ghost'

/**
 * Propiedades del componente Button.
 */
type Props = {
  /** Contenido o texto que se muestra en el interior del botón */
  children: React.ReactNode
  /** Manejador del evento presionar */
  onPress?: () => void
  /** Variante visual de color y borde: primary (verde esmeralda), secondary (blanco con borde), ghost (transparente) */
  variant?: Variant
  /** Indica si la interacción está deshabilitada */
  disabled?: boolean
  /** Indica si se debe mostrar un indicador de carga en lugar del contenido */
  loading?: boolean
  /** Sobreescritura de estilos para el contenedor del botón */
  style?: StyleProp<ViewStyle>
}

/**
 * Botón accesible y modular con retroalimentación visual al tacto.
 *
 * @example
 * ```tsx
 * <Button variant="primary" onPress={handleAnalyze} loading={isLoading}>
 *   Analizar Creador
 * </Button>
 * ```
 */
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
    minHeight: 48,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignSelf: 'stretch',
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
