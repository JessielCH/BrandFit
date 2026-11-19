/**
 * @layer Domain – Barrel Export
 * Re-exporta todos los tipos, constantes y servicios del dominio
 * desde un único punto de entrada.
 *
 * Uso: import { Creator, ARCHETYPES, engagementBonus } from '../domain'
 */

// Tipos y Value Objects
export type { ScreenId, Tone, ScoreTone, ArchetypeId, Video, Archetype, Creator } from './models/types'

// Invariantes del dominio
export {
  ARCHETYPES,
  TRAITS,
  IDEALS,
  BENFORD_EXPECTED,
  ANALYSIS_STEPS,
  SUSPICIOUS_HINTS,
  CREATORS,
  FRAUD_CREATOR,
} from './models/constants'

// Reglas de Negocio (Domain Services)
export {
  validateCreatorUsername,
  hasSuspiciousPattern,
  scoreTone,
  affinityVerdictLabel,
  engagementBonus,
  evaluateTraitAlignment,
  canShowRecommendations,
  archetypeLabel,
  archetypeShort,
} from './services/rules'
