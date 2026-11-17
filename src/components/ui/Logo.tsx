import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BrandBarsIcon } from '../icons/BrandFitIcons';
import { palette } from '../../theme/tokens';

export function Logo() {
  return (
    <View style={styles.row}>
      <View style={styles.badge}>
        <BrandBarsIcon size={18} color="#FFFFFF" />
      </View>
      <Text style={styles.brandText}>BrandFit</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  badge: {
    width: 32,
    height: 32,
    borderRadius: 9,
    backgroundColor: palette.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandText: {
    fontSize: 19,
    fontWeight: '700',
    letterSpacing: -0.4,
    color: palette.ink,
  },
});
