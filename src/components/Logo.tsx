/**
 * Logo – logotipo de BrandFit con icono de barras y nombre.
 * Reemplaza el SVG del prototipo web con Views de React Native.
 */
import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Colors, FontSize, Radius } from '../theme'
import { AppText as Text } from './AppText'

export function Logo() {
  return (
    <View style={styles.row}>
      {/* Ícono: 3 barras verticales de distintas alturas */}
      <View style={styles.iconBox}>
        <View style={styles.barsRow}>
          <View style={[styles.bar, styles.barShort]} />
          <View style={[styles.bar, styles.barTall]} />
          <View style={[styles.bar, styles.barMid]} />
        </View>
      </View>
      <Text style={styles.name}>BrandFit</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconBox: {
    width: 32,
    height: 32,
    borderRadius: Radius.md - 1,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  barsRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 2,
    height: 16,
  },
  bar: {
    width: 3,
    borderRadius: 2,
    backgroundColor: '#FFFFFF',
  },
  barShort: { height: 10 },
  barTall: { height: 16 },
  barMid: { height: 7 },
  name: {
    fontSize: FontSize.xl,
    fontWeight: '600',
    color: Colors.ink,
    letterSpacing: -0.4,
  },
})
