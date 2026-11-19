/**
 * @file AppNavigator.tsx
 * @description Enrutador principal de navegación de BrandFit Mobile.
 * Emplea un despachador declarativo basado en el estado `screen` del contexto global `AppContext`,
 * controlando de forma coordinada el renderizado de la pantalla activa y la visibilidad del TabBar inferior.
 *
 * @author BrandFit Team
 */

import React from 'react'
import { View, StyleSheet } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { useApp } from '../application'
import { TabBar } from '../components'
import { Colors } from '../theme'
import type { ScreenId } from '../domain'

// Pantallas modulares
import HomeScreen from '../screens/HomeScreen'
import ProgressScreen from '../screens/ProgressScreen'
import BenfordScreen from '../screens/BenfordScreen'
import ScoreScreen from '../screens/ScoreScreen'
import BigFiveScreen from '../screens/BigFiveScreen'
import RecsScreen from '../screens/RecsScreen'

/** Pantallas donde se oculta la barra de pestañas para no interferir con flujos lineales */
const HIDE_TABS: ScreenId[] = ['progress']

/**
 * Enrutador visual que provee las zonas seguras (SafeAreaProvider) y renderiza
 * la pantalla correspondiente al estado global de la aplicación.
 */
export default function AppNavigator() {
  const { screen } = useApp()

  // docs: Mapa de componentes de pantalla indexados por su identificador ScreenId
  const screens = {
    home: HomeScreen,
    progress: ProgressScreen,
    benford: BenfordScreen,
    score: ScoreScreen,
    bigfive: BigFiveScreen,
    recs: RecsScreen,
  }

  const Screen = screens[screen]
  const showTabs = !HIDE_TABS.includes(screen)

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={styles.root}
        edges={showTabs ? ['top'] : ['top', 'bottom']}
      >
        {/* Contenedor dinámico de la pantalla activa */}
        <View style={styles.content}>
          <Screen />
        </View>
        {/* Barra de pestañas inferior condicional */}
        {showTabs && <TabBar />}
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  content: {
    flex: 1,
  },
})
