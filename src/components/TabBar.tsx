/**
 * TabBar – barra de navegación inferior con 3 pestañas.
 * Usa @expo/vector-icons (Ionicons) incluido en Expo.
 * Equivalente a <TabBar> del prototipo web.
 */
import React from 'react'
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useApp } from '../context'
import { Colors, FontSize } from '../theme'
import type { ScreenId } from '../data/types'
import { AppText as Text } from './AppText'

// ─── Definición de tabs ───────────────────────────────────────────────────────

type TabDef = {
  id: string
  label: string
  iconActive: keyof typeof Ionicons.glyphMap
  iconInactive: keyof typeof Ionicons.glyphMap
  screens: ScreenId[]
  target: ScreenId
}

const TABS: TabDef[] = [
  {
    id: 'inicio',
    label: 'Inicio',
    iconActive: 'home',
    iconInactive: 'home-outline',
    screens: ['home'],
    target: 'home',
  },
  {
    id: 'analisis',
    label: 'Análisis',
    iconActive: 'bar-chart',
    iconInactive: 'bar-chart-outline',
    screens: ['progress', 'benford', 'score', 'bigfive'],
    target: 'score',
  },
  {
    id: 'recs',
    label: 'Recomendaciones',
    iconActive: 'bulb',
    iconInactive: 'bulb-outline',
    screens: ['recs'],
    target: 'recs',
  },
]

// ─── Componente ───────────────────────────────────────────────────────────────

export function TabBar() {
  const { screen, go } = useApp()
  const insets = useSafeAreaInsets()

  return (
    <View
      style={[
        styles.container,
        { paddingBottom: Math.max(insets.bottom, 8) },
      ]}
    >
      {TABS.map((tab) => {
        const active = tab.screens.includes(screen)
        return (
          <TouchableOpacity
            key={tab.id}
            onPress={() => go(tab.target)}
            style={styles.tab}
            activeOpacity={0.7}
          >
            <Ionicons
              name={active ? tab.iconActive : tab.iconInactive}
              size={22}
              color={active ? Colors.primary : Colors.muted}
            />
            <Text style={[styles.label, active && styles.labelActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

// ─── Estilos ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.97)',
    borderTopWidth: 1,
    borderTopColor: Colors.line,
    paddingTop: 8,
    paddingHorizontal: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: { elevation: 8 },
    }),
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
    paddingVertical: 4,
    borderRadius: 8,
  },
  label: {
    fontSize: FontSize.xs,
    fontWeight: '500',
    color: Colors.muted,
  },
  labelActive: {
    color: Colors.primary,
  },
})
