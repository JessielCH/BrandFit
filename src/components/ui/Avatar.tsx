import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { hslToHex } from '../../theme/tokens';

interface AvatarProps {
  username: string;
  hue: number;
  size?: number;
}

export function Avatar({ username, hue, size = 40 }: AvatarProps) {
  const bg = hslToHex(hue, 58, 44);
  const initials = (username || 'BF').replace(/^@/, '').slice(0, 2).toUpperCase();

  return (
    <View
      style={[
        styles.avatar,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: bg,
        },
      ]}
    >
      <Text style={[styles.initials, { fontSize: Math.round(size * 0.38) }]}>
        {initials}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    color: '#FFFFFF',
    fontWeight: '700',
    letterSpacing: -0.3,
  },
});
