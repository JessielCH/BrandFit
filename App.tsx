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
import { AppProvider } from './src/context'
import AppNavigator from './src/navigation/AppNavigator'
import { Colors } from './src/theme'

/**
 * Punto de entrada de BrandFit.
 * Carga la fuente Inter para mantener la identidad visual del prototipo original.
 * AppProvider gestiona el estado global (pantalla activa, creador, arquetipo).
 * AppNavigator renderiza la pantalla correcta según ese estado.
 */
export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  })

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
