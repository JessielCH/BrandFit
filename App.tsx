/**
 * @file App.tsx
 * @description Componente raíz de la aplicación BrandFit Mobile para Expo y Expo Go.
 * Inicializa la carga de las fuentes vectoriales Inter (Google Fonts), monta el proveedor
 * de estado global `AppProvider`, invoca el enrutador `AppNavigator` y define el estilo
 * de la barra de estado nativa (StatusBar).
 *
 * @author BrandFit Team
 */

import React from 'react'
import { ActivityIndicator, View, StyleSheet } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter'
import { AppProvider } from './src/application'
import AppNavigator from './src/navigation/AppNavigator'
import { Colors } from './src/theme'

/**
 * Componente principal de BrandFit.
 *
 * 1. Carga asíncronamente las fuentes Inter de Google Fonts (Regular, Medium, SemiBold y Bold).
 * 2. Muestra un indicador de carga central hasta que los recursos tipográficos estén disponibles.
 * 3. Envuelve la aplicación en el proveedor global AppProvider para sincronizar el estado.
 */
export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  })

  // docs: Muestra una pantalla de carga neutral mientras se completan de cargar las fuentes en memoria
  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    )
  }

  return (
    <AppProvider>
      <AppNavigator />
      <StatusBar style="dark" />
    </AppProvider>
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: Colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
