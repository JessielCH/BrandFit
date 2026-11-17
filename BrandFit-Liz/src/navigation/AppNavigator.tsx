/**
 * Router principal de BrandFit.
 * Usa un stack interno manejado por AppContext (sin react-navigation stack)
 * para replicar fielmente el flujo de pantallas del prototipo web.
 */
import React from 'react'
import { View, StyleSheet } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { useApp } from '../context'
import { TabBar } from '../components'
import { Colors } from '../theme'
import type { ScreenId } from '../data/types'

// Pantallas
import HomeScreen from '../screens/HomeScreen'
import ProgressScreen from '../screens/ProgressScreen'
import BenfordScreen from '../screens/BenfordScreen'
import ScoreScreen from '../screens/ScoreScreen'
import BigFiveScreen from '../screens/BigFiveScreen'
import RecsScreen from '../screens/RecsScreen'

/** Pantallas donde NO se muestra el TabBar */
const HIDE_TABS: ScreenId[] = ['progress']

export default function AppNavigator() {
  const { screen } = useApp()

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
      <SafeAreaView style={styles.root} edges={['top']}>
        <View style={styles.content}>
          <Screen />
        </View>
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
