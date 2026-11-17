/**
 * Router principal de BrandFit.
 * Usa un stack interno manejado por AppContext (sin react-navigation stack)
 * para replicar fielmente el flujo de pantallas del prototipo web.
 */
import React from 'react'
import { View, StyleSheet } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useApp } from '../context'
import { Colors } from '../theme'

// Pantallas – se importan aquí para que el router las renderice según el estado
import HomeScreen from '../screens/HomeScreen'
import ProgressScreen from '../screens/ProgressScreen'
import BenfordScreen from '../screens/BenfordScreen'
import ScoreScreen from '../screens/ScoreScreen'
import BigFiveScreen from '../screens/BigFiveScreen'
import RecsScreen from '../screens/RecsScreen'

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

  return (
    <SafeAreaProvider>
      <View style={styles.root}>
        <Screen />
      </View>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
})
