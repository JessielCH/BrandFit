# BrandFit

> Herramienta para marcas que quieren colaborar con creadores de contenido sin adivinar.

[![Estado](https://img.shields.io/badge/Estado-Prototipo%20m%C3%B3vil-047857)](https://github.com/JessielCH/BrandFit)
[![Licencia](https://img.shields.io/badge/Licencia-MIT-blue.svg)](LICENSE)

---

## Acerca de BrandFit

Prototipo móvil en **React Native + Expo** basado en el diseño de Figma. Recorre en un solo flujo visual tres etapas (con datos simulados en frontend):

1. **Autenticidad (Ley de Benford):** distribución del primer dígito de seguidores y likes (esperada vs. observada) para detectar cuentas sospechosas.
2. **Brand Fit Score y Big Five:** puntaje de compatibilidad (0–100) y comparación de los 5 rasgos de personalidad del creador frente al arquetipo de marca elegido.
3. **Recomendaciones de contenido:** top 3 videos por engagement, formato sugerido y recomendación general.

---

## Requisitos

- [Node.js](https://nodejs.org/) 20 o superior
- App **Expo Go** instalada en el celular ([Android](https://play.google.com/store/apps/details?id=host.exp.exponent) / [iOS](https://apps.apple.com/app/expo-go/id982107779))
- Computadora y celular conectados a la **misma red Wi-Fi**

---

## Cómo ejecutar el proyecto

```bash
# 1. Instalar dependencias (solo la primera vez)
npm install

# 2. Iniciar el servidor de Expo
npm start
```

- **En Android:** abre **Expo Go** y toca **Scan QR code** para escanear el QR de la terminal.
- **En iOS:** escanea el QR con la cámara del iPhone para abrirlo en **Expo Go**.
- **Si no conecta por la red local:** ejecuta `npx expo start --tunnel`.

### Comandos útiles

| Comando             | Descripción                         |
| ------------------- | ----------------------------------- |
| `npm start`         | Inicia el servidor de Expo (QR)     |
| `npm run android`   | Abre en emulador/dispositivo Android |
| `npm run ios`       | Abre en simulador iOS (macOS)       |
| `npm run web`       | Abre la vista web en el navegador   |
| `npm run typecheck` | Verifica los tipos con TypeScript   |

---

## Flujo de pantallas

1. **Inicio (`HomeScreen`)** – ingreso de `@username` de TikTok («¿A quién analizamos?») y lista de análisis recientes.
2. **Progreso (`ProgressScreen`)** – simulación paso a paso del análisis.
3. **Autenticidad (`BenfordScreen`)** – veredicto, gráfico de la Ley de Benford y métricas generales.
4. **Brand Fit Score (`ScoreScreen`)** – selector de arquetipo de marca y medidor circular de puntaje.
5. **Big Five (`BigFiveScreen`)** – barras comparativas de personalidad (Creador vs. Ideal).
6. **Recomendaciones (`RecsScreen`)** – top 3 videos, formato sugerido y tarjetas de recomendación.

> **Tip de prueba:** escribe un usuario que contenga `bot` o `fake` (por ejemplo `cuentabot`) para ver el flujo de alerta por cuenta sospechosa.

---

## Estructura del proyecto

```text
App.tsx                 # Punto de entrada: fuentes Inter, providers y navegador
index.ts                # Registro del componente raíz en Expo
src/
├── components/
│   ├── ui/             # Componentes base (Button, Card, Chip, Avatar, Logo...)
│   ├── home/           # Formulario de @username e ítem de recientes
│   ├── progress/       # Barra de progreso y pasos del análisis
│   ├── benford/        # Veredicto, gráfico Benford y cuadrícula de métricas
│   ├── score/          # Selector de arquetipo y anillo SVG de puntaje
│   ├── bigfive/        # Barra comparativa por rasgo de personalidad
│   └── recs/           # Ítem de video y tarjeta de recomendación
├── context/            # Estado global de navegación y creador activo (AppContext)
├── data/               # Datos simulados (creadores, arquetipos, pasos)
├── navigation/         # Navegador por estado (AppNavigator) y barra inferior (TabBar)
├── screens/            # Las 6 pantallas del prototipo + pantalla de estado vacío
├── theme/              # Paleta de colores, tipografía Inter y radios de borde
├── types/              # Definiciones de tipos TypeScript
└── utils/              # Funciones auxiliares (validación, bonos y colores HSL)
```

---

## Licencia

Distribuido bajo la licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más información.
