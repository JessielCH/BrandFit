# BrandFit

<p align="center">
  <img src="assets/icon.png" alt="BrandFit Logo" width="120" height="120" />
</p>

<p align="center">
  <strong>Plataforma de inteligencia y analítica predictiva para colaboraciones entre marcas y creadores de contenido.</strong>
</p>

<p align="center">
  <a href="https://github.com/JessielCH/BrandFit"><img src="https://img.shields.io/badge/Estado-Prototipo_Completado-22c55e?style=for-the-badge" alt="Estado"></a>
  <a href="https://expo.dev"><img src="https://img.shields.io/badge/Expo-SDK_58-000020?style=for-the-badge&logo=expo&logoColor=white" alt="Expo SDK 58"></a>
  <a href="https://reactnative.dev"><img src="https://img.shields.io/badge/React_Native-0.88-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React Native 0.88"></a>
  <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/TypeScript-6.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/Licencia-MIT-0ea5e9?style=for-the-badge" alt="Licencia MIT"></a>
</p>

---

## Enlaces del Sistema de Diseño

El diseño de BrandFit fue concebido desde sus cimientos utilizando la metodología de diseño atómico y prototipado colaborativo en Figma:

| Recurso | Plataforma | Enlace de Acceso |
| :--- | :--- | :--- |
| **Prototipo de Alta Fidelidad** | Figma Design | [![Figma Design](https://img.shields.io/badge/Figma-Prototipo_Grupal-F24E1E?style=flat-square&logo=figma&logoColor=white)](https://www.figma.com/design/QDYvI7DBZFhUtxmk8o9UB5/Prototipo-BradFit-Grupal?node-id=1-3&t=9IAFZa4ba9yWmyDh-1) |
| **Arquitectura de Atomic Design** | FigJam | [![FigJam](https://img.shields.io/badge/FigJam-Atomic_Design_System-A259FF?style=flat-square&logo=figma&logoColor=white)](https://www.figma.com/board/Zk2FYhOvrQX7BCrwJppllL/BrandFit-%C2%B7-Atomic-Design?node-id=0-1&p=f&t=rE8uW77jN4BucfBq-0) |

---

## Equipo de Desarrollo

| Nombre | Rol / Aporte Principal |
| :--- | :--- |
| **Alejandro** | Módulo de Autenticidad, Métricas y Detección de Fraude (Ley de Benford) |
| **Liz** | Evaluación de Engagement, Psicometría Big Five y Algoritmo Brand Fit |
| **Alex** | Análisis de Contenido de Alto Rendimiento y Motor de Recomendaciones |
| **Jessiel** | Sistema de Atomic Design, Estructura Visual e Integración Frontend Móvil |

---

## Génesis del Proyecto y Decisión Estratégica con IA

### El Desafío de Negocio

El marketing de influencers tradicional adolece de un problema fundamental: **la asimetría de información y las métricas de vanidad**. Las marcas destinan grandes presupuestos a creadores basándose exclusivamente en número de seguidores y likes acumulados, enfrentándose a:

1. **Cuentas infladas artificialmente:** Compra de seguidores, bots y granjas de interacción.
2. **Disonancia de valores:** Creadores cuya audiencia o personalidad no conecta con el arquetipo de la marca.
3. **Campañas desenfocadas:** Ausencia de datos sobre cuáles formatos específicos de contenido generan tracción real en la audiencia.

### Toma de Decisiones y Síntesis Mediada por Gemini

Durante la concepción inicial, surgieron dos enfoques distintos dentro del equipo:

* **Perspectiva B2B (Alejandro & Liz):** Orientada a las **marcas**, enfocada en auditoría de perfiles, evaluación de riesgos y optimización del retorno de inversión.
* **Perspectiva B2C (Alex):** Orientada a los **creadores**, centrada en herramientas de analítica y optimización de sus propias publicaciones.

Con el análisis y asistencia de **Gemini**, se llegó a una resolución estratégica: **ambos enfoques no eran excluyentes, sino fases consecutivas de una solución integral B2B de alto impacto**. Se construyó un embudo de valor donde la marca no solo evalúa si el creador es legítimo y compatible, sino que obtiene las directrices operativas exactas para maximizar el resultado de la colaboración.

```
[ Entrada del Creador ] 
          │
          ▼
┌────────────────────────────────────────┐
│  FASE 1: Auditoría de Autenticidad     │ (Aporte: Alejandro)
│  • Extracción de métricas vía scraper  │
│  • Test estadístico de Benford         │
└──────────────────┬─────────────────────┘
                   │  ¿Cuenta Auténtica?
                   ├─────────────┐
          [Sí]     │             │ [No / Sospechosa]
                   ▼             ▼
┌────────────────────────────┐ ┌────────────────────────────┐
│ FASE 2: Compatibilidad     │ │ Alerta preventiva de       │
│ • Engagement últimos 10 vid│ │ fraude / bots detectados   │
│ • Psicometría Big Five     │ └────────────────────────────┘
│ • Cálculo Brand Fit Score  │ (Aporte: Liz)
└──────────────────┬─────────┘
                   │
                   ▼
┌────────────────────────────────────────┐
│  FASE 3: Recomendación Táctica         │ (Aporte: Alex)
│  • Aislamiento de contenido destacado  │
│  • Formato sugerido para la marca      │
└────────────────────────────────────────┘
```

---

## Flujo Integral de la Solución

### 1. Auditoría de Autenticidad (Aporte de Alejandro)
* **Ingreso y Scraper:** La marca introduce el usuario del creador (`@username`). El sistema captura las métricas clave de interacción y publicaciones.
* **Ley de Benford:** Se somete la distribución del primer dígito de los datos observados frente a la distribución logarítmica esperada $P(d) = \log_{10}(1 + 1/d)$.
* **Veredicto:** Si las frecuencias presentan distorsiones estadísticas significativas, el sistema categoriza el perfil como anómalo/sospechoso emitiendo una alerta; si la distribución es consistente con el comportamiento orgánico humano, el perfil avanza a la siguiente fase.

### 2. Afinidad de Marca y Brand Fit Score (Aporte de Liz)
* **Engagement Profundo:** Se analiza el rendimiento medio y la tasa de interacción de los últimos 10 videos publicados.
* **Modelo Big Five (OCEAN):** Se deriva el perfil de personalidad del creador en 5 dimensiones fundamentales: *Apertura, Responsabilidad, Extraversión, Amabilidad y Neuroticismo*.
* **Arquetipos de Marca:** El usuario selecciona el arquetipo representativo de su marca (Sabio, Héroe, Rebelde, Creador, etc.) y el motor calcula la distancia euclidiana ponderada para emitir un **Brand Fit Score** de 0 a 100 con su respectivo chip de afinidad.

### 3. Recomendación de Formato de Contenido (Aporte de Alex)
* **Segmentación de Contenido:** El algoritmo aísla los 3 videos de mayor retención y tasa de conversión del creador.
* **Prescripción Estratégica:** Indica a la marca qué tipo de formato (e.g. *Tutoriales paso a paso*, *Narrativas personales*, *Demostraciones POV*) resuena con mayor eficacia en la audiencia real, evitando que la colaboración se base en suposiciones.

### 4. Sistema de Diseño Atómico (Aporte de Jessiel)
* Estructuración del proyecto en base a la metodología **Atomic Design**, formalizada en FigJam y codificada en componentes reutilizables:
  * **Átomos:** Paleta cromática semántica, tokens tipográficos de Inter, iconos vectoriales, `AppText`, insignias de estado.
  * **Moléculas:** Componentes `Card`, `Button` interactivo, selectores de arquetipo, barras de comparación Big Five.
  * **Organismos:** `ScreenHeader`, `TabBar` de navegación contextual, gráfica Benford interactiva, tacómetro circular de Brand Fit.
  * **Plantillas y Pantallas:** Vistas modulares para Inicio, Progreso, Autenticidad, Score, Personalidad y Recomendaciones.

---

## Tecnologías y Ecosistema de Inteligencia Artificial

<p align="center">
  <img src="https://img.shields.io/badge/Gemini-Google_DeepMind-4285F4?style=flat-square&logo=google&logoColor=white" alt="Gemini">
  <img src="https://img.shields.io/badge/IDE-Antigravity-1E1E1E?style=flat-square&logo=visualstudiocode&logoColor=white" alt="Antigravity">
  <img src="https://img.shields.io/badge/React_Native-0.88.1-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React Native">
  <img src="https://img.shields.io/badge/Expo_SDK-58.0.26-000020?style=flat-square&logo=expo&logoColor=white" alt="Expo">
  <img src="https://img.shields.io/badge/TypeScript-6.0.3-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Google_Fonts-Inter-000000?style=flat-square&logo=googlefonts&logoColor=white" alt="Inter Font">
</p>

### ¿Por qué estas tecnologías?

* **Gemini (Google DeepMind):** Actuó como copiloto analítico durante la fase de conceptualización, refinamiento del modelo matemático de la Ley de Benford, cálculo matricial de compatibilidad de arquetipos y resolución de dependencias entre entornos.
* **Antigravity IDE:** Entorno de desarrollo impulsado por agentes autónomos de IA. Proporcionó asistencia continua en la refactorización integral del repositorio, ejecución de pruebas locales, migración limpia de dependencias y despliegue hacia GitHub.
* **React Native + TypeScript:** Permite construir una interfaz nativa de alto rendimiento con tipado estricto en tiempo de compilación, asegurando consistencia en plataformas iOS y Android.
* **Expo SDK 58 & Expo Go:** Garantiza un flujo de trabajo ágil mediante Fast Refresh, eliminando la necesidad de compilaciones binarias locales complejas y permitiendo validar la experiencia de usuario instantáneamente en dispositivos móviles físicos.
* **React Native SVG & Linear Gradient:** Utilizados para dibujar con precisión matemática los gráficos de dispersión de Benford, los arcos de puntaje y los avatares dinámicos.

---

## Estructura del Repositorio

La arquitectura del proyecto se encuentra consolidada directamente en la raíz para una presentación limpia y estandarizada:

```text
BrandFit/
├── assets/                  # Logotipos, iconos adaptativos y recursos visuales
├── src/
│   ├── components/          # Componentes del sistema de diseño (Atomic Design)
│   │   ├── AppText.tsx      # Tipografía Inter con mapeo dinámico de pesos
│   │   ├── Avatar.tsx       # Avatar con gradiente y tipografía vectorial
│   │   ├── Button.tsx       # Botones primarios, secundarios y ghost
│   │   ├── Card.tsx         # Contenedores con bordes y elevación sutil
│   │   ├── Chip.tsx         # Insignias semánticas (Éxito, Riesgo, Neutro)
│   │   ├── Logo.tsx         # Isotipo y logotipo de BrandFit
│   │   ├── ScreenHeader.tsx # Cabeceras unificadas con navegación
│   │   ├── TabBar.tsx       # Barra de navegación inferior
│   │   └── ...
│   ├── context/             # Proveedor de estado global (AppContext)
│   ├── data/                # Constantes, perfiles simulados y tipos TypeScript
│   ├── navigation/          # Enrutador principal de la aplicación móvil
│   ├── screens/             # Vistas de la aplicación
│   │   ├── HomeScreen.tsx      # Entrada de usuario y creadores recientes
│   │   ├── ProgressScreen.tsx  # Stepper animado del análisis en curso
│   │   ├── BenfordScreen.tsx   # Distribución estadística de autenticidad
│   │   ├── ScoreScreen.tsx     # Tacómetro circular y selector de arquetipo
│   │   ├── BigFiveScreen.tsx   # Comparación de rasgos OCEAN vs arquetipo
│   │   └── RecsScreen.tsx      # Videos destacados y formato sugerido
│   └── theme/               # Tokens de color, espaciado y tipografía
├── app.json                 # Manifiesto de configuración de Expo
├── babel.config.js          # Configuración del compilador Babel
├── index.ts                 # Punto de entrada y registro del componente raíz
├── package.json             # Dependencias del proyecto (Expo 58, React 19)
├── tsconfig.json            # Configuración de TypeScript con alias de ruta
└── README.md                # Documentación del proyecto
```

---

## Guía de Ejecución

### Requisitos previos

* **Node.js** (versión 18 o superior recomendada).
* Dispositivo móvil con la aplicación **Expo Go** instalada ([Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent) o [Apple App Store](https://apps.apple.com/app/expo-go/id982107779)), o un emulador local configurado.

### Instalación y Puesta en Marcha

1. **Clonar el repositorio y ubicarse en el directorio:**
   ```powershell
   git clone https://github.com/JessielCH/BrandFit.git
   cd BrandFit
   ```

2. **Instalar dependencias:**
   ```powershell
   npm install --legacy-peer-deps
   ```

3. **Iniciar el servidor de desarrollo:**
   ```powershell
   npx expo start -c
   ```

4. **Visualizar la aplicación:**
   * **En dispositivo físico (Android):** Abre la app **Expo Go** y escanea el código QR que se imprime en la terminal.
   * **En dispositivo físico (iOS):** Abre la cámara nativa, enfoca el código QR y pulsa en la notificación para abrir en **Expo Go**.
   * **En el navegador web:** Presiona la tecla **`w`** en la terminal.
   * **En emulador Android:** Presiona la tecla **`a`** en la terminal.

> [!NOTE]
> Para probar la conexión en redes distintas o ante restricciones de firewall, puedes iniciar en modo túnel ejecutando:  
> `npx expo start --tunnel`

---

## Licencia y Buenas Prácticas

Este proyecto está bajo la licencia [MIT](LICENSE). Consulta los lineamientos de colaboración en [CONTRIBUTING.md](CONTRIBUTING.md) y el código de conducta en [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).
