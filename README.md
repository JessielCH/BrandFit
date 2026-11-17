# BrandFit

> Herramienta para marcas que quieren colaborar con creadores de contenido sin adivinar.

[![Estado](https://img.shields.io/badge/Estado-Prototipo%20M%C3%B3vil%20Expo-047857)](https://github.com/JessielCH/BrandFit)
[![Expo SDK](https://img.shields.io/badge/Expo%20SDK-58-000020)](https://expo.dev)
[![Licencia](https://img.shields.io/badge/Licencia-MIT-blue.svg)](LICENSE)

---

## Acerca de BrandFit

BrandFit es una plataforma orientada a optimizar la toma de decisiones en colaboraciones entre marcas y creadores de contenido, sustituyendo la intuición por análisis objetivo. Combina tres ideas en un solo flujo continuo:

1. **Verificación de autenticidad con la ley de Benford:** Análisis estadístico de frecuencias numéricas en interacciones para detectar anomalías, cuentas automatizadas y patrones artificiales.
2. **Fit de marca:** Comparación entre el perfil de personalidad del creador (modelo *Big Five*) y el arquetipo de la marca para evaluar la coherencia de imagen y valores.
3. **Recomendación de contenido:** Identificación de formatos y temáticas con mayor tracción en la audiencia real para orientar las campañas tanto en **Modo Marca** como en **Modo Creador**.

---

## Estado del Proyecto

> **Estado:** Prototipo móvil funcional en React Native + Expo.

El prototipo extraído de Figma ha sido migrado íntegramente a una arquitectura nativa modular compatible con **Expo Go** (SDK 58 y React 19).

---

## Arquitectura del Proyecto Móvil

```text
BrandFit/
├── App.tsx                             # Shell de navegación, barra inferior y modal inspector de frames
├── app.json                            # Configuración de Expo (SDK 58)
├── index.js                            # Punto de entrada de React Native
└── src/
    ├── components/
    │   ├── icons/BrandFitIcons.tsx     # Iconografía vectorial nativa con react-native-svg
    │   └── ui/                         # Sistema de diseño: Card, Button, Chip, Avatar, ScoreRing, BottomTabBar
    ├── context/BrandFitContext.tsx     # Estado global del flujo de análisis y simulación de escenarios
    ├── data/creators.ts                # Perfiles de ejemplo, arquetipos, ideales Big Five y distribución Benford
    ├── screens/                        # Pantallas del flujo: Home, Progress, Benford, Score, BigFive, Recs, NoAnalysis
    ├── theme/tokens.ts                 # Tokens de color, radios, espaciados y utilidades de color HSL -> Hex
    └── types/brandfit.ts               # Contratos y tipos de dominio en TypeScript estricto
```

---

## Hoja de Ruta

- [x] Definición conceptual del flujo
- [x] Configuración inicial del repositorio y documentación base
- [x] Módulo de análisis estadístico (Ley de Benford interactiva)
- [x] Algoritmo de compatibilidad de arquetipos de marca (Big Five)
- [x] Motor de recomendación de formatos de contenido (Modo Marca / Modo Creador)
- [x] Interfaz de usuario móvil nativa (React Native + Expo Go)

---

## Ejecución en Expo Go

### Requisitos previos

- **Node.js** (v18 o superior)
- Aplicación **Expo Go** instalada en tu dispositivo móvil (Android o iOS)

### Instalación y arranque

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar el servidor de desarrollo de Expo
npx expo start
```

Escanea el código QR mostrado en la terminal desde **Expo Go** (Android) o la app de **Cámara** (iOS).

---

## Contribuciones

Las contribuciones son bienvenidas. Revisa los lineamientos en [CONTRIBUTING.md](CONTRIBUTING.md) y el código de conducta en [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

---

## Licencia

Este proyecto se distribuye bajo los términos de la licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más información.
