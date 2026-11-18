/**
 * @file TabBar.tsx
 * @description Barra de navegación inferior (Bottom Navigation) de tres pestañas principales:
 * Inicio, Análisis y Recomendaciones.
 * Utiliza iconos vectoriales de Ionicons (@expo/vector-icons) y respeta las zonas seguras del dispositivo (safe area insets).
 *
 * @author BrandFit Team
 */

import React from 'react'
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useApp } from '../context'
import { Colors, FontSize } from '../theme'
import type { ScreenId } from '../data/types'
import { AppText as Text } from './AppText'

// ─── Definición de pestañas ───────────────────────────────────────────────────

/**
 * Estructura de definición para cada pestaña del menú inferior.
 */
type TabDef = {
  /** Identificador único de la pestaña */
  id: string
  /** Texto mostrado debajo del icono */
  label: string
  /** Nombre del icono de Ionicons cuando la pestaña está activa */
  iconActive: keyof typeof Ionicons.glyphMap
  /** Nombre del icono de Ionicons cuando la pestaña está inactiva */
  iconInactive: keyof typeof Ionicons.glyphMap
  /** Conjunto de pantallas que activan visualmente esta pestaña */
  screens: ScreenId[]
  /** Pantalla de destino al pulsar la pestaña */
  target: ScreenId
}

/** Configuración de las 3 pestañas principales de la navegación */
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

/**
 * Componente de barra de navegación inferior fijada en el fondo de la pantalla.
 *
 * @example
 * ```tsx
 * <TabBar />
 * ```
 */
export function TabBar() {
  const { screen, go } = useApp()
  // docs: Obtiene los márgenes seguros para evitar solapamientos con la barra de gestos en iOS y Android
  const insets = useSafeAreaInsets()

  return (
    <View
      style={[
        styles.container,
        { paddingBottom: Math.max(insets.bottom, 8) },
      ]}
    >
      {TABS.map((tab) => {
        // docs: Verifica si la pantalla activa actual pertenece al grupo de esta pestaña
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
