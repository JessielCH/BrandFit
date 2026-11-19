/**
 * @layer Domain – Barrel Export
 */
export type { ScreenId, Tone, ScoreTone, ArchetypeId, Video, Archetype, Creator } from './models/types'
export {
  ARCHETYPES, TRAITS, IDEALS, BENFORD_EXPECTED, ANALYSIS_STEPS,
  SUSPICIOUS_HINTS, CREATORS, FRAUD_CREATOR,
} from './models/constants'
export {
  validateCreatorUsername, hasSuspiciousPattern, scoreTone,
  affinityVerdictLabel, engagementBonus, evaluateTraitAlignment,
  canShowRecommendations, archetypeLabel, archetypeShort,
} from './services/rules'
