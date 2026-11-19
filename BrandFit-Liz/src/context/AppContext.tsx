/**
 * @layer Application – Context (Orquestador de Casos de Uso)
 * @boundedContext Transversal (coordina BC1, BC2 y BC3)
 *
 * Casos de Uso:
 *   startAnalysis → BC1: inicia el pipeline de auditoría
 *   finishAnalysis → BC1: resuelve el Creador Auditado via repositorio
 *   openCreator   → Historial: navega al detalle de un análisis previo
 *   setArchetype  → BC2: cambia el Arquetipo de Marca seleccionado
 */
import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from 'react'
import type { ArchetypeId, Creator, ScreenId } from '../domain/models/types'
import { resolveAuditedCreator } from '../infrastructure/repositories/creatorRepository'

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

const AppContext = createContext<AppCtx | null>(null)

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

  /**
   * Caso de Uso: finishAnalysis
   * Delega en el Repositorio de Infraestructura (aplica RN-02 internamente).
   */
  const finishAnalysis = useCallback(() => {
    const resolved = resolveAuditedCreator(pendingUsername || 'alexmando15')
    setCreator(resolved)
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

export function useApp(): AppCtx {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp debe usarse dentro de <AppProvider>')
  return ctx
}
