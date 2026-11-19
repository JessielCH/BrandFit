/**
 * @file AppContext.tsx
 * @description Contexto global y proveedor de estado central para la aplicación BrandFit.
 * Gestiona la navegación interna entre pantallas, el creador actualmente seleccionado,
 * el arquetipo de marca activo y las funciones de simulación del análisis de perfiles.
 *
 * @author BrandFit Team
 */

import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from 'react'
import type { ArchetypeId, Creator, ScreenId } from '../data/types'
import { CREATORS, FRAUD_CREATOR, SUSPICIOUS_HINTS } from '../data/constants'

// ─── Definición de Tipos del Contexto ─────────────────────────────────────────

/**
 * Interfaz que define el contrato del estado y acciones del contexto global de la aplicación.
 */
export type AppCtx = {
  /** Identificador de la pantalla que se está renderizando actualmente */
  screen: ScreenId
  /** Función para navegar directamente a una pantalla específica */
  go: (s: ScreenId) => void
  /** Datos del creador seleccionado en el análisis actual o null si no hay ninguno */
  creator: Creator | null
  /** Arquetipo de marca seleccionado actualmente para comparar afinidad */
  archetype: ArchetypeId
  /** Función para cambiar el arquetipo activo */
  setArchetype: (a: ArchetypeId) => void
  /** Inicia el flujo de análisis para un nombre de usuario dado, dirigiendo al stepper de progreso */
  startAnalysis: (username: string) => void
  /** Abre directamente el perfil analizado de un creador histórico */
  openCreator: (c: Creator) => void
  /** Nombre de usuario pendiente de procesamiento durante la pantalla de progreso */
  pendingUsername: string
  /** Concluye el progreso de análisis y redirige a los resultados de autenticidad (Benford) */
  finishAnalysis: () => void
}

// ─── Creación del Contexto ────────────────────────────────────────────────────

const AppContext = createContext<AppCtx | null>(null)

// ─── Proveedor del Contexto (Provider) ─────────────────────────────────────────

/**
 * Proveedor de contexto que envuelve la jerarquía de componentes para proveer
 * acceso al estado global de BrandFit.
 *
 * @param props.children - Elementos hijos de la aplicación móvil
 */
export function AppProvider({ children }: { children: ReactNode }) {
  // docs: Estado de pantalla activa ('home', 'progress', 'benford', 'score', 'bigfive', 'recs')
  const [screen, setScreen] = useState<ScreenId>('home')

  // docs: Datos del perfil del creador seleccionado actualmente
  const [creator, setCreator] = useState<Creator | null>(null)

  // docs: Arquetipo de marca por defecto para contrastar afinidad ('tech', 'bienestar', etc.)
  const [archetype, setArchetype] = useState<ArchetypeId>('tech')

  // docs: Almacena temporalmente el nombre de usuario mientras se muestra la animación de progreso
  const [pendingUsername, setPendingUsername] = useState('')

  /** Cambia la pantalla activa del enrutador interno */
  const go = useCallback((s: ScreenId) => setScreen(s), [])

  /** Comienza el proceso de análisis y navega hacia la pantalla de progreso animado */
  const startAnalysis = useCallback((username: string) => {
    setPendingUsername(username)
    setScreen('progress')
  }, [])

  /**
   * Finaliza la simulación de análisis:
   * Determina si el nombre de usuario contiene palabras clave sospechosas (e.g. 'bot', 'fake')
   * para cargar el caso de fraude de Benford, o carga el perfil correspondiente.
   */
  const finishAnalysis = useCallback(() => {
    const u = pendingUsername || 'alexmando15'
    const lower = u.toLowerCase()
    let result: Creator

    // docs: Si el username incluye indicios sospechosos, se carga el perfil de prueba con anomalía de Benford
    if (SUSPICIOUS_HINTS.some((h) => lower.includes(h))) {
      result = { ...FRAUD_CREATOR, username: u }
    } else {
      const known = CREATORS.find((c) => c.username.toLowerCase() === lower)
      result =
        known ??
        ({
          ...CREATORS[0],
          username: u,
          name: u,
          analyzedAt: 'Ahora',
          hue: 140 + ((u.length * 7) % 40),
        } as Creator)
    }

    setCreator(result)
    setScreen('benford')
  }, [pendingUsername])

  /** Carga un creador desde la lista de análisis recientes y navega al Brand Fit Score */
  const openCreator = useCallback((c: Creator) => {
    setCreator(c)
    setArchetype(c.lastArchetype)
    setScreen('score')
  }, [])

  const ctx: AppCtx = {
    screen,
    go,
    creator,
    archetype,
    setArchetype,
    startAnalysis,
    openCreator,
    pendingUsername,
    finishAnalysis,
  }

  return <AppContext.Provider value={ctx}>{children}</AppContext.Provider>
}

// ─── Hook Personalizado ───────────────────────────────────────────────────────

/**
 * Hook para consumir el estado y acciones del contexto global de BrandFit.
 * Lanza un error explícito si se invoca fuera de un `<AppProvider>`.
 *
 * @returns El objeto de contexto AppCtx con estados y métodos de navegación
 */
export function useApp(): AppCtx {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp debe usarse dentro de un <AppProvider>')
  return ctx
}
