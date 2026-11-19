/**
 * @file Avatar.tsx
 * @description Componente atómico de avatar con gradiente dinámico e iniciales del creador.
 * Calcula los colores de gradiente en función del valor cromático `hue` del perfil.
 *
 * @author BrandFit Team
 */

import React from 'react'
import { StyleSheet, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { avatarColors } from '../data/helpers'
import { AppText as Text } from './AppText'

/**
 * Propiedades del componente Avatar.
 */
type Props = {
  /** Nombre de usuario del creador para extraer las dos iniciales representativas */
  username: string
  /** Matiz cromático HSL (0-360) para generar la paleta del gradiente */
  hue: number
  /** Dimensión en píxeles (ancho y alto). Por defecto 40px */
  size?: number
}

/**
 * Avatar circular con gradiente lineal que muestra las dos iniciales del creador en blanco.
 *
 * @example
 * ```tsx
 * <Avatar username="alexmando15" hue={142} size={48} />
 * ```
 */
export function Avatar({ username, hue, size = 40 }: Props) {
  // docs: Extrae los dos primeros caracteres en mayúsculas como iniciales del creador
  const initials = username.slice(0, 2).toUpperCase()
  // docs: Escala el tamaño de fuente proporcionalmente al diámetro del avatar
  const fontSize = Math.round(size * 0.38)
  // docs: Obtiene los dos tonos de color generados a partir del hue
  const [colorA, colorB] = avatarColors(hue)

  return (
    <LinearGradient
      colors={[colorA, colorB]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.circle, { width: size, height: size, borderRadius: size / 2 }]}
    >
      <Text style={[styles.initials, { fontSize }]}>{initials}</Text>
    </LinearGradient>
  )
}

/**
 * Versión plana de Avatar sin gradiente, utilizada como fallback ligero.
 */
export function AvatarPlain({ username, hue, size = 40 }: Props) {
  const initials = username.slice(0, 2).toUpperCase()
  const fontSize = Math.round(size * 0.38)
  const [colorA] = avatarColors(hue)

  return (
    <View
      style={[
        styles.circle,
        { width: size, height: size, borderRadius: size / 2, backgroundColor: colorA },
      ]}
    >
      <Text style={[styles.initials, { fontSize }]}>{initials}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  initials: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
})
