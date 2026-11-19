/**
 * @file index.ts
 * @description Punto de entrada principal y registro de componente raíz para Expo y React Native.
 * Invoca `registerRootComponent` para vincular App con el AppRegistry nativo,
 * asegurando compatibilidad completa tanto en Expo Go como en compilaciones nativas de iOS y Android.
 *
 * @author BrandFit Team
 */

import { registerRootComponent } from 'expo'
import App from './App'

// docs: Registra el componente 'main' en AppRegistry de React Native de forma compatible con Expo
registerRootComponent(App)
