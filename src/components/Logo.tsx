// style: Componente Logo de la marca BrandFit con icono de métricas estilizado
// note: Réplica exacta del isotipo de barras y tipografía del prototipo

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { colors } from '../theme/colors';

export function Logo() {
  return (
    <View style={styles.container}>
      <View style={styles.iconBox}>
        <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
          <Path d="M5 19V9" stroke="#FFFFFF" strokeWidth={2.4} strokeLinecap="round" />
          <Path d="M12 19V5" stroke="#FFFFFF" strokeWidth={2.4} strokeLinecap="round" />
          <Path d="M19 19v-7" stroke="#FFFFFF" strokeWidth={2.4} strokeLinecap="round" />
        </Svg>
      </View>
      <Text style={styles.text}>BrandFit</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconBox: {
    width: 32,
    height: 32,
    borderRadius: 9,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.ink,
    letterSpacing: -0.4,
  },
});
