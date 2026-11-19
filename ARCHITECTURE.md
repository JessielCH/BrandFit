# 📘 Arquitectura DDD — BrandFit Mobile

> React Native + Expo (TypeScript). Diseño sin backend.

---

## 1. Capas DDD

```
src/
├── domain/                      🧠 Dominio (0% UI — TypeScript puro)
│   ├── models/
│   │   ├── types.ts             Aggregate Root (Creator) y Value Objects
│   │   └── constants.ts        Invariantes: ARCHETYPES, TRAITS, IDEALS, BENFORD_EXPECTED
│   ├── services/
│   │   └── rules.ts            Reglas de Negocio RN-01 a RN-06
│   └── index.ts                Barrel export del dominio
│
├── infrastructure/              🗄️ Infraestructura (Repositorios en memoria)
│   ├── repositories/
│   │   └── creatorRepository.ts  resolveAuditedCreator(username)
│   └── index.ts
│
├── application/ (context/)      ⚙️ Aplicación (Casos de Uso y Orquestación)
│   └── AppContext.tsx           startAnalysis, finishAnalysis, openCreator, setArchetype
│
└── screens/                     📱 Presentación (UI por Bounded Context)
    ├── HomeScreen.tsx           BC1: búsqueda + RN-01 (validación de handle)
    ├── ProgressScreen.tsx       BC1: pipeline visual de auditoría
    ├── BenfordScreen.tsx        BC1: veredicto de autenticidad + gráfico Benford
    ├── ScoreScreen.tsx          BC2: Brand Fit Score + veredicto RN-03b
    ├── BigFiveScreen.tsx        BC2: brecha psicométrica RN-05 (barras ámbar)
    └── RecsScreen.tsx           BC3: top 3 videos + bloqueo RN-06
```

---

## 2. Bounded Contexts

```
┌──────────────────────────────────────────────────────────────┐
│                   APLICACIÓN MÓVIL BRANDFIT                  │
│                                                              │
│  ┌────────────────┐  ┌──────────────────┐  ┌─────────────┐  │
│  │ BC1: Auditoría │  │ BC2: Evaluación  │  │ BC3:        │  │
│  │ de Autenticidad│─▶│ de Afinidad &    │─▶│ Inteligencia│  │
│  │ (Fraude/Benford│  │ Psicometría      │  │ de Contenido│  │
│  └────────────────┘  └──────────────────┘  └─────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

| BC | Responsabilidad | Pantallas |
|---|---|---|
| **BC1** Fraud & Benford Audit | Validar @username, auditar 10 videos, dictaminar autenticidad | Home → Progress → Benford |
| **BC2** Brand Fit & Psychometrics | Calcular Brand Fit Score (0-100), bono de engagement, brecha Big Five | Score → BigFive |
| **BC3** Content Recommendations | Top 3 videos por engagement, tono editorial, formato sugerido | Recs |

---

## 3. Lenguaje Ubicuo (Ubiquitous Language)

| Término de Negocio | En el código | Definición |
|---|---|---|
| Creador Auditado | `Creator` *(Aggregate Root)* | Influencer de TikTok bajo análisis |
| Arquetipo de Marca | `Archetype` / `ArchetypeId` | Identidad corporativa (`tech`, `bienestar`, etc.) |
| Distribución de Benford | `BENFORD_EXPECTED` / `benfordObserved` | Curva logarítmica teórica vs. observada |
| Veredicto de Autenticidad | `authentic` / `confidence` | Booleano + porcentaje de confianza estadística |
| Brand Fit Score | `scores: Record<ArchetypeId, number>` | Índice de compatibilidad 0-100 |
| Perfil Psicométrico Big Five | `TRAITS` / `bigFive` | Rasgos OCEAN del creador |
| Vector Ideal del Arquetipo | `IDEALS` | Big Five de referencia por arquetipo |
| Brecha Psicométrica | `evaluateTraitAlignment()` | Diferencia absoluta creador vs. ideal |
| Bono de Tracción | `engagementBonus()` | Puntos extra por engagement rate |
| Tono Editorial | `Tone` (`positivo` / `neutro` / `negativo`) | Clasificación emocional del contenido |
| Muestra de Video Destacado | `Video` (`topVideos`) | Value Object con título, engagement, vistas, tono |
| Formato Sugerido | `format` | Recomendación táctica para la campaña |

---

## 4. Reglas de Negocio (Domain Services — `src/domain/services/rules.ts`)

| ID | Función | Descripción |
|---|---|---|
| **RN-01** | `validateCreatorUsername(rawInput)` | Username: 2-24 chars, `/^[a-zA-Z0-9._]{2,24}$/` |
| **RN-02** | `hasSuspiciousPattern(username)` | Detecta bots por palabras clave (SUSPICIOUS_HINTS) |
| **RN-03a** | `scoreTone(score)` | ≥65→success / ≥45→warning / <45→danger |
| **RN-03b** | `affinityVerdictLabel(score)` | ≥70→"Excelente afinidad" / <70→"Buena afinidad" |
| **RN-04** | `engagementBonus(engagement)` | ≥7%→+5 / ≥5%→+3 / ≥3%→+1 / <3%→0 |
| **RN-05** | `evaluateTraitAlignment(v, target)` | diff≤15→isAligned=true (barra verde), diff>15→ámbar |
| **RN-06** | `canShowRecommendations(authentic)` | Bloquea Recs si `authentic === false` |
