import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { AppProvider } from './src/context'
import AppNavigator from './src/navigation/AppNavigator'

/**
 * Punto de entrada de BrandFit.
 * AppProvider gestiona el estado global (pantalla activa, creador, arquetipo).
 * AppNavigator renderiza la pantalla correcta según ese estado.
 */
export default function App() {
  return (
    <AppProvider>
      <AppNavigator />
      <StatusBar style="dark" />
    </AppProvider>
  )
}
