// feat: Componente Avatar circular con degradado dinámico basado en el hue del creador
// note: Utiliza react-native-svg para renderizar el gradiente y las iniciales sin dependencias adicionales

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';

interface AvatarProps {
  username: string;
  hue: number;
  size?: number;
}

export function Avatar({ username, hue, size = 40 }: AvatarProps) {
  const initials = username.slice(0, 2).toUpperCase();
  const fontSize = Math.round(size * 0.38);
  const color1 = `hsl(${hue}, 60%, 52%)`;
  const color2 = `hsl(${(hue + 40) % 360}, 58%, 40%)`;

  return (
    <View style={[styles.container, { width: size, height: size, borderRadius: size / 2 }]}>
      <Svg width={size} height={size} style={StyleSheet.absoluteFill}>
        <Defs>
          <LinearGradient id={`grad-${username}-${hue}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor={color1} />
            <Stop offset="100%" stopColor={color2} />
          </LinearGradient>
        </Defs>
        <Rect width={size} height={size} rx={size / 2} fill={`url(#grad-${username}-${hue})`} />
      </Svg>
      <Text style={[styles.initials, { fontSize }]}>{initials}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  initials: {
    color: '#FFFFFF',
    fontWeight: '700',
    textAlign: 'center',
  },
});
