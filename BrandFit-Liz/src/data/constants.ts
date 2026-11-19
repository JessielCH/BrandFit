/**
 * @deprecated Re-exporta desde la capa de Dominio para compatibilidad.
 * Los imports existentes (src/data/constants) siguen funcionando.
 * Migración completada: src/data → src/domain
 */
export type { ArchetypeId, Creator, Archetype, Video, Tone, ScoreTone } from '../domain/models/types'
export {
  ARCHETYPES,
  TRAITS,
  IDEALS,
  BENFORD_EXPECTED,
  ANALYSIS_STEPS,
  SUSPICIOUS_HINTS,
  CREATORS,
  FRAUD_CREATOR,
} from '../domain/models/constants'
