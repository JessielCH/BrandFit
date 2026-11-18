/**
 * Contexto global de BrandFit.
 * Gestiona el estado de navegación, el creador activo y el arquetipo seleccionado.
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

// ─── Tipos ────────────────────────────────────────────────────────────────────

export type AppCtx = {
  screen: ScreenId
  go: (s: ScreenId) => void
  creator: Creator | null
  archetype: ArchetypeId
  setArchetype: (a: ArchetypeId) => void
  startAnalysis: (username: string) => void
  openCreator: (c: Creator) => void
  pendingUsername: string
  finishAnalysis: () => void
}

// ─── Contexto ─────────────────────────────────────────────────────────────────

const AppContext = createContext<AppCtx | null>(null)

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AppProvider({ children }: { children: ReactNode }) {
  const [screen, setScreen] = useState<ScreenId>('home')
  const [creator, setCreator] = useState<Creator | null>(null)
  const [archetype, setArchetype] = useState<ArchetypeId>('tech')
  const [pendingUsername, setPendingUsername] = useState('')

  const go = useCallback((s: ScreenId) => setScreen(s), [])

  const startAnalysis = useCallback((username: string) => {
    setPendingUsername(username)
    setScreen('progress')
  }, [])

  const finishAnalysis = useCallback(() => {
    const u = pendingUsername || 'alexmando15'
    const lower = u.toLowerCase()
    let result: Creator

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

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useApp(): AppCtx {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp debe usarse dentro de <AppProvider>')
  return ctx
}
