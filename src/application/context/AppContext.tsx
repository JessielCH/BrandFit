/**
 * @file AppContext.tsx
 * @description Orquestador de Casos de Uso (Application Layer - DDD) de BrandFit.
 * Coordina los casos de uso de la aplicación:
 * - CU-01: Iniciar Auditoría de Creador (`startAnalysis`)
 * - CU-02: Completar Auditoría y Resolver Veredicto de Benford (`finishAnalysis`)
 * - CU-03: Consultar Creador Histórico (`openCreator`)
 * - CU-04: Cambiar Arquetipo de Marca Activo (`setArchetype`)
 *
 * Delega las reglas de negocio a la Capa de Dominio (`src/domain`) y la obtención
 * de datos a la Capa de Infraestructura (`src/infrastructure`).
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
import type { ArchetypeId, Creator, ScreenId } from '../../domain/models/types'
import { resolveAuditedCreator } from '../../infrastructure/repositories/creatorRepository'

// ─── Definición de Tipos del Contexto de Aplicación ───────────────────────────

/**
 * Contrato de la Capa de Aplicación que expone el estado del flujo y los Casos de Uso.
 */
export type AppCtx = {
  /** Identificador de la pantalla activa en el flujo de presentación */
  screen: ScreenId
  /** Transiciona hacia una vista del dominio */
  go: (s: ScreenId) => void
  /** Entidad Raíz (Aggregate Root): Creador Auditado activo en la sesión actual */
  creator: Creator | null
  /** Arquetipo de Marca activo para contrastar el Brand Fit Score y el Big Five */
  archetype: ArchetypeId
  /** Caso de Uso CU-04: Cambia el Arquetipo de Marca activo */
  setArchetype: (a: ArchetypeId) => void
  /** Caso de Uso CU-01: Inicia el pipeline de auditoría para un @username validado */
  startAnalysis: (username: string) => void
  /** Caso de Uso CU-03: Carga directamente un Creador Auditado del historial */
  openCreator: (c: Creator) => void
  /** Handle del creador en proceso de auditoría durante el stepper de progreso */
  pendingUsername: string
  /** Caso de Uso CU-02: Finaliza el pipeline y resuelve la entidad Creator desde el Repositorio */
  finishAnalysis: () => void
}

// ─── Creación del Contexto ────────────────────────────────────────────────────

const AppContext = createContext<AppCtx | null>(null)

// ─── Proveedor de la Capa de Aplicación (Provider) ────────────────────────────

/**
 * Proveedor de Aplicación que orquesta el estado de los Bounded Contexts
 * (Auditoría de Benford, Afinidad Psicométrica y Recomendaciones de Contenido).
 */
export function AppProvider({ children }: { children: ReactNode }) {
  const [screen, setScreen] = useState<ScreenId>('home')
  const [creator, setCreator] = useState<Creator | null>(null)
  const [archetype, setArchetype] = useState<ArchetypeId>('tech')
  const [pendingUsername, setPendingUsername] = useState('')

  /** Cambia la pantalla activa del enrutador interno */
  const go = useCallback((s: ScreenId) => setScreen(s), [])

  /** CU-01: Comienza el proceso de auditoría y navega al stepper de progreso */
  const startAnalysis = useCallback((username: string) => {
    setPendingUsername(username)
    setScreen('progress')
  }, [])

  /**
   * CU-02: Concluye la simulación de auditoría invocando al Repositorio de Creadores
   * (`resolveAuditedCreator`), el cual aplica las reglas del dominio de Benford.
   */
  const finishAnalysis = useCallback(() => {
    const result = resolveAuditedCreator(pendingUsername)
    setCreator(result)
    setScreen('benford')
  }, [pendingUsername])

  /** CU-03: Abre un creador desde el catálogo de auditorías recientes */
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

// ─── Hook de Aplicación ───────────────────────────────────────────────────────

/**
 * Hook de acceso a los Casos de Uso de la Capa de Aplicación de BrandFit.
 */
export function useApp(): AppCtx {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp debe usarse dentro de un <AppProvider>')
  return ctx
}
