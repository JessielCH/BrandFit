/**
 * Avatar – círculo con gradiente de color e iniciales del usuario.
 * Usa expo-linear-gradient para replicar el gradiente HSL del prototipo web.
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { avatarColors } from '../data/helpers'
import { AppText as Text } from './AppText'

type Props = {
  username: string
  hue: number
  size?: number
}

export function Avatar({ username, hue, size = 40 }: Props) {
  const initials = username.slice(0, 2).toUpperCase()
  const fontSize = Math.round(size * 0.38)
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

// Versión sin gradiente como fallback (por si LinearGradient falla en algún contexto)
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
